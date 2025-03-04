import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartGameComponent } from './pages/start-game/start-game.component';
import { MainGameComponent } from './pages/main-game/main-game.component';

const routes: Routes = [
  { path: '', component: StartGameComponent },
  { path: 'game', component: MainGameComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
