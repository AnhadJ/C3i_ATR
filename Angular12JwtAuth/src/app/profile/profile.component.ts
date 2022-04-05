import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
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
  reports: Report[] = rp;
  currentUser: any;
  constructor(private token: TokenStorageService) { }
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }
}