
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user:any={};
  private dataFromService:any={};
  private profileInitial:any={};

  constructor(private _authService:AuthService) { }

  ngOnInit() {
    this._authService.getProfile().subscribe(data=>{
      this.dataFromService=data;
      console.log(data);
      this.user=this.dataFromService.user;
      this.makeProfile();

    },(error)=>{
      return false;
    });
  }
  makeProfile(){

    this._authService.makeInitialProfile(this.user).subscribe(data=>{
      this.profileInitial=data;
    });

  }
  editProfile(){

  }

}
