import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  newUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) { }

  getUserState() {
    return this.afAuth.authState;
  }

  login(user) {
    this.afAuth.signInWithEmailAndPassword(user.Email, user.Password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        // console.log(userCredential)
        //this.router.navigate(['/home']);
        if (userCredential) {
          this.router.navigate(['/home']);
        }
      })
  }

  createUser(user) {
    this.afAuth.createUserWithEmailAndPassword(user.Email, user.Password)
      .then(userCredential => {
        this.newUser = user;
        this.insertUserData(userCredential)
          .then(() => {
            this.router.navigate(['/login']);
          });
      })
      .catch(error => {
        this.eventAuthError.next(error);
      });
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.Email,
      contact: this.newUser.Contact,
      username: this.newUser.Username,
      role: this.newUser.Role,
    })
  }


  logout() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    })
  }

  resetpass(email) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  newpassword(code, password){
    return this.afAuth.confirmPasswordReset(code, password)
  }

  Parse(errorCode: string): string {

    let message: string;

    switch (errorCode) {
      case 'auth/wrong-password':
        message = 'Invalid login credentials.';
        break;
      case 'auth/network-request-failed':
        message = 'Please check your internet connection';
        break;
      case 'auth/too-many-requests':
        message =
          'We have detected too many requests from your device. Take a break please!';
        break;
      case 'auth/user-disabled':
        message =
          'Your account has been disabled or deleted. Please contact the system administrator.';
        break;
      case 'auth/requires-recent-login':
        message = 'Please login again and try again!';
        break;
      case 'auth/email-already-exists':
        message = 'Email address is already in use by an existing user.';
        break;
      case 'auth/user-not-found':
        message =
          'We could not find user account associated with the email address or phone number.';
        break;
      case 'auth/phone-number-already-exists':
        message = 'The phone number is already in use by an existing user.';
        break;
      case 'auth/invalid-phone-number':
        message = 'The phone number is not a valid phone number!';
        break;
      case 'auth/invalid-email':
        message = 'The email address is not a valid email address!';
        break;
      case 'auth/cannot-delete-own-user-account':
        message = 'You cannot delete your own user account.';
        break;
      default:
        message = 'Oops! Something went wrong. Try again later.';
        break;
    }

    return message;
  }
}

