import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _authService:AuthService,
              private _router:Router,
              private _flahMessage:FlashMessagesService) { }

  ngOnInit() {
  }
  onLogout(){
    this._authService.logOut();
    this._flahMessage.show('Now You are Logged Out',{cssClass:'alert-success',timeout:3000});
    this._router.navigate(['home']);
  }
}
