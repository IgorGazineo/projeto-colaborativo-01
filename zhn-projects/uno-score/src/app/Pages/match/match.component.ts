import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonLogoutComponent } from '../../components/button-logout/button-logout.component';
import { AuthStateService } from '../../services/authState/auth-state.service';
import { MatchDataService } from '../../services/match/match-data.service';
import { RouterLink } from '@angular/router';

import { IMatchData } from '../../interfaces/matchData'
interface Player {
  username: string;
}
@Component({
  selector: 'app-match',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonLogoutComponent],
  templateUrl: './match.component.html',
  styleUrl: './match.component.scss'
})

export class MatchComponent {
  matchData: any;
  matchDataStorage: any
  host: string = "empty"; 
  hostID: string = ""
  playersName:Player[] = [];
  players: { username: string; roundWins: number; winC: boolean; winT: boolean }[] = [];

  trainingHistory: { roundNumber: number; winner: string; type: string }[] = [];
  currentRound: number = 1;
  winnerTraining: string | null = null; // Vencedor do treino
  winnerChampion: string | null = null; // Vencedor do champion
  trainingRounds: number  = 1; // Número de rodadas para vencer o treino
  selectedWinner: string | null = null; // Jogador selecionado no select
  isTrainingActive: boolean = true; // Treino está ativo
  isChampionActive: boolean = false; // Champion está ativo

  isModalVisible: boolean = false;
  ngOnInit(): void {

     const matches = JSON.parse(localStorage.getItem('matches') || '[]') as IMatchData[];

    // Busca a partida correspondente ao usuário atual
    const savedMatch = matches.find(m => m.userId === this.hostID);
  
    if (savedMatch) {
      console.log("save", savedMatch);
      // Carrega os dados da partida
      this.syncMatchData(savedMatch.match);

    } else if (this.matchData) {
      console.log("savei");
      // Inicializa os dados com base na navegação anterior
      this.matchDataStorage = {
        userId: this.hostID,
        match: {
          isTrainingActive: true,
          isChampionActive: false,
          players: this.matchData.players.map((username: string) => ({
            username,
            roundWins: 0,
            winC: false,
            winT: false
          })),
          history: [],
          currentRound: 1,
          winnerTraining: null,
          winnerChampion: null,
          trainingRounds: this.matchData.training
        }
      };
  
      // Salva no localStorage
      this.saveMatchDataToLocalStorage();
    } else {
      // Redireciona se não houver dados
      this.router.navigate(['/home']);
    }
  }


  syncMatchData(data: any): void {
    this.hostID = data.hostId || this.hostID;
    this.isTrainingActive = data.isTrainingActive;
    this.isChampionActive = data.isChampionActive;
    this.players = data.players || [];
    this.trainingHistory = data.history || [];
    this.currentRound = data.currentRound || 1;
    this.winnerTraining = data.winnerTraining || null;
    this.winnerChampion = data.winnerChampion || null;
    this.trainingRounds = data.trainingRounds || 1;
  }

  constructor(private router: Router, stateService: AuthStateService, private matchDataService: MatchDataService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.matchData = navigation?.extras.state?.['data'];
      console.log('Dados matchData:', this.matchData);
      this.trainingRounds = this.matchData.training;
    }
  
    if(stateService.getUser()){
      this.host = stateService.getUser().name;
      
      this.hostID = stateService.getUser().id;
      
    }
    
