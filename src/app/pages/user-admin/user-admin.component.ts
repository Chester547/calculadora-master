import { Component } from '@angular/core';
import { UserData } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss'],
})
export class UserAdminComponent {
  usuarios: UserData[] = [];

  constructor(private userService: AuthService) {
    this.usuarios = userService.getUser;
   }


}
