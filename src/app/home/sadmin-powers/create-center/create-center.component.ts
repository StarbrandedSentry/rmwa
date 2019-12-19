import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, Form } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../../services/auth.service';
import { CenterService } from '../../../services/center.service';
import { User } from '../../../models/user.model';
import { Center } from '../../../models/center.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-center',
  templateUrl: './create-center.component.html',
  styleUrls: ['./create-center.component.scss']
})
export class CreateCenterComponent implements OnInit {
  centerGroup: FormGroup;
  adminGroup: FormGroup;
  passwordError = '';
  isCreateLoading = false;
  confirmError = '';

  // confirmGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private centService: CenterService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.centerGroup = this.formBuilder.group({
      centerName: ['', Validators.required],
      centerDateCreated: ['', Validators.required]
    });
    this.adminGroup = this.formBuilder.group({
      adminName: ['', Validators.required],
      adminEmail: ['', [Validators.required, Validators.email]],
      adminPassword: ['', [Validators.required, Validators.minLength(5)]],
      adminConfirmPassword: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onConfirmClick(stepper: MatStepper): void {
    this.isCreateLoading = true;
    this.afAuth.auth
      .createUserWithEmailAndPassword(
        this.adminGroup.value.adminEmail,
        this.adminGroup.value.adminPassword
      )
      .then(authResult => {
        // ADD USER
        const user: User = {
          name: this.adminGroup.value.adminName,
          role: 2,
          uid: authResult.user.uid,
          centerName: this.centerGroup.value.centerName
        };
        this.authService
          .updateUserData(user)
          .then(userResult => {
            const newCenter: Center = {
              dateCreated: this.centerGroup.value.centerDateCreated,
              name: this.centerGroup.value.centerName
            };
            this.centService
              .addCenter(newCenter)
              .then(centerResult => {
                this.centService
                  .addAdmin(centerResult.id, user)
                  .then(centAdmin => {
                    this.authService
                      .addCenterForUser(
                        authResult.user.uid,
                        centerResult.id,
                        newCenter
                      )
                      .then(adminCent => {
                        const updateUser: User = {
                          centerID: centerResult.id,
                          uid: authResult.user.uid
                        };
                        this.authService
                          .updateUserData(updateUser)
                          .then(updated => {
                            this.isCreateLoading = false;
                            stepper.reset();
                          })
                          .catch(error => {
                            this.isCreateLoading = false;
                            this.confirmError = error;
                          });
                      })
                      .catch(error => {
                        this.confirmError = error;
                        this.isCreateLoading = false;
                      });
                  })
                  .catch(error => {
                    this.confirmError = error;
                    this.isCreateLoading = false;
                  });
              })
              .catch(error => {
                this.confirmError = error;
                this.isCreateLoading = false;
              });
          })
          .catch(error => {
            this.confirmError = error;
            this.isCreateLoading = false;
          });
      })
      .catch(error => {
        this.confirmError = error;
        this.isCreateLoading = false;
      });
  }

  onSecondNextClick(stepper: MatStepper): void {
    if (
      this.adminGroup.value.adminPassword !==
      this.adminGroup.value.adminConfirmPassword
    ) {
      this.passwordError = 'Passwords do not match';
      console.log(this.passwordError);
      return;
    }

    stepper.next();
  }

  removeMessage(): void {
    this.passwordError = '';
    this.confirmError = '';
  }
}
