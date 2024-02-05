import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'res', component:UserRegistrationComponent},
    {path:'pro', component:UserProfileComponent}
]