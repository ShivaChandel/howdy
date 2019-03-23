import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  constructor() { }
  
  validateUser(user){
    if(user.name == undefined || user.username == undefined || user.email == undefined || user.password == undefined)
      return false;
    else
      return true;
  }

  validateEmail(email){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(email);
  }
}
