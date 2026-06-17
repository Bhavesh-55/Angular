import { Component ,inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Skill } from '../models/skill.model';
import { SkillCard } from '../skill-card/skill-card';
import { SkillService } from '../services/skill';


@Component({
  selector: 'app-skill-list',
  imports: [FormsModule,SkillCard],
  templateUrl: './skill-list.html',
  styleUrl: './skill-list.css',
})
export class SkillList {
private skillService = inject(SkillService);

  showSkills = true;

  newSkillName = '';
  newSkillCategory = 'Frontend';
  newSkillLevel = 'Beginner';

  skills: Skill[] = this.skillService.getSkills();

  toggleSkills() {
    this.showSkills = !this.showSkills;
  }

  addSkill() {
    if (this.newSkillName.trim() === '') {
      return;
    }

    this.skillService.addSkill(
      this.newSkillName,
      this.newSkillCategory,
      this.newSkillLevel
    );

    this.newSkillName = '';
    this.newSkillCategory = 'Frontend';
    this.newSkillLevel = 'Beginner';
  }

  removeLastSkill() {
    this.skillService.removeLastSkill();
  }

  clearSkills() {
    this.skillService.clearSkills();
  }

  removeSkillById(skillId: number) {
    this.skillService.removeSkillById(skillId);
  }

}