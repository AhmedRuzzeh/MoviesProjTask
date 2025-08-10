import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { filter } from 'rxjs/operators';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, FooterComponent, RouterModule, NgIf],
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  hideShell = false;
  private hiddenRoutes = ['/newmovie'];

  ngOnInit() {
    const setFlag = (url: string) => { this.hideShell = this.hiddenRoutes.some(p => url.startsWith(p)); };
    setFlag(this.router.url);
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => setFlag(e.urlAfterRedirects));
  }
}
