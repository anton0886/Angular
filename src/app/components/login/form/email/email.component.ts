import { ChangeDetectionStrategy, Component, forwardRef, input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailComponent implements OnInit, ControlValueAccessor {
  private _email = '';

  objectForControlsEmail = input.required<FormControl<string | null>>();

  actionChange = (_value: string) => {};
  actionTouch = (_value: string) => {};

  constructor() {}
  ngOnInit(): void {}
  writeValue(str: string): void {
    this._email = str;
  }
  registerOnChange(fn: any): void {
    this.actionChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.actionTouch = fn;
  }

  get value(): string {
    return this._email;
  }

  set value(value: string) {
    this._email = value;
    this.actionChange(value);
    this.actionTouch(value);
  }

  get _objectForControlsEmail() {
    return this.objectForControlsEmail;
  }

  public eventStarted(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
  }
}
