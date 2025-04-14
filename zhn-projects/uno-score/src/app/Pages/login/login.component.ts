import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service'; 
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthStateService } from '../../services/authState/auth-state.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private authStateService: AuthStateService ,private fb: FormBuilder, private authService: LoginService, private router: Router,private toastr: ToastrService ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (control?.hasError('required')) return 'Este campo é obrigatório';
    if (control?.hasError('minlength')) return 'A senha deve ter pelo menos 4 caracteres';
    return '';
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.toastr.warning('Preencha todos os campos corretamente!', 'Atenção');
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;

    const toastRef = this.toastr.info(
      'Verificando credenciais...',
      'Aguarde',
      { disableTimeOut: true, closeButton: true }
    );

    this.authService.login(username, password).subscribe({
      next: (response) => {
        this.toastr.clear(toastRef.toastId);
        this.toastr.success('Login realizado com sucesso!', 'Bem-vindo');
        this.authStateService.setUser(response);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toastr.clear(toastRef.toastId);
        if (err.status === 401 || err.status === 500) {
          this.toastr.error('Usuário ou senha inválidos.', 'Erro no login');
        } else {
          this.toastr.error('Ocorreu um erro inesperado. Tente novamente.', 'Erro');
        }
        console.error('Erro no login:', err);
      }
    });
  }
}
