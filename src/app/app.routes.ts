import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { SkillsPage } from './pages/skills-page/skills-page';
import { AboutPage } from './pages/about-page/about-page';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },  
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'profile',
    component: ProfilePage
  },
  {
    path: 'skills',
    component: SkillsPage
  },
  {
    path: 'about',
    component: AboutPage
  },
  {
    path: '**',
    component: NotFound
  }
];