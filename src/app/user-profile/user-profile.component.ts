import { Component, OnInit } from '@angular/core';
import { faEnvelope as faregularEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserServiceService } from '../user-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  faFacebook = faFacebookSquare;
  faTwitter = faTwitter;
  faEnvelope = faEnvelope;
  faenvelope = faregularEnvelope;
  allData: any;

  constructor(private userSer:UserServiceService){}

  ngOnInit(): void {
      
  }
  allDetails(){
    this.userSer.getUsers().subscribe((data)=>{
      console.log(data);
      this.allData=data;
    })
  }

}
