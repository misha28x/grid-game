import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ButtonComponent } from "./ui/button/button.component";
import { IconComponent } from "./ui/icon/icon.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ButtonComponent, IconComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