    if( this.matchData?.players) {
      this.playersName = this.matchData.players;
      this.inicializePlayers();
      
    }
    
  }

  saveMatchDataToLocalStorage(): void {
    const matches = JSON.parse(localStorage.getItem('matches') || '[]') as IMatchData[];

    const matchDataStorage: IMatchData = {
      userId: this.hostID,
      match: {
        isTrainingActive: this.isTrainingActive,
        isChampionActive: this.isChampionActive,
        players: this.players,
        history: this.trainingHistory,
        currentRound: this.currentRound,
        winnerTraining: this.winnerTraining,
        winnerChampion: this.winnerChampion,
        trainingRounds: this.trainingRounds,
      }
    };


    const existingMatchIndex = matches.findIndex(m => m.userId === this.hostID);
    if (existingMatchIndex !== -1) {
      matches[existingMatchIndex] = matchDataStorage;
      } else {
        matches.push(matchDataStorage);
      }
    

    localStorage.setItem('matches', JSON.stringify(matches));
  }

  navigateHome(): void {
    this.router.navigate(['/home']);
  }

  inicializePlayers(): { username: string; roundWins: number; winC: boolean; winT: boolean }[] {
    return this.players = this.playersName.map(player => ({
      username: player.username,
      roundWins: 0,
      winC: false,
      winT: false
    }))
  }
  
  // Adiciona uma rodada de treino ao histórico
  addTrainingRound(winner: string): void {
    this.trainingHistory.push({
      roundNumber: this.currentRound++,
      winner: winner,
      type: 'training', // Tipo de rodada
    });
  }

  // Adiciona a rodada final do "champion"
  addChampionRound(winner: string): void {
    this.trainingHistory.push({
      roundNumber: this.currentRound,
      winner: winner,
      type: 'champion', // Tipo de rodada
    });
  }

  selectWinner(username: string) {
    this.selectedWinner = username;
    // console.log('Jogador selecionado:', username);
  }

  addTrainingPoint() {
    if (this.selectedWinner && this.isTrainingActive) {
      const player = this.players.find((p) => p.username === this.selectedWinner);
      if (player) {
        player.roundWins++;
        this.trainingHistory.push({
          roundNumber: this.currentRound,
          winner: player.username,
          type: "training"
        }); // Adiciona ao histórico
        this.checkTrainingWinner();
        this.currentRound++;
        this.selectedWinner = null;

        this.saveMatchDataToLocalStorage();
      }
    }
  }

  endMatch(): void {
    // Limpa os dados locais e do localStorage
    this.deleteMatchData(this.hostID)
    this.matchData = null;
    this.matchDataStorage = null;
    this.players = [];
    this.trainingHistory = [];
    this.currentRound = 1;
    this.winnerTraining = null;
    this.winnerChampion = null;
  
    // console.log("Partida encerrada. Dados removidos.");
    this.router.navigate(['/home']);
  }

  deleteMatchData(userId: string): void {
    const matches = JSON.parse(localStorage.getItem('matches') || '[]') as IMatchData[];
    const updatedMatches = matches.filter(m => m.userId !== userId);
    localStorage.setItem('matches', JSON.stringify(updatedMatches));
  }

  checkTrainingWinner() {
    const winner = this.players.find((player) => player.roundWins >= this.trainingRounds);
    if (winner) {
      this.winnerTraining = winner.username;
      // Finaliza o treino e habilita o champion
      this.isTrainingActive = false;
      this.isChampionActive = true;
    }
  }

  addChampionPoint() {
    if (this.selectedWinner && this.isChampionActive) {
      const player = this.players.find((p) => p.username === this.selectedWinner);
      if (player) {
        player.roundWins++;
        this.winnerChampion = player.username;

        // Adiciona a rodada ao histórico
        this.trainingHistory.push({
          roundNumber: this.currentRound,
          winner: player.username,
          type: 'champion', // Define como rodada do champion
        });
        const matchData = this.gatherMatchData();
        console.log("OBJECT API", matchData);

        this.matchDataService.postMatchData(matchData).subscribe({
          next: (response) => {
            console.log('Dados enviados com sucesso:', response);
           
            console.log("envi", this.matchData);
            
          },
          error: (err) => {
            console.error('Erro ao enviar dados:', err);
          }

        });
        
        // Finaliza o champion
        this.isChampionActive = false;
        this.showModal();
      }
    }

  }
  gatherMatchData() {
    const matchResult = {
      user: { id: this.hostID},
      tranning: this.trainingRounds,
      winnerChampion: this.winnerChampion,
      winnerTraining: this.winnerTraining,
      history: this.trainingHistory,
      players: this.players.map(player => ({
        username: player.username,
        roundWins: player.roundWins,
        trainingWinner: player.username === this.winnerTraining,
        championWinner: player.username === this.winnerChampion
      })),
    };
  
    return matchResult;
  }

  showModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.endMatch();
    this.isModalVisible = false;
  }
}
