import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { Valuta, AVAILABLE_VALUTAS } from '../../../shared/models';
import { CalculatorService } from '../../services/calculator';
import { NotificationService } from '../../../shared/services/notification';
import { LoaderService } from '../../../shared/services/loader';
import { CurrencyMaskService } from '../../../shared/services/mask';

@Component({
  selector: 'mxc-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  form: FormGroup;
  sourceField: AbstractControl;
  targetField: AbstractControl;

  source: Valuta = AVAILABLE_VALUTAS.USD;
  target: Valuta = AVAILABLE_VALUTAS.EUR;
  sourceMask = this.maskService.createMask({ prefix: this.source.symbol });
  targetMask = this.maskService.createMask({ prefix: this.target.symbol });

  constructor(
    private service: CalculatorService,
    private maskService: CurrencyMaskService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.initFormFields();
    this.clearTargetWhenSourceChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  updateTargetValue(): void {
    if (this.form.valid) {
      this.loader.displayLoader();
      const subscription: Subscription = this.service
        .calculateValue(this.source, this.target, this.getSourceValue())
        .subscribe({
          next: this.handleSuccessResponse.bind(this),
          error: this.handleError.bind(this)
        });
      this.subscriptions.push(subscription);
    }
  }

  private initFormFields(): void {
    this.form = this.formBuilder.group({
      source: [null, [Validators.required, Validators.min(0)]],
      target: [{ value: null, disabled: true }]
    });
    this.sourceField = this.form.get('source');
    this.targetField = this.form.get('target');
  }

  private clearTargetWhenSourceChanges(): void {
    const subscription: Subscription = this.sourceField.valueChanges.subscribe(
      () => this.targetField.setValue('')
    );
    this.subscriptions.push(subscription);
  }

  private getSourceValue(): number {
    return this.maskService.unmask(this.sourceField.value);
  }

  private handleSuccessResponse(targetValue: number): void {
    this.updateTargetFieldValue(targetValue);
    this.loader.hideLoader();
  }

  private handleError(error: any): void {
    console.error(error);
    this.showErrorNotification();
    this.loader.hideLoader();
  }

  private updateTargetFieldValue(targetValue: number): void {
    this.targetField.setValue(targetValue);
  }

  private showErrorNotification(): void {
    this.notificationService.displayNotification({
      title: 'Try again later',
      message: 'Error while getting the rates'
    });
  }
}
