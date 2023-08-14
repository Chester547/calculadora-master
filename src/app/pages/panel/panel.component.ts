import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {

  email: string;
  admin: boolean = false;
  loading: boolean = false;

  constructor(private authService: AuthService,
              private router:Router) { 
                this.authService.authState().subscribe( res => {
                  console.log('res => ', res);
                  if (res) {
                    this.admin = res.uid === environment.adminuid ? true : false;
                  }
                })
              }

  ngOnInit() {
    this.authService.authState().subscribe(res => {
      console.log('res-> ', res);
      if (res){
        this.email = res.email;
      };
    })
  }
  
  regClick(){
    this.router.navigate(['/registro'])
  }

  dataUp(){
    this.router.navigate(['/carga'])
  }

  feed(){
    this.router.navigate(['/feed'])
  }

  userManager(){
    this.router.navigate(['/control'])
  }
 
  profile(){
    this.router.navigate(['/perfil'])
  }

  reghoras(){
    this.router.navigate(['/reg-horas'])
  }

  calculadora(){
    this.router.navigate(['/calculadora'])
  }
  numeros(){
    this.router.navigate(['/testcal'])
  }

  logout(){
    this.authService.logout();
    this.loading = true;
    setTimeout(() => {
      // Implement your actual login logic here
      this.router.navigate(['/']);
      // After login logic, reset loading state
      this.loading = false;
    }, 2000); // Simulating a 2-second login process
  }
}
