import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }
  register(username: string, email: string, password: string, dat: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password,
      dat
    }, httpOptions);
  }
  report(username: string, dat: string): Observable<any>{
    return this.http.post(AUTH_API + 'repo', {
      username,
      dat
  },httpOptions);
  }
  getAll(){
    return this.http.post(AUTH_API + 'getall', httpOptions);
  }
  reset(username: string, password: string, npassword: string): Observable<any> {
    return this.http.post(AUTH_API + 'reset', {
      username,
      password,
      npassword
    }, httpOptions);
  }
}
