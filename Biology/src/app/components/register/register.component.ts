import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessage: string = '';

  constructor(private service: UserService, private authService: AuthService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.service.registerUser(this.registerForm.value.username, this.registerForm.value.password).subscribe({
        next: (data: any) => {
          console.log('User registered:', data);
          this.router.navigate(['login']);
        },
        error: (error) => {
          this.errorMessage = error.error.message;
          console.log('Registration error:', error);
        }
      });
    }
  }

  switchToLogin(): void {
    this.router.navigate(['login']);
  }
}