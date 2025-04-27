import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';  // Importing `of` for mock data (for simplicity in testing)
import { HttpClient } from '@angular/common/http'; // Importing HttpClient for real API requests
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private students: Student[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', course: 'Math', grade: 'A' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', course: 'Science', grade: 'B' },
    // Add more students as needed
  ];
  private apiUrl = 'https://yourapi.com/students';
  constructor(private http: HttpClient) {}

  // Get all students
  getStudents(): Observable<Student[]> {
    return of(this.students);  // For mock data, replace with actual API call if needed
  }

  // Get student by ID
  getStudent(id: number): Observable<Student | undefined> {
    const student = this.students.find((student) => student.id === id);
    return of(student);  // Mock API call, replace with actual HttpClient request
  }

  // Add a new student
  addStudent(student: Student): Observable<Student> {
    this.students.push(student);
    return of(student);  // Mock API call, replace with actual API request
  }

  // Update an existing student
  updateStudent(p0: number, student: Student): Observable<Student> {
    const index = this.students.findIndex((s) => s.id === student.id);
    if (index > -1) {
      this.students[index] = student;
    }
    return of(student);  // Mock API call
  }

  // Delete a student by ID
  deleteStudent(id: number): Observable<void> {
    this.students = this.students.filter((student) => student.id !== id);
    return of();  // Mock API call
  }
}
