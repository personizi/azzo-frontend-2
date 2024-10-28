  import { Component, ChangeDetectorRef } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { Observable } from 'rxjs';
  import { AuthService } from '../../services/auth.service';
  import { ActivatedRoute, Router } from '@angular/router';
  import { Login } from '../../models/login.model';

  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
  })
  export class LoginComponent {
    loginForm: FormGroup;
    hasError = false;
    returnUrl: string;
    isLoading$: Observable<boolean>;
    errorMessage: string;
    // private fields
 

    constructor(
      private readonly formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router,
      
      private cdr: ChangeDetectorRef 
    ) {
      this.loginForm = this.formBuilder.group({
        password: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
      });
  

      // // redirect to home if already logged in
      // if (this.authService.getToken()) {
      //   this.router.navigate(['/']);
      // }
    }




    // convenience getter for easy access to form fields
    get f() {
      return this.loginForm.controls;
    }

    submit() {
      const login: Login = { email: this.f.email.value, senha: this.f.password.value };
      
      this.authService.login(login).subscribe({
        next: (response) => {
          // Armazena o token diretamente e redireciona
          const token = response.body.token;
          this.authService.setToken(token);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          // Captura a mensagem de erro diretamente do servidor
          this.errorMessage = error.error.message || 'Erro no login.';
          this.cdr.detectChanges(); 
        },
      });
    }
  }
