import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService {
  constructor(private authService: AuthService, private router: Router) {}

  checkRole(role: number) {
    this.authService.user$.subscribe(user => {
      if (!user || user.role !== role) {
        // if (this.authService.user.role === role) {
        //   return;
        // }
        this.router.navigateByUrl('/home/dash').then(() => {});
      }
    });
    // if (!this.authService.user || this.authService.user.role !== role) {
    //   this.router.navigateByUrl('/home/dash').then(() => {});
    // }
  }
}
