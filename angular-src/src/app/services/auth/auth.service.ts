import { catchError,map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token:any;
  private user:any;

  constructor(private http:HttpClient) { }

  registerUser(user){
    let headers = new HttpHeaders();
    headers.append('content-type','application/json');

    return this.http.post('http://localhost:8080/users/register',user,{headers:headers})
            .pipe(catchError(this.errorHandler))          
  }

  errorHandler(error:HttpErrorResponse){
      return throwError(error.message||"Server not responding");
  }

  authenticateUser(user){
    let headers = new HttpHeaders();
    headers.append('content-type','application/json');

    return this.http.post('http://localhost:8080/users/authenticate',user,{headers:headers})
            .pipe(catchError(this.errorHandler))
  }

  getProfile(){
    let headers = new HttpHeaders();
    this.loadToken();
    headers=headers.append('Authorization',this.token).append('content-type','application/json');

    return this.http.get('http://localhost:8080/users/profile',{headers:headers})
            .pipe(catchError(this.errorHandler))
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.token=token;
  }

  
  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));

    this.token = token;
    this.user=user;

    console.log(token);

  }

  logOut(){
    this.token=null;
    this.user=null;
    localStorage.clear();
  }

  makeInitialProfile(user){
    let headers = new HttpHeaders();
    
    headers=headers.append('content-type','application/json');
    console.log("Make initial Profile");
    console.log(user);
    return this.http.post('http://localhost:8080/users/makeProfile',user,{headers:headers})
            .pipe(catchError(this.errorHandler)) 
  }
}
