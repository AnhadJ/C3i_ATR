import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import rp from '../../data.json';

interface Report{
  month: String;
  No_of_Technologies: Number;
  IPs: Number;
  Products: Number;
  Thesis: Number;
  Book: Number;
  Paper: Number
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {
  currentUser: any;
  constructor(private token: TokenStorageService) { }
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }
  reports: Report[] = rp;
}