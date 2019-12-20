import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../dialogs/confirm-dialog/confirm-dialog.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { CenterService } from '../../../services/center.service';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.scss']
})
export class CreateMemberComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isCreateLoading = false;
  error: string;
  constructor(
    private dialog: MatDialog,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private centerService: CenterService,
    private session: SessionService
  ) {}

  ngOnInit() {
    if (!this.route.snapshot.paramMap.get('id')) {
      this.router.navigateByUrl('/home/admin').then(() => console.log());
    }
  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px',
      position: { top: '10%' },
      data: {
        title: 'Confirm',
        text: 'Are you sure you want to add this member?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (
        !result ||
        !this.name ||
        !this.email ||
        !this.password ||
        this.password !== this.confirmPassword
      ) {
        return;
      }
      this.isCreateLoading = true;
      this.afAuth.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(authResult => {
          const newUser: User = {
            name: this.name,
            role: 3,
            uid: authResult.user.uid
          };
          this.authService
            .updateUserData(newUser)
            .then(userResult => {
              this.centerService
                .addMember(
                  this.route.snapshot.paramMap.get('id'),
                  authResult.user.uid,
                  newUser
                )
                .then(centerMemberResult => {
                  this.afAuth.auth
                    .signInWithEmailAndPassword(
                      this.session.username,
                      this.session.password
                    )
                    .then(logResult => {
                      this.name = '';
                      this.email = '';
                      this.confirmPassword = '';
                      this.password = '';
                      this.isCreateLoading = false;
                    })
                    .catch(error => {
                      this.cancelCreate(error);
                    });
                })
                .catch(error => {
                  this.cancelCreate(error);
                });
            })
            .catch(error => {
              this.cancelCreate(error);
            });
        })
        .catch(error => {
          this.cancelCreate(error);
        });
    });
  }

  removeError() {
    this.error = '';
  }

  cancelCreate(error) {
    this.error = error;
    this.isCreateLoading = false;
  }
}
