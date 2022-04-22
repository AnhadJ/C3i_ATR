import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent {
  jsonObj:any ;
  // this.jsonObj = JSON.parse(this.currentUser.dat);
  reports: any;
  currentUser: any;
  list : any = [];
  constructor(private token: TokenStorageService, private authService: AuthService) { }
  ngOnInit(): void {
    // this.authService.getAll().subscribe(
    //   data => {
    //     this.token.saveAdmin(data);
    //   }
    // )
    this.currentUser = this.token.getUser();
    this.jsonObj = JSON.stringify(this.token.getAdmin().dat);
    this.reports = JSON.parse(this.jsonObj);
    for(var report of this.reports)
    {
      // console.log(JSON.parse(report.dat));
      for(var rep of JSON.parse(report.dat))
      {
        var obj: any ={
          "Domain":report.username,
          "Month":rep.month,
          "No_of_Technologies":rep.No_of_Technologies,
          "IPs":rep.IPs,
          "Products":rep.Products,
          "Thesis":rep.Thesis,
          "Book":rep.Book,
          "Paper":rep.Paper
        };
        this.list.push(<JSON>obj);
      }
    }
    // console.log(this.list);
    // console.log(this.reports);
    this.list.sort((a:any,b:any) => (a.Month)>(b.Month)?1:0);
  }

  exportCsv() {
    this.downloadFile(this.list);
  }

  downloadFile(data:JSON, filename = 'Report') {
    let arrHeader = ["Domain", "Month", "No_of_Technologies", "IPs", "Products", "Thesis", "Book", "Paper"];
    let csvData = this.ConvertToCSV(data, arrHeader);
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download",this.currentUser.username +"\'s Report.csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray:JSON, headerList:any) {
    // console.log(objArray);
    // console.log(headerList);
    let array = typeof objArray!='object'?JSON.parse(objArray) : objArray;
    // console.log(array);
    let str = '';
    let row = 'S.No,';
    let newHeaders = ["Domain", "Month", "No. of Technologies", "IPs", "Products", "Thesis", "Books", "Papers"];
    for (let index in newHeaders) {
      row += newHeaders[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];
        line += ',' + array[i][head];
        // console.log(array[i]);
      }
      str += line + '\r\n';
    }
    return str;
  }
  strRep(data:any) {
    if(typeof data == "string") {
      let newData = data.replace(/,/g, " ");
       return newData;
    }
    else if(typeof data == "undefined") {
      return "-";
    }
    else if(typeof data == "number") {
      return  data.toString();
    }
    else {
      return data;
    }
  }
}