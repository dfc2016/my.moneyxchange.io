import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialLinksComponent } from './components/social-links';
import { NotificationComponent } from './components/notification';
import { LoaderComponent } from './components/loader';
import { AvoidSubmitOnEnterDirective } from './directives/avoid-submit-on-enter';
import { StorageService, LocalStorageService } from './services/storage';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SocialLinksComponent,
    NotificationComponent,
    LoaderComponent,
    AvoidSubmitOnEnterDirective
  ],
  exports: [
    SocialLinksComponent,
    NotificationComponent,
    LoaderComponent,
    AvoidSubmitOnEnterDirective
  ],
  providers: [
    { provide: StorageService, useClass: LocalStorageService }
  ]
})
export class SharedModule { }
