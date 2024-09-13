import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TypingSpeedComponent } from './typing-speed/typing-speed.component';
import {TabViewModule} from "primeng/tabview";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    TypingSpeedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabViewModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
