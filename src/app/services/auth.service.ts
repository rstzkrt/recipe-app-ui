import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import 'firebase/auth';
import {UserService} from "./user.service";
import {User} from "../common/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: firebase.User;
  reqUser: User = new User();
  currentUser: User;
  isSignedIn: boolean;
  idToken: Observable<string | null>;

  constructor(private afAuth: AngularFireAuth, private userService: UserService) {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
      if (user) {
        user.getIdToken().then((token) => {
          console.log(token)

          userService.getAuthenticatedUser(token).subscribe(data => {

            console.log(data)
            this.currentUser = data;
          }, error => console.error(error))
        })
      }
    });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      console.log("Logged out!")
    });
  }

  async loginWithGoogle() {

    await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      res => {
        this.reqUser.uid = res.user.uid
        console.log(res.user.uid)
        this.reqUser.email = res.user.email;
        this.reqUser.avatar = res.user.photoURL;
        this.reqUser.displayName = res.user.displayName;

        console.log(res.credential.toJSON())

        if (res.additionalUserInfo.isNewUser) {
          this.userService.addUser(this.reqUser).subscribe(
            response => {
              console.log(response);
            },
            error => {
              console.log(error);
            });
        }

      }
    ).catch(err => {
      console.log(err)
    })
  }
}
