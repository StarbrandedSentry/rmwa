import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CenterService } from '../../services/center.service';
import { GuardService } from '../../services/guard.service';

@Component({
  selector: 'app-sadmin-powers',
  templateUrl: './sadmin-powers.component.html',
  styleUrls: ['./sadmin-powers.component.scss']
})
export class SadminPowersComponent implements OnInit {
  isAddingAdmin = false;

  constructor(
    private router: Router,
    public centerService: CenterService,
    private guard: GuardService
  ) {}

  ngOnInit() {
    this.guard.checkRole(1);
  }
  navigateToCreate(): void {
    this.router.navigateByUrl('/home/create-center').then(r => {});
  }

  getAdmins(centerID: string) {
    this.centerService.getAdmins(centerID);
  }

  tryAddAdmin() {
    this.isAddingAdmin = true;
  }

  closeAdminAddition() {
    this.isAddingAdmin = false;
  }
}
