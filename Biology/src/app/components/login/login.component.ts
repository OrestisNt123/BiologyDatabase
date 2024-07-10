import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private service: UserService, private authService: AuthService, private router: Router, private fb: FormBuilder) {}

  loginForm!: FormGroup;
  errorMessage: string = '';

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl ('', [Validators.required]),
      password: new FormControl ('', [Validators.required])
    });
  }
  
  onSubmit(){
    if (this.loginForm.valid){
      this.service.getUser(this.loginForm.value.username, this.loginForm.value.password).subscribe({
        next: (data: any) => {
          this.authService.setLoggedIn(true);
          this.authService.setAdmin(data.data.admin);
          this.router.navigate(['search']);
        },
          error: (error) => {
          this.errorMessage = error.error.message;
          console.log(error);
        }
      })
    }
  }

  switchToRegister(): void {
    this.router.navigate(['register']);
  }
}
