import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainGameComponent } from './pages/main-game/main-game.component';
import { RoundsComponent } from './components/rounds/rounds.component';
import { TimeComponent } from './components/time/time.component';
import { WordsComponent } from './components/words/words.component';
import { TeamsComponent } from './components/teams/teams.component';
import { SummaryComponent } from './components/summary/summary.component';

const routes: Routes = [
  { path: 'rounds', component: RoundsComponent, data: { animation: 1 } },
  { path: 'time', component: TimeComponent, data: { animation: 2 } },
  { path: 'words', component: WordsComponent, data: { animation: 3 } },
  { path: 'teams', component: TeamsComponent, data: { animation: 4 } },
  { path: 'summary', component: SummaryComponent, data: { animation: 5 } },
  { path: 'game', component: MainGameComponent, data: { animation: 6 } },
  { path: '**', redirectTo: 'rounds' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
