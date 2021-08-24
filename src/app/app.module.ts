
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { QrCodeModule } from 'ng-qrcode';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { FileSaverModule } from 'ngx-filesaver';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AdminComponent } from './pages/admin/admin.component';
import { StudentComponent } from './pages/student/student.component';

import { QrCodeComponent } from './features/qr-code/qr-code.component';
import { StudentListComponent } from './features/student-list/student-list.component';

import { SocketService } from '@core/services/socket.service';

@NgModule({
  declarations: [
    AppComponent,

    AdminComponent,
    StudentComponent,
    QrCodeComponent,
    StudentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    FormsModule,
    QrCodeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FileSaverModule
  ],
  providers: [
    SocketService,
    Title
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
