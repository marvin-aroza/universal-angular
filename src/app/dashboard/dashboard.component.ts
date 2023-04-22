import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Title } from '@angular/platform-browser';
import { TitleService } from '../service/title.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private titleService: Title,
    private _titleService: TitleService
  ) {}

  ngOnInit() {
    this._titleService.geteachPageTitle('dashboard').subscribe((title) => {
      this.titleService.setTitle(title['title']);
    });
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
  }
}
