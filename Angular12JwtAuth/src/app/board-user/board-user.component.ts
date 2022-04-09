import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,FormBuilder, NgForm,Validator, Validators } from '@angular/forms'
import rp from '../../assets/data.json';
@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent{

  report:FormGroup;  
  NoTech:string="";  
  IP:string="";  
  Product:string="";  
  Thesis:string="";  
  Book:string="";  
  Paper:string="";  
  constructor(private frmbuilder:FormBuilder) { 
    this.report=frmbuilder.group({
      noOfTech:['',[Validators.required,Validators.minLength(1)]],
      ip:['',[Validators.required,Validators.minLength(1)]],
      product:['',[Validators.required,Validators.minLength(1)]],
      thesis:['',[Validators.required,Validators.minLength(1)]],
      book:['',[Validators.required,Validators.minLength(1)]],
      paper:['',[Validators.required,Validators.minLength(1)]],
    });
  }

  PostData(report:any){  
    this.NoTech=report.controls.noOfTech.value;  
    this.IP=report.controls.ip.value;  
    this.Product=report.controls.product.value;  
    this.Thesis=report.controls.thesis.value;
    this.Book=report.controls.book.value;
    this.Paper=report.controls.paper.value;
    var jsonObj = [];
    var item:any = {};
    item["month"] = this.NoTech;
    item["No_of_Technologies"] = this.NoTech;
    item["IPs"] = this.IP;
    item["Products"] = this.Product;
    item["Thesis"] = this.Thesis;
    item["Book"] = this.Book;
    item["Paper"] = this.Paper;
    rp.push(item);
    console.log(rp);
    
  }  

}
