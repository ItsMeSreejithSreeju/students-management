import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';  // Update with the correct import path
import { StudentListComponent } from './students/student-list.component';  // Update with the correct path
import { StudentDetailsComponent } from './students/student-details.component';  // Update with the correct path

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Default route to login
  { path: 'login', component: LoginComponent },
  { path: 'students', component: StudentListComponent },  // Ensure StudentListComponent is defined
  { path: 'students/:id', component: StudentDetailsComponent },  // Add a route for student details
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Use forRoot to configure root routes
  exports: [RouterModule]
})
export class AppRoutingModule {}
