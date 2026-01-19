import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormControl,
  Validators,
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '@core/services/auth/auth.service';
import { passwordValidator } from '../login/form/custom-validation/password';
import { TextComponent } from '../login/form/text/text.component';
import { EmailComponent } from '../login/form/email/email.component';
import { PasswordComponent } from '../login/form/password/password.component';
import { PhoneComponent } from '../login/form/phone/phone.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  imports: [
    FormsModule,
    TextComponent,
    ReactiveFormsModule,
    EmailComponent,
    PasswordComponent,
    PhoneComponent,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly destroy$ = new Subject<void>();

  public emailControl!: FormControl<string | null>;
  public passwordControl!: FormControl<string | null>;
  public confirmPasswordControl!: FormControl<string | null>;
  public nameControl!: FormControl<string | null>;
  public surnameControl!: FormControl<string | null>;
  public phoneControl!: FormControl<string | null>;

  private stateName = '';
  private stateSurname = '';
  private stateEmail = '';
  private statePassword = '';
  private statePhone = '';

  ngOnInit(): void {
    this.emailControl = new FormControl<string | null>(this.stateEmail, [
      Validators.required,
      Validators.email,
    ]);
    this.passwordControl = new FormControl<string | null>(this.statePassword, [
      Validators.required,
      Validators.minLength(6),
      passwordValidator,
    ]);
    this.confirmPasswordControl = new FormControl<string | null>(this.statePassword, [
      Validators.required,
      passwordValidator,
      this.validateAreEqual.bind(this),
    ]);
    this.nameControl = new FormControl<string | null>(this.stateName, [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.surnameControl = new FormControl<string | null>(this.stateSurname, [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.phoneControl = new FormControl<string | null>(this.statePhone, [
      Validators.required,
      Validators.pattern(/^\+380\d{3}\d{2}\d{2}\d{2}$/),
    ]);

    this.emailControl.statusChanges.pipe(takeUntil(this.destroy$)).subscribe((status) => {
      if (status === 'VALID') {
        this.stateEmail = this.emailControl.value ?? '';
      }
    });

    this.passwordControl.statusChanges.pipe(takeUntil(this.destroy$)).subscribe((status) => {
      if (status === 'VALID') {
        this.statePassword =
          (this.passwordControl.value ?? '') && (this.confirmPasswordControl.value ?? '');
      }
    });

    this.nameControl.statusChanges.pipe(takeUntil(this.destroy$)).subscribe((status) => {
      if (status === 'VALID') {
        this.stateName = this.nameControl.value ?? '';
      }
    });

    this.surnameControl.statusChanges.pipe(takeUntil(this.destroy$)).subscribe((status) => {
      if (status === 'VALID') {
        this.stateSurname = this.surnameControl.value ?? '';
      }
    });

    this.phoneControl.statusChanges.pipe(takeUntil(this.destroy$)).subscribe((status) => {
      if (status === 'VALID') {
        this.statePhone = this.phoneControl.value ?? '';
      }
    });
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    if (
      this.stateEmail &&
      this.statePassword &&
      this.stateName &&
      this.stateSurname &&
      this.statePhone
    ) {
      this.authService.registry({
        email: this.stateEmail,
        password: this.statePassword,
        name: this.stateName,
        surname: this.stateSurname,
        phone: this.statePhone,
      });
    } else {
      console.log('Something went wrong!');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private validateAreEqual(confirmPasswordControl: AbstractControl) {
    return this.passwordControl.value === confirmPasswordControl.value
      ? null
      : {
          NotEqual: true,
        };
  }
}
