import { Component, OnInit, inject ,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Skill } from '../models/skill.model';
import { SkillService } from '../services/skill';
import { SkillCard } from '../skill-card/skill-card';


@Component({
  selector: 'app-skill-list',
  imports: [FormsModule, SkillCard],
  templateUrl: './skill-list.html',
  styleUrl: './skill-list.css'
})
export class SkillList implements OnInit {
  private skillService = inject(SkillService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  skills = signal<Skill[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');

  selectedCategory = '';
  selectedLevel = '';
  searchText = '';

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.selectedCategory = params.get('category') || '';
      this.selectedLevel = params.get('level') || '';
      this.searchText = params.get('search') || '';

      this.loadSkillsFromBackend();
    });
  }

  loadSkillsFromBackend() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.skillService.getSkills({
      category: this.selectedCategory,
      level: this.selectedLevel,
      search: this.searchText
    }).subscribe({
      next: skills => {
        console.log('Backend response:', skills);

        this.skills.set(skills);
        this.isLoading.set(false);
      },
      error: error => {
        this.handleError(error);
        this.isLoading.set(false);
      }
    });
  }

  applyFilter() {
    this.router.navigate(['/skills'], {
      queryParams: {
        category: this.selectedCategory || null,
        level: this.selectedLevel || null,
        search: this.searchText.trim() || null
      }
    });
  }

  clearFilters() {
    this.selectedCategory = '';
    this.selectedLevel = '';
    this.searchText = '';

    this.router.navigate(['/skills']);
  }

  refreshSkills() {
    this.loadSkillsFromBackend();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.errorMessage.set('Backend is not reachable. Please check if Spring Boot is running.');
    } else if (error.status === 500) {
      this.errorMessage.set('Backend server error. Please check Spring Boot logs.');
    } else {
      this.errorMessage.set(error.error?.message || 'Unable to load skills from backend.');
    }

    this.skills.set([]);
  }

}