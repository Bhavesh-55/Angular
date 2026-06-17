import { Injectable } from '@angular/core';
import { Skill } from '../models/skill.model';


// providedIn: 'root' = application-level singleton service
@Injectable({
  providedIn: 'root',
})

export class SkillService  {
  
  private skills: Skill[] = [
    {
      id: 1,
      name: 'Java',
      category: 'Backend',
      level: 'Advanced'
    },
    {
      id: 2,
      name: 'Spring Boot',
      category: 'Backend',
      level: 'Advanced'
    },
    {
      id: 3,
      name: 'Microservices',
      category: 'Backend',
      level: 'Intermediate'
    },
    {
      id: 4,
      name: 'AWS',
      category: 'Cloud',
      level: 'Intermediate'
    },
    {
      id: 5,
      name: 'Angular',
      category: 'Frontend',
      level: 'Beginner'
    }
  ];

  getSkills(): Skill[] {
    return this.skills;
  }

  addSkill(name: string, category: string, level: string): void {
    const newSkill: Skill = {
      id: Date.now(),
      name: name.trim(),
      category: category,
      level: level
    };

    this.skills.push(newSkill);
  }

  removeLastSkill(): void {
    this.skills.pop();
  }

  clearSkills(): void {
    this.skills.splice(0, this.skills.length);
  }

  removeSkillById(skillId: number): void {
    const index = this.skills.findIndex(skill => skill.id === skillId);

    if (index !== -1) {
      this.skills.splice(index, 1);
    }
  }
}
