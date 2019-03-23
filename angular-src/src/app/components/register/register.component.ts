import { ValidateService } from './../../services/validate.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

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
  imageURL:String='https://www.bbvaopenmind.com/wp-content/uploads/2018/02/Sagan-1.jpg';
  constructor(private _validate:ValidateService,private _flashMessagesService: FlashMessagesService) { }

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
  }
}
