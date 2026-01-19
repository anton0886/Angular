import { ChangeDetectionStrategy, Component, forwardRef, input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneComponent implements OnInit, ControlValueAccessor {
  private _phone = '';

  objectForControlsPhone = input.required<FormControl<string | null>>();

  ngOnInit(): void {}

  actionChange = (_value: string) => {};
  actionTouch = (_value: string) => {};

  writeValue(str: string): void {
    this._phone = str;
  }
  registerOnChange(fn: any): void {
    this.actionChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.actionTouch = fn;
  }

  get value(): string {
    return this._phone;
  }

  set value(value: string) {
    this._phone = value;
    this.actionChange(value);
    this.actionTouch(value);
  }

  get _objectForControlsPhone() {
    return this.objectForControlsPhone();
  }

  public eventStarted(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
  }
}
