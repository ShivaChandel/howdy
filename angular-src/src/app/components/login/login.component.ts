import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username:String;
  public password:String;
  private _dataServiceData:any={};

  constructor(private _authService:AuthService,
              private _router:Router,
              private _flahMessage:FlashMessagesService) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user ={
      username:this.username,
      password:this.password
    }

    this._authService.authenticateUser(user).subscribe(data=>{
      console.log(data);
      this._dataServiceData=data;

      if(this._dataServiceData.success){
        this._authService.storeUserData(this._dataServiceData.token,this._dataServiceData.user);
        this._flahMessage.show('You are now Logged in !',{cssClass:'alert-success',timeout:3000});
        this._router.navigate(['dashboard']);
      }else{
        this._flahMessage.show(this._dataServiceData.msg,{cssClass:'alert-danger',timeout:3000});
        this._router.navigate(['login']);
      }
    });
  }

}
