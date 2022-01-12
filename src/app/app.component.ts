import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UserLoginComponent} from "./components/user-login/user-login.component";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipe-app-ui';
constructor(public afAuth:AngularFireAuth,public dialog: MatDialog,private authService:AuthService) {
}
  openSignUpDialog() {
      this.dialog.open(UserLoginComponent);
  }

  logout() {
    this.authService.logout();
  }
}
