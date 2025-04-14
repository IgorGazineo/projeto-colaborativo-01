import { Component } from '@angular/core';
import { HistoryIdService } from '../../services/history/history-id.service';
import { AuthStateService } from '../../services/authState/auth-state.service';
import { CommonModule } from '@angular/common';

type matchHistoryType = {
  historyId: number | string | undefined,
  type: string,
  winner: string,
}


type historyType = {
  historyId: number | string | undefined,
  userName: string,
  matchHistory: matchHistoryType[],
  champ: string,
  training: string,
  date: string,

}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})


export class HistoryComponent {

  historyData: any[] = [];
  errorMessage: string = '';

  constructor(private historyService: HistoryIdService, private authStateService: AuthStateService) { }

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    const user = this.authStateService.getUser();
    if (user && user.id) {
      this.historyService.getHistoryById(user.id).subscribe({
        next: (data) => {
          console.log('dataHistory', data);

          this.historyData = data;
        },
        error: (err) => {
          this.errorMessage = 'Erro ao carregar historico';
          console.error(err);
        }
      })
    } else {
      this.errorMessage = 'Usuário não autenticado.';
    }
  }
}
