import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService:AuthService, public afAuth:AngularFireAuth,public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(()=>this.dialog.closeAll());
  }

}
