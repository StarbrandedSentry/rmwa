import { Component, OnInit } from '@angular/core';
import { GuardService } from '../../services/guard.service';
import { AuthService } from '../../services/auth.service';
import { CenterService } from '../../services/center.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-powers',
  templateUrl: './admin-powers.component.html',
  styleUrls: ['./admin-powers.component.scss']
})
export class AdminPowersComponent implements OnInit {
  constructor(
    private guard: GuardService,
    private authService: AuthService,
    public centerService: CenterService,
    public router: Router
  ) {}

  ngOnInit() {
    this.guard.checkRole(2);
    this.centerService.getMembers(this.authService.user.centerID);
  }

  routeToCreate(id: string) {
    this.router.navigate(['/home/create-member', { id }]);
  }
}
