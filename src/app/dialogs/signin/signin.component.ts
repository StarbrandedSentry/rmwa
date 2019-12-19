import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { SessionService } from '../../services/session.service';
// import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  email = '';
  password = '';
  isSignInLoading = false;
  signInMessage: string;
  constructor(
    public dialogRef: MatDialogRef<SigninComponent>,
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    public session: SessionService
  ) {}

  ngOnInit() {
    // this.afAuth.user.subscribe(user => {
    //   console.log(user);
    // });
  }

  closeSignInDialog(): void {
    this.dialogRef.close();
  }

  signIn() {
    this.isSignInLoading = true;
    this.afAuth.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(result => {
        this.session.username = this.email;
        this.session.password = this.password;
        this.dialogRef.close();
      })
      .catch(error => {
        this.signInMessage = error;
      })
      .finally(() => {
        this.isSignInLoading = false;
      });
  }

  removeMessage(): void {
    this.signInMessage = '';
  }
}
