import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { AddResultViewModel } from 'app/shared/models/common/atom/add-result-viewmodel';
import { NgxSpinnerService } from "ngx-spinner";
import { first } from 'rxjs/operators';

declare let $: any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  loginFormSubmitted = false;//submitted = false;
  isLoginFailed = false;
  returnUrl: string;
  public error = '';

  //loginForm = new FormGroup({
  //  username: new FormControl('', [Validators.required]),
  //  password: new FormControl('', [Validators.required]),
  //  rememberMe: new FormControl(true)
  //});


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {


    if (this.authService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  // convenience getter for easy access to form fields
  get lf() {
    return this.loginForm.controls;
  }

  refeshPage() { }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });

    this.authService.signinUser(this.lf.username.value, this.lf.password.value, this.lf.rememberMe.value)
      .subscribe({
        next: () => {
          this.router.navigate([this.returnUrl]);
        },
        error: error => {
          this.error = error;
          this.isLoginFailed = true;
          console.log(this.error);
          this.loading = false;
          setTimeout(() => {
            $('#resetPage999').click();
          }, 100);
        }
      });
  }


}
