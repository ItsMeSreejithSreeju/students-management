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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.studentService.getStudent(+id).subscribe(
        (student) => {
          if (student) {
            this.student = student;
          } else {
            // Handle case where student is not found
            this.router.navigate(['/students']);
          }
        },
        (error) => {
          console.error('Error fetching student data', error);
          this.router.navigate(['/students']);
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/students']);
  }
}
