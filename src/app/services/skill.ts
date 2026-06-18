import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Skill,SkillFilter } from '../models/skill.model';


@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8091/api/skills';

  getSkills(filter?: SkillFilter): Observable<Skill[]> {
    let params = new HttpParams();

    if (filter?.category) {
      params = params.set('category', filter.category);
    }

    if (filter?.level) {
      params = params.set('level', filter.level);
    }

    if (filter?.search?.trim()) {
      params = params.set('search', filter.search.trim());
    }

    return this.http.get<Skill[]>(this.apiUrl, { params });
  }

  getSkillById(skillId: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.apiUrl}/${skillId}`);
  }
}