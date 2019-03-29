
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
  private _userId:any;

  edit_bio:String='';
  edit_gender:String='';
  edit_username:String='';
  edit_name:String='';
  edit_email:String='';

  constructor(private _authService:AuthService) {
                }

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
      console.log("Profile Set");
      console.log(data);
      this.dataFromService=data;
      this._userId = this.dataFromService.user_id;
      console.log("id");
      console.log(this._userId);
    });

  }
  editProfile(e){
    const user={
      name:this.edit_name,
      username:this.user.username,
      bio:this.edit_bio,
      gender:this.edit_gender,
      email:this.edit_email,
      user_id:this._userId,
    }
    console.log("To Update");
    console.log(user);
    this._authService.editProfile(user)
          .subscribe(data=>{
            this.dataFromService=data;
            this.user=this.dataFromService.user;
            console.log(data);
          })

  }

  editInitial(){
    this.edit_bio="I am HOwdy Member";
    this.edit_gender='Male';
    this.edit_username=this.user.username;
    this.edit_name=this.user.name;
    this.edit_email=this.user.email;
  }
}
