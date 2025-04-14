import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthStateService } from '../../services/authState/auth-state.service';
import { IMatchData } from '../../interfaces/matchData';


@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent {

  playerForm: FormGroup;
  user: any;
  userId: string;
  hasOngoingMatch: boolean = false

  constructor(private fb: FormBuilder, private router: Router, private authStateService: AuthStateService) {

    this.user = authStateService.getUser()
    this.userId = authStateService.getUser().id

    this.playerForm = this.fb.group({
      players: this.fb.array([
        this.createPlayerControl(),
        this.createPlayerControl(),
      ]),
      training: [1, [Validators.required, Validators.min(1)]],
      champion: [{ value: 1, disabled: true }],
      user: this.fb.group({
        id: [this.getUserid()]
      })
    })
  }

   getMatchDataForUser(userId: string): IMatchData | null {
        const matches = JSON.parse(localStorage.getItem('matches') || '[]') as IMatchData[];
        return matches.find(m => m.userId === userId) || null;
      }

  getUserid(): number | null {
    const user = localStorage.getItem('auth_user');
    if (user) {
      const parsedUser = JSON.parse(user);

      return parsedUser.id || null;
    }
    return null;
  }

  getUsername(): number | null {
    const user = localStorage.getItem('auth_user');
    if (user) {
      const parsedUser = JSON.parse(user);

      return parsedUser.name || null;

    }
    return null;
  }

  ngOnInit(): void {
    const savedMatch = this.getMatchDataForUser(this.userId)
    console.log(savedMatch);
    
    if (savedMatch) {
      this.hasOngoingMatch = true;
    }
  }

  resumeMatch(): void {
    const savedMatch = this.getMatchDataForUser(this.userId);
    if (savedMatch) {
      this.router.navigate(['/match'], { state: { data: savedMatch.match } });
    }
  }

  createPlayerControl(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  get players(): FormArray {
    return this.playerForm.get('players') as FormArray;
  }

  addPlayer(): void {
    this.players.push(this.createPlayerControl());

  }

  removePlayer(index: number): void {
    this.players.removeAt(index);
  }

  onSubmit(): void {
    if(this.hasOngoingMatch){
      return console.warn("Existe uma partida em andamento, finalize antes de iniciar uma nova");
    }
    if (this.playerForm.valid) {
      const matchData = {
        ...this.playerForm.getRawValue()
      }

      const formData = {
        playerName: this.players.value.map((player: { username: string }) => player.username),
        training: this.playerForm.value.training,
        champion: 1,
        user: this.playerForm.value.user,
        host: this.getUsername()
      };
     
      this.router.navigate(['/match'], { state: { data: matchData } });

      console.log('Form Submitted:', formData);
    } else {
      console.error('Form Invalid!');
    }

  }
}
