import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private _dataService:any={};
  public user={};
  constructor(private _authService:AuthService,
              private _router:Router) { }

  ngOnInit() {
    this._authService.getProfile().subscribe(data=>{
      console.log(data);
      this._dataService=data;
      this.user = this._dataService.user;
    },err=>{
      console.log(err);
      return false;
    })
  }

}
