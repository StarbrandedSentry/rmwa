import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CenterService } from '../../services/center.service';

@Component({
  selector: 'app-sadmin-powers',
  templateUrl: './sadmin-powers.component.html',
  styleUrls: ['./sadmin-powers.component.scss']
})
export class SadminPowersComponent implements OnInit {
  constructor(private router: Router, public centerService: CenterService) {}

  ngOnInit() {}

  navigateToCreate(): void {
    this.router.navigateByUrl('/home/create-center').then(r => {});
  }
}
