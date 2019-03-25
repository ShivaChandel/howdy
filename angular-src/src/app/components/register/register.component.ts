import { ValidateService } from './../../services/validate.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../../services/auth/auth.service';
import {Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:String;
  username:String;
  email:String;
  password:String;
  
  private _dataServiceData :any={};

  constructor(private _validate:ValidateService,
    private _flashMessagesService: FlashMessagesService,
    private _authservice:AuthService,
    private _router:Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user={
      name:this.name,
      username:this.username,
      email:this.email,
      password:this.password,
    }
    
    //required field

    if(!this._validate.validateUser(user))
      {
        this._flashMessagesService.show('Please fill all the fields!',{cssClass:'alert-danger',timeout:1000})
        return false;
      }
    if(!this._validate.validateEmail(user.email)){
      this._flashMessagesService.show('Please use a valid email!',{cssClass:'alert-danger',timeout:1000})
      return false;
    }

     //register User
    this._authservice.registerUser(user)
      .subscribe(data =>{
        this._dataServiceData=data;

        if(this._dataServiceData.success){
          this._flashMessagesService.show('Registration Succesfull ! ',{cssClass:'alert-success',timeout:3000})
          this._router.navigate(['/login']);
        }else{
          this._flashMessagesService.show('Oops Something went wrong! ',{cssClass:'alert-danger',timeout:3000})
          this._router.navigate(['/register'])
        }
      })
  }

  //register User
  
}
