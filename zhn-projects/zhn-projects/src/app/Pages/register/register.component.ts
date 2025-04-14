import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from '../../services/register/register.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private fb: FormBuilder, private registerService: RegisterService, private toastr: ToastrService, private router: Router) { }

  cadastroForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    surname: ['', [Validators.required, Validators.minLength(3)]],
    birth: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.matchPasswords });

  submitForm() {
    if (this.cadastroForm.invalid) {
      this.toastr.warning('Preencha todos os campos corretamente!', 'Atenção');
      this.cadastroForm.markAllAsTouched();
      return;
    }

    const toastRef = this.toastr.info(
      'Enviando os dados de cadastro...',
      'Aguarde',
      { disableTimeOut: true, closeButton: true }
    );

    const dataRegister = this.cadastroForm.value;

    const objectRegister = {
      name: dataRegister.name,
      surname: dataRegister.surname,
      birth: dataRegister.birth,
      login: {
        username: dataRegister.username,
        password: dataRegister.password
      }
    };

    this.registerService.postMatchData(objectRegister).subscribe({
      next: (response) => {
        this.toastr.clear(toastRef.toastId); 
        this.toastr.success('Cadastro realizado com sucesso!', 'Sucesso');
        console.log('Registro enviado com sucesso:', response);
        this.cadastroForm.reset(); 
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500)
      },
      error: (err) => {
        this.toastr.clear(toastRef.toastId); 
        this.toastr.error('Erro ao cadastrar. Tente novamente.', 'Erro');
        console.error('Erro ao enviar dados:', err);
      }
    });
  }

  private matchPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  isInvalid(field: string) {
    return this.cadastroForm.controls[field].invalid && this.cadastroForm.controls[field].touched;
  }
}
