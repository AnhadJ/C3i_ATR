import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';
import rp from '../../assets/data.json';

interface Report{
  month: String;
  No_of_Technologies: String;
  IPs: String;
  Products: String;
  Thesis: String;
  Book: String;
  Paper: String
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  jsonObj: any;
  // this.jsonObj = JSON.parse(this.currentUser.dat);
  reports: any;
  currentUser: any;
  constructor(private token: TokenStorageService, private authService: AuthService) { }
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser);
    // console.log(this.jsonObj);
    // console.log(this.jsonObj+"hello");
    this.jsonObj = JSON.parse(this.currentUser.dat);
    this.reports = this.jsonObj;
    console.log(this.reports);
  }
}