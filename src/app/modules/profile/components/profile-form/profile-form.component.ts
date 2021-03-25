import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileDataService } from '../../services/profile-data.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  public userForm: FormGroup;
  public loading = false;
  public checkFormErrors = false;

  public showSuccess = false;
  public pendingSubmit = false;

  constructor(private formBuilder: FormBuilder,
              private profileDataService: ProfileDataService) {
  }

  ngOnInit(): void {
    /* If we want to validate phoneNumber properly on front-end,
     * we can use regex to check it.
     * In this example we use ^[^a-zA-Z]*$ to check if number contains letters.
     * If we need advanced validation on front-end
     * we can install and use google lib-phone-number dependency.
     * */
    this.userForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern('^[^a-zA-Z]*$')])],
      customBgColor: [null, Validators.required]
    });
  }

  get f(): any {
    return this.userForm.controls;
  }

  public onSubmit(): void {
    this.checkFormErrors = true;
    if (this.userForm.invalid || this.pendingSubmit) {
      return;
    }
    const profileDataObj = {
      name: this.userForm.get('username').value,
      email: this.userForm.get('email').value,
      phoneNumber: this.userForm.get('phoneNumber').value,
      customBgColor: this.userForm.get('customBgColor').value
    };
    this.pendingSubmit = true;
    /* In the task description there was a note about user being able to submit as many forms as he wants.
     * As far as I'm aware browsers do request throttling by default, so implementation of throttling
     * functionality in application may be overkill.
     * Considering the size of our application I've decided to just disable submit button
     * and submit method until the response for the last request arrives.
     * */
    this.profileDataService.submitProfileData(profileDataObj).subscribe(
        response => {
          this.checkFormErrors = false;
          this.showSuccess = true;
          this.profileDataService.saveProfileData(profileDataObj);
          setInterval(() => {
            this.showSuccess = false;
          }, 5000);
        },
        error => console.log(error),
        () => {
          this.pendingSubmit = false;
        }
    );
  }

  public onReset(): void {
    this.userForm.reset();
    this.profileDataService.saveProfileData(null);
    this.checkFormErrors = false;
  }

}
