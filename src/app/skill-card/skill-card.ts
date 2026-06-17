import { Component, input ,output } from '@angular/core';
import { Skill } from '../models/skill.model';

@Component({
  selector: 'app-skill-card',
  imports: [],
  templateUrl: './skill-card.html',
  styleUrl: './skill-card.css',
})
export class SkillCard {
  skill = input.required<Skill>();
  index = input.required<number>();
  removeSkill  = output<number>();

  // when user click on delete button then this function will be called and emit the index of skill to be removed
  onRemoveClick() {
    this.removeSkill.emit(this.skill().id);
  }


}
