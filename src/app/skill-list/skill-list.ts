import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Skill {
  id: number;
  name: string;
  category: string;
  level: string;
}

@Component({
  selector: 'app-skill-list',
  imports: [FormsModule],
  templateUrl: './skill-list.html',
  styleUrl: './skill-list.css',
})
export class SkillList {
  showSkills = true;

  newSkillName = '';
  newSkillCategory = 'Frontend';
  newSkillLevel = 'Beginner';


  skills: Skill[] = [
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

  toggleSkills() {
    this.showSkills = !this.showSkills;
  }

    addSkill() {
    if (this.newSkillName.trim() === '') {
      return;
    }

    const newSkill: Skill = {
      id: Date.now(),
      name: this.newSkillName.trim(),
      category: this.newSkillCategory,
      level: this.newSkillLevel
    };

    this.skills.push(newSkill);

    this.newSkillName = '';
    this.newSkillCategory = 'Frontend';
    this.newSkillLevel = 'Beginner';
  }
  

  removeLastSkill() {
    this.skills.pop();
  }

  clearSkills() {
    this.skills = [];
  }
}
