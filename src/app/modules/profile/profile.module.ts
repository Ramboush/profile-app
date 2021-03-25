import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmittedDataComponent } from './components/submitted-data/submitted-data.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileDataService } from './services/profile-data.service';
import { HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [SubmittedDataComponent, UserProfileComponent, ProfileFormComponent, ProfilePageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
      ProfileDataService
  ]
})
export class ProfileModule { }
