import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { StartGameComponent } from './pages/start-game/start-game.component';
import { MainGameComponent } from './pages/main-game/main-game.component';
import { NumericInputComponent } from './components/numeric-input/numeric-input.component';
import { RoundTransitionComponent } from './components/round-transition/round-transition.component';

@NgModule({
  declarations: [
    AppComponent,
    StartGameComponent,
    MainGameComponent,
    StartGameComponent,
    NumericInputComponent,
    RoundTransitionComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
