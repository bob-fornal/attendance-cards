import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './pages/admin/admin.component';
import { StudentComponent } from './pages/student/student.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'student', component: StudentComponent },
  { path: '', pathMatch: 'full', redirectTo: '/admin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
