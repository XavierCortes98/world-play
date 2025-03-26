import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './shared/route-animation';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent {
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('en-US');
    const browserLang = translateService.getBrowserCultureLang();
    console.log(browserLang);
    this.translateService.use(
      browserLang?.match(/en-US|es-ES/) ? browserLang : 'en-US'
    );
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang);
  }

  prepareRoute(outlet: RouterOutlet) {
    const animation =
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation'];
    return animation ? animation.toString() : null;
  }
}
