import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student: Student | undefined;
  id: number | undefined;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.fetchStudent(this.id);
    }
  }

  fetchStudent(id: number): void {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.student = students.find(s => s.id === id);
        if (!this.student) {
          console.error('Student not found');
          this.router.navigate(['/students']);
        }
      },
      error: (err) => {
        console.error('Error fetching student list', err);
        this.router.navigate(['/students']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/students']);
  }
}
