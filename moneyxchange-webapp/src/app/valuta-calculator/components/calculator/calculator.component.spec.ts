import { FormBuilder } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';

import { CalculatorComponent } from './calculator.component';
import { NotificationService } from '../../../shared/services/notification';
import { LoaderService } from '../../../shared/services/loader';
import { CalculatorService } from '../../services/calculator';
import { Valuta } from '../../../shared/models';
import { CurrencyMaskService } from '../../../shared/services/mask';

class CalculatorServiceMock extends CalculatorService {
  constructor() {
    super(null);
  }

  calculateValue(source: Valuta, target: Valuta, value: number): Observable<number> {
    return value !== null ? of(value * 2) : throwError('Source value required');
  }
}

describe('CalculatorComponent', () => {
  let calculatorComponent: CalculatorComponent;
  let maskService: CurrencyMaskService;
  let service: CalculatorService;
  let formBuilder: FormBuilder;
  let notificationService: NotificationService;
  let loader: LoaderService;

  beforeEach(() => {
    service = new CalculatorServiceMock();
    maskService = new CurrencyMaskService();
    formBuilder = new FormBuilder();
    notificationService = new NotificationService();
    loader = new LoaderService();
    calculatorComponent = new CalculatorComponent(service, maskService, formBuilder, notificationService, loader);
  });

  it('should create new form when component is initialized', () => {
    calculatorComponent.ngOnInit();

    expect(calculatorComponent.form).toBeDefined();
    expect(calculatorComponent.form.get('source')).toBeDefined();
    expect(calculatorComponent.form.get('target')).toBeDefined();
  });

  it('should request target value calculation and update form when form is submitted', () => {
    calculatorComponent.ngOnInit();
    calculatorComponent.sourceField.setValue('$100');

    calculatorComponent.updateTargetValue();

    const calculatedValue: number = calculatorComponent.targetField.value;

    expect(calculatedValue).toBe(200);
  });
});
