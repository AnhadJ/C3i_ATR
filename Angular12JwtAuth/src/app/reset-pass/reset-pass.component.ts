import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
    npassword: null
  };
  isChanged = false;
  isLoginFailed = false;
  errorMessage = '';
  isSub = false;
  constructor(public authService: AuthService, private tokenStorage: TokenStorageService) { }
  ngOnInit(): void {
  }
  onSubmit(): void {
    const { username, password, npassword } = this.form;
    this.authService.reset(username, password, npassword).subscribe(
      data => {
        this.isChanged = true;
        this.isSub = true;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isChanged = false;
        this.isSub = true;
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }
}
