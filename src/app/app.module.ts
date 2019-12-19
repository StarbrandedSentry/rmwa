import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { FirebaseModule } from './firebase/firebase.module';
import { SigninComponent } from './dialogs/signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment.prod';
import { AuthService } from './services/auth.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { SadminConfigureComponent } from './home/sadmin-configure/sadmin-configure.component';
import { SadminPowersComponent } from './home/sadmin-powers/sadmin-powers.component';
import { DashComponent } from './home/dash/dash.component';
import { CategoryService } from './services/category.service';
import { EditDialogComponent } from './dialogs/edit-dialog/edit-dialog.component';
import { CreateCategoryComponent } from './dialogs/create-category/create-category.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { CreateCenterComponent } from './home/sadmin-powers/create-center/create-center.component';
import { CenterService } from './services/center.service';
import { AdminPowersComponent } from './home/admin-powers/admin-powers.component';
import { ResearchComponent } from './home/research/research.component';
import { DropZoneDirective } from './home/research/drop-zone.directive';
import { AngularFireStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SigninComponent,
    SpinnerComponent,
    SadminConfigureComponent,
    SadminPowersComponent,
    DashComponent,
    EditDialogComponent,
    CreateCategoryComponent,
    ConfirmDialogComponent,
    CreateCenterComponent,
    AdminPowersComponent,
    ResearchComponent,
    DropZoneDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FirebaseModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, CategoryService, CenterService, AngularFireStorage],
  bootstrap: [AppComponent],
  entryComponents: [
    SigninComponent,
    EditDialogComponent,
    ConfirmDialogComponent,
    CreateCategoryComponent
  ]
})
export class AppModule {}
