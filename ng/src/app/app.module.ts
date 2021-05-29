import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AddHostInterceptor } from './add-host.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RootComponent } from './root/root.component';
import { NgbButtonsModule, NgbModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { EventComponent } from './event/event.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './components/select/select.component';
import { InfiniteLoadingComponent } from './components/infinite-loading/infinite-loading.component';
import { EventosComponent } from './eventos/eventos.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RootComponent,
    EventComponent,
    InputComponent,
    SelectComponent,
    InfiniteLoadingComponent,
    EventosComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,    
    NgbButtonsModule,
    NgbTimepickerModule,
    FontAwesomeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddHostInterceptor, multi: true },
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
