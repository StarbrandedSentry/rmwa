import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sadmin-powers',
  templateUrl: './sadmin-powers.component.html',
  styleUrls: ['./sadmin-powers.component.scss']
})
export class SadminPowersComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  navigateToCreate(): void {
    this.router.navigateByUrl('/home/create-center').then(r => {});
  }
}
