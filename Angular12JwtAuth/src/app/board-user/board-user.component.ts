import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {FormControl,FormGroup,FormBuilder, NgForm,Validator, Validators } from '@angular/forms'
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent{
  currentUser: any;
  jsonObj: any;
  report:FormGroup;
  month:string="";
  NoTech:string="";  
  IP:string="";  
  Product:string="";  
  Thesis:string="";  
  Book:string="";  
  Paper:string="";  
  constructor(public authService: AuthService, private frmbuilder:FormBuilder, private token: TokenStorageService) { 
    this.report=frmbuilder.group({
      month:['',[Validators.required,Validators.minLength(1)]],
      noOfTech:['',[Validators.required,Validators.minLength(1)]],
      ip:['',[Validators.required,Validators.minLength(1)]],
      product:['',[Validators.required,Validators.minLength(1)]],
      thesis:['',[Validators.required,Validators.minLength(1)]],
      book:['',[Validators.required,Validators.minLength(1)]],
      paper:['',[Validators.required,Validators.minLength(1)]],
    });
    this.currentUser = this.token.getUser();
    this.jsonObj = JSON.parse(this.currentUser.dat);
    // console.log(this.jsonObj);
  }
  PostData(report: any): void{ 
    var output: JSON;
    this.month=report.controls.month.value;
    this.NoTech=report.controls.noOfTech.value;  
    this.IP=report.controls.ip.value;  
    this.Product=report.controls.product.value;  
    this.Thesis=report.controls.thesis.value;
    this.Book=report.controls.book.value;
    this.Paper=report.controls.paper.value;

    var item:any = {};
    item["month"] = this.month;
    item["No_of_Technologies"] = this.NoTech;
    item["IPs"] = this.IP;
    item["Products"] = this.Product;
    item["Thesis"] = this.Thesis;
    item["Book"] = this.Book;
    item["Paper"] = this.Paper;
    output = <JSON>item;
    this.jsonObj.push(output);
    console.log(this.jsonObj);
    this.authService.report(this.currentUser.username, JSON.stringify(this.jsonObj)).subscribe(
      data => {
        console.log(data);
      }
    );
  }  
}
