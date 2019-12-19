import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SigninComponent } from '../../dialogs/signin/signin.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: User = {};
  isMenuOpen = false;
  constructor(
    public dialog: MatDialog,
    private afAuth: AngularFireAuth,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
    });
  }

  openSignInDialog(): void {
    const dialogRef = this.dialog.open(SigninComponent, {
      width: '550px',
      position: { top: '5%' },
      disableClose: true,
      panelClass: 'signin-component'
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.afAuth.user.subscribe(user => {
      console.log(user);
    });
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  signOut() {
    this.auth
      .signOut()
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
