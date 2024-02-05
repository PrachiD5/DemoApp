import { Component } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { faEnvelope as faregularEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserServiceService } from '../user-service.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIconModule,
    MatIcon,
    MatButtonModule,
    FontAwesomeModule,
    CommonModule,
    HttpClientModule,
    MatCheckboxModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  faFacebook = faFacebookSquare;
  faTwitter = faTwitter;
  faEnvelope = faEnvelope;
  faenvelope = faregularEnvelope;
  faSearch = faSearch;
  locations: any[] = [];
  selectedValues: any;

  constructor(
    private userSer: UserServiceService,
    private rou: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userSer.getLocations().subscribe(
      (data: any[]) => {
        this.locations = data;
        console.log('Locations:', this.locations);
      },
      (error) => console.error('Error fetching locations:', error)
    );
  }

  openRegForm() {
    this.dialog.open(UserRegistrationComponent);
  }
}
