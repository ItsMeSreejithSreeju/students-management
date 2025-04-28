import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;
  isEditMode = false;
  courses = ['Math', 'Science', 'History'];
  grades = ['A', 'B', 'C', 'D', 'F'];
  studentId: number | undefined;
  students: Student[] = [];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      course: ['', Validators.required],
      grade: ['', Validators.required]
    });

    this.loadStudents();

    const studentId = this.route.snapshot.paramMap.get('id');
    if (studentId) {
      this.isEditMode = true;
      this.studentId = +studentId;
    }
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.students = students;

        if (this.isEditMode && this.studentId !== undefined) {
          const student = this.students.find(s => s.id === this.studentId);
          if (student) {
            this.studentForm.patchValue({
              name: student.name,
              email: student.email,
              course: student.course,
              grade: student.grade
            });
          } else {
            console.error('Student not found');
            this.router.navigate(['/students']);
          }
        }
      },
      error: (err) => {
        console.error('Error loading students', err);
        this.router.navigate(['/students']);
      }
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const formValues = this.studentForm.value;

      if (this.isEditMode && this.studentId !== undefined) {
        // Update existing student
        const index = this.students.findIndex(s => s.id === this.studentId);
        if (index !== -1) {
          this.students[index] = { id: this.studentId, ...formValues };
        }
      } else {
        // Add new student
        const newId = this.students.length ? Math.max(...this.students.map(s => s.id)) + 1 : 1;
        const newStudent: Student = { id: newId, ...formValues };
        this.students.push(newStudent);
      }

      // Save the updated students array
      this.studentService.saveStudents(this.students).subscribe({
        next: () => {
          this.router.navigate(['/students']);
        },
        error: (err) => console.error('Error saving students', err),
      });
    }
  }
}
