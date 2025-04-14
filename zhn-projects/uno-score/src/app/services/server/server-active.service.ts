import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerActiveService {

  private apiUrl = `https://unoscoreapi.eduar4959.c44.integrator.host/api/server/status`

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  checkServerStatus() {
    
    const toastRef = this.toastr.info(
      'Verificando o status do servidor...',
      'Aguarde',
      { disableTimeOut: true, closeButton: true }
    );

    this.http.get(this.apiUrl, { responseType: 'text' }).pipe(
      catchError((error) => {
        console.error('Erro ao verificar o servidor:', error);
        this.toastr.error(
          'O servidor está offline. Tente novamente mais tarde.',
          'Erro'
        );
        return of(null);
      }),
      finalize(() => {
        // Remove a notificação ao concluir a verificação
        this.toastr.clear(toastRef.toastId);
      })
    ).subscribe((response) => {
      if (response === '') {
        console.log( "reposta serv", response, typeof response );
        
        this.toastr.success('O servidor está online.', 'Sucesso');
      } else if (response) {
        this.toastr.warning('Resposta inesperada do servidor.', 'Aviso');
      }
    });
  }

}
// this.toastr.warning('Resposta inesperada do servidor.', 'Aviso');
