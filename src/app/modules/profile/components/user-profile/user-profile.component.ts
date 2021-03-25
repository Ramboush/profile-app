import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../../core/services/auth.service';
import {ProfileDataService} from '../../services/profile-data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  private dataToCall = ['foo=bar1', 'foo=bar2', 'foo=bar3'];
  public downloadSuccess = false;
  public downloadError = false;

  submittedDataSubscription: Subscription;
  profileBgColor = '';

  constructor(private authService: AuthService,
              private profileDataService: ProfileDataService) { }

  ngOnInit(): void {
    this.loadAppData();
    this.submittedDataSubscription = this.profileDataService.savedProfileData.subscribe((sumbittedData: any) => {
      this.profileBgColor = sumbittedData?.customBgColor;
    });
  }

  private loadAppData(): void {

    this.profileDataService.loadAppData(this.dataToCall).subscribe(
        () => {
          this.downloadSuccess = true;

        }, (err) => {
          console.log(err);
          this.downloadError = true;
        }
    );
  }

  public onLogoutClicked(): void {
    this.authService.logOut();
  }

  public getProfileBgColor(): string {
    return !!this.profileBgColor ? this.profileBgColor : '#ffffff';
  }

  ngOnDestroy(): void {
    this.submittedDataSubscription.unsubscribe();
  }

}
