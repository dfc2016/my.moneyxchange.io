import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoaderService } from '../../services/loader';

@Component({
  selector: 'mxc-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  visible: boolean = false;
  
  constructor(private service: LoaderService) { }

  ngOnInit() {
    this.subscription = this.service.notifier.subscribe(visible => this.visible = visible);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
