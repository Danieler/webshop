import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ChartsModule } from 'ng2-charts';
import { LinearchartComponent } from './linearchart/linearchart.component';
import { CouponsService } from './coupons.service';
import {HttpClientModule} from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    LinearchartComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [CouponsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
