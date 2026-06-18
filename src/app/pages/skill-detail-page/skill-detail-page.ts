
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Skill } from '../../models/skill.model';
import { SkillService } from '../../services/skill';
import { Component, OnInit, inject ,signal} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-skill-detail-page',
  imports: [RouterLink],
  templateUrl: './skill-detail-page.html',
  styleUrl: './skill-detail-page.css',
})
export class SkillDetailPage  implements OnInit  {

  private route = inject(ActivatedRoute);
  private skillService = inject(SkillService);

  skill = signal<Skill | null>(null);
  isLoading = signal(false);
  errorMessage = signal('');

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const skillId = Number(params.get('id'));

      if (!skillId) {
        this.errorMessage.set('Invalid skill id.');
        return;
      }

      this.loadSkillFromBackend(skillId);
    });
  }

  loadSkillFromBackend(skillId: number) {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.skillService.getSkillById(skillId).subscribe({
      next: skill => {
        this.skill.set(skill);
        this.isLoading.set(false);
      },
      error: error => {
        this.handleError(error);
      }
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Skill detail API failed', error);

    if (error.status === 0) {
      this.errorMessage.set('Backend is not reachable. Please check if Spring Boot is running.');
    } else if (error.status === 404) {
      this.errorMessage.set('Skill not found in database.');
    } else {
      this.errorMessage.set(error.error?.message || 'Unable to load skill details.');
    }

    this.skill.set(null);
    this.isLoading.set(false);
  }

}