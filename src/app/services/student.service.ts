import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../models/student.model';
import { Observable } from 'rxjs';
import { switchMap,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  addStudent(formValues: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://api.jsonbin.io/v3/qs/680e8c5d8960c979a58e7949'; // 👈 Your real bin ID here
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Master-Key': 'YOUR_SECRET_KEY' // 👈 Your JSONBin master key
  });

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<any>(this.apiUrl, { headers: this.headers })
      .pipe(map(res => res.record)); // Extract the "record" array
  }

  saveStudents(students: Student[]): Observable<any> {
    return this.http.put(this.apiUrl, { record: students }, { headers: this.headers });
  }

  updateStudent(p0: number, student: Student): Observable<any> {
    return this.getStudents().pipe(
      map(students => {
        const index = students.findIndex(s => s.id === student.id);
        if (index > -1) {
          students[index] = student;
        }
        return students;
      }),
      switchMap(updatedStudents => this.saveStudents(updatedStudents))
    );
  }
}
