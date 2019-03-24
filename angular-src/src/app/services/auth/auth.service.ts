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
              
            
  }
  errorHandler(error:HttpErrorResponse){
      return throwError(error.message||"Server not responding");
  }
}
