import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule } from '@angular/forms';
import { TalkService } from './services/talk.service'
import { HttpClientModule } from '@angular/common/http';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { SmoothScrollToDirective, SmoothScrollDirective } from "ng2SmoothScroll";
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    // SmoothScrollToDirective,
    // SmoothScrollDirective

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [ TalkService,  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
