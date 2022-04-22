import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(public authService: AuthService, private tokenStorage: TokenStorageService) { }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.getAll().subscribe(
      data => {
        this.tokenStorage.saveAdmin(data);
      }
    );
    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
    // if(!this.roles.some(x => x ==="admin"))
    // {
    //   // console.log("YUP");
    //   this.authService.getAll().subscribe(
    //     data => {
    //       this.tokenStorage.saveAdmin(data);
    //     }
    //   )
    //   // this.reloadPage();
    // }
  }
  onClick(): void{
    this.reloadPage();
  }
  reloadPage(): void {
    window.location.reload();
  }
}