import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.studentService.getStudents().subscribe((data: Student[]) => {
      this.students = data;
    });
  }

  editStudent(id: number): void {
    this.router.navigate(['/students/edit', id]);
  }

  viewStudent(id: number): void {
    this.router.navigate(['/students', id]);
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete?')) {
      this.studentService.deleteStudent(id).subscribe(() => {
        this.fetchStudents();  // Refresh the list after delete
      });
    }
  }
}
