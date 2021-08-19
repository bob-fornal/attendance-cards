
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { QrCodeModule } from 'ng-qrcode';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AdminComponent } from './pages/admin/admin.component';
import { StudentComponent } from './pages/student/student.component';

import { QrCodeComponent } from './features/qr-code/qr-code.component';
import { StudentListComponent } from './features/student-list/student-list.component';

import { BroadcastService } from '@core/services/broadcast-channel.service';

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
    QrCodeModule
  ],
  providers: [
    BroadcastService,
    Title
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
