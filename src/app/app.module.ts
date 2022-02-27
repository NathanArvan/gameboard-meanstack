import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './components/grid/grid.component';
import { UploadComponent } from './components/upload/upload.component';
import { CreateEditComponent } from './components/grid/create-edit/create-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TokenComponent } from './components/token/token.component'; 

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    UploadComponent,
    CreateEditComponent,
    TokenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
