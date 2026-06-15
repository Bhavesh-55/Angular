import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { ProfileCard } from './profile-card/profile-card';
import { skip } from 'rxjs';
import { SkillList } from './skill-list/skill-list';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header,Footer,ProfileCard,SkillList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-learning-app');
}
