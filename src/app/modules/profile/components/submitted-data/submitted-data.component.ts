import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { ProfileDataService } from '../../services/profile-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-submitted-data',
  templateUrl: './submitted-data.component.html',
  styleUrls: ['./submitted-data.component.scss']
})
export class SubmittedDataComponent implements OnInit, OnDestroy {

  submittedDataSubscription: Subscription;
  submittedData: any = null;
  @Input() isMain = false;

  constructor(private profileDataService: ProfileDataService) { }

  ngOnInit(): void {
    this.submittedDataSubscription = this.profileDataService.savedProfileData.subscribe((sumbittedData) => {
      this.submittedData = sumbittedData;
    });
  }

  ngOnDestroy(): void {
    this.submittedDataSubscription.unsubscribe();
  }

}
