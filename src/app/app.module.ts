import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { MatChipsModule } from '@angular/material/chips';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { RoundTransitionComponent } from './components/round-transition/round-transition.component';
import { ButtonSelectorComponent } from './components/button-selector/button-selector.component';
import { SummaryComponent } from './components/summary/summary.component';
import { MainGameComponent } from './pages/main-game/main-game.component';
import { RoundsComponent } from './components/rounds/rounds.component';
import { WordsComponent } from './components/words/words.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TimeComponent } from './components/time/time.component';
import { HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    RoundTransitionComponent,
    ButtonSelectorComponent,
    MainGameComponent,
    SummaryComponent,
    RoundsComponent,
    WordsComponent,
    TeamsComponent,
    TimeComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    BrowserModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
