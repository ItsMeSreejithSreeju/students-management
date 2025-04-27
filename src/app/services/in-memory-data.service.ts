import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const students: Student[] = [
      { id:1, name: 'John Doe', email: 'john@example.com', course: 'Computer Science', grade: 'A' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', course: 'Math', grade: 'B+' }
    ];
    return { students };
  }
}
