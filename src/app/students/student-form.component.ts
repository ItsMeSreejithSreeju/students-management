import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';  // Update if necessary
import { Student } from '../models/student.model';  // Update if necessary

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;  // Declare the FormGroup
  isEditMode = false;  // Flag to track edit mode
  courses = ['Math', 'Science', 'History'];  // Example course options
  grades = ['A', 'B', 'C', 'D', 'F'];  // Example grade options
  studentId: number | undefined;  // For tracking the student ID when editing

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

    // If editing an existing student
    const studentId = this.route.snapshot.paramMap.get('id');
    if (studentId) {
      this.isEditMode = true;
      this.studentId = +studentId;
      this.loadStudentData(this.studentId);
    }
  }

  loadStudentData(id: number): void {
    this.studentService.getStudent(id).subscribe((student: Student | undefined) => {
      if (student) { // Check if student is defined
        this.studentForm.patchValue({
          name: student.name,
          email: student.email,
          course: student.course,
          grade: student.grade
        });
      } else {
        // Handle the case where student is undefined, e.g., navigate away or show an error
        console.error('Student not found');
        this.router.navigate(['/students']);
      }
    });
  }
  

  onSubmit(): void {
    if (this.studentForm.valid) {
      const formValues = this.studentForm.value;
      if (this.isEditMode) {
        // Call the update service method
        this.studentService.updateStudent(this.studentId!, formValues).subscribe(() => {
          this.router.navigate(['/students']);
        });
      } else {
        // Call the add student service method
        this.studentService.addStudent(formValues).subscribe(() => {
          this.router.navigate(['/students']);
        });
      }
    }
  }
}
