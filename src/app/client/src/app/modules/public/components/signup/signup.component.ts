import { Component, OnInit, ViewChild } from '@angular/core';
import { ResourceService, ConfigService, ToasterService } from '@sunbird/shared';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('modal') modal;
  /**
  * sign up form name
  */
  signUpForm: FormGroup;
  /**
  * Contains reference of FormBuilder
  */
  sbFormBuilder: FormBuilder;
  /**
  * Contains list of languages from config file
  */
  languages: Array<string>;
  /**
  * Boolean value to either show/hide app loader
  */
  showLoader = false;

  constructor(public resourceService: ResourceService, public configService: ConfigService,
    public router: Router, public signupService: SignupService, public toasterService: ToasterService) {
    this.languages = this.configService.dropDownConfig.COMMON.languages;
  }
  /**
   * This method is used to create formgroup instance
   */
  ngOnInit() {
    this.signUpForm = new FormGroup({
      userName: new FormControl(null, [Validators.required, Validators.pattern('^[-\\w\.\\$@\*\\!]{5,256}$')]),
      password: new FormControl(null, [Validators.required, Validators.pattern('^[^-\s]*[a-zA-Z0-9*@_.!\s-]*[a-z0-9-A-z*@_.!]$')]),
      firstName: new FormControl(null, [Validators.required, Validators.pattern('^[^-\s]*[a-zA-Z0-9*@_.!\s-]*[a-z0-9-A-z*@_.!]$')]),
      lastName: new FormControl(null),
      phone: new FormControl(null, [Validators.required, Validators.pattern('^\\d{10}$')]),
      email: new FormControl(null, [Validators.required,
      Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$/)]),
      language: new FormControl(null, [Validators.required])
    });
  }
  /**
   * This method is used to navigate back
   */
  redirect() {
    this.router.navigate(['']);
  }
  /**
   * This method invokes signup servicec to create new user
   */
  onSubmitForm() {
    this.showLoader = true;
    this.signupService.signup(this.signUpForm.value).subscribe(res => {
      this.modal.approve();
      this.showLoader = false;
      this.toasterService.success(this.resourceService.messages.smsg.m0039);
      this.router.navigate(['']);
    },
      err => {
        this.showLoader = false;
        this.toasterService.error(err.error.params.errmsg);
      });
  }

}