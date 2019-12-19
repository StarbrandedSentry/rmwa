import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, Form } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../../services/auth.service';
import { CenterService } from '../../../services/center.service';
import { User } from '../../../models/user.model';

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
    private authService: AuthService
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

  onConfirmClick(): void {
    this.isCreateLoading = true;
    this.afAuth.auth
      .createUserWithEmailAndPassword(
        this.adminGroup.value.adminEmail,
        this.adminGroup.value.adminPassword
      )
      .then(result => {
        // ADD USER
        const user: User = {
          name: this.adminGroup.value.adminName,
          role: 2,
          uid: result.user.uid
        };
        this.authService
          .updateUserData(user)
          .then(result => {})
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
