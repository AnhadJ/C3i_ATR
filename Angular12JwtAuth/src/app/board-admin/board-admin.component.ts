import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent {
  jsonObj: any;
  // this.jsonObj = JSON.parse(this.currentUser.dat);
  reports: any;
  currentUser: any;
  constructor(private token: TokenStorageService, private authService: AuthService) { }
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser);
  }
}