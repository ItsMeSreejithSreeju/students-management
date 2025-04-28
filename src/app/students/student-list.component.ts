import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  newStudent: Student = { id: 0, name: '', email: '', course: '', grade: '' };
  isEditMode = false;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getStudents();
  }

  // Fetch all students
  getStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (err) => console.error('Error fetching students', err),
    });
  }

  // Add or Update student
  saveStudent(): void {
    if (this.isEditMode) {
      // Edit Mode: Find the student and update locally
      const index = this.students.findIndex(s => s.id === this.newStudent.id);
      if (index !== -1) {
        this.students[index] = { ...this.newStudent };
      }

      // Now save the updated list to API
      this.studentService.saveStudents(this.students).subscribe({
        next: () => {
          this.getStudents();
          this.resetForm();
        },
        error: (err) => console.error('Error updating student', err),
      });

    } else {
      // Add new student
      const newId = this.students.length ? Math.max(...this.students.map(s => s.id)) + 1 : 1;
      this.newStudent.id = newId;
      this.students.push(this.newStudent);

      this.studentService.saveStudents(this.students).subscribe({
        next: () => {
          this.getStudents();
          this.resetForm();
        },
        error: (err) => console.error('Error adding student', err),
      });
    }
  }

  // Edit student
  editStudent(student: Student): void {
    this.newStudent = { ...student };
    this.isEditMode = true;
  }

  // Delete student
  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.students = this.students.filter(student => student.id !== id);

      this.studentService.saveStudents(this.students).subscribe({
        next: () => this.getStudents(),
        error: (err) => console.error('Error deleting student', err),
      });
    }
  }

  // Reset form
  resetForm(): void {
    this.newStudent = { id: 0, name: '', email: '', course: '', grade: '' };
    this.isEditMode = false;
  }
}
