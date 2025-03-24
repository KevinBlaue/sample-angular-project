import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment.development';

type LoginResponse = {
  'access-token': string;
  'refresh-token': string;
};

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null,
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  returnUrl: string = '/dashboard';
  public loginForm: FormGroup;
  public matcher: ErrorStateMatcher;
  public hidePassword = true;
  public loginError = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.matcher = new MyErrorStateMatcher();
  }

  ngOnInit() {
    this.returnUrl =
      this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const { userName, password } = this.loginForm.value;

    this.http
      .post<LoginResponse>(`${environment.apiUrl}auth/login`, {
        username: userName,
        password,
      })
      .subscribe({
        next: (response) => {
          this.authService.login(
            response['access-token'],
            response['refresh-token'],
          );
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (e) => {
          console.error('Error logging in:', e);
          this.loginError = 'Invalid username or password';
        },
      });
  }
}
