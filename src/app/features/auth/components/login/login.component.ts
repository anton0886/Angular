import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '@core/services/auth/auth.service';
import { passwordValidator } from './form/custom-validation/password';
import { EmailComponent } from './form/email/email.component';
import { PasswordComponent } from './form/password/password.component';
import { CheckboxComponent } from './form/checkbox/checkbox.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FormsModule,
    EmailComponent,
    ReactiveFormsModule,
    PasswordComponent,
    CheckboxComponent,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly destroy$ = new Subject<void>();

  public emailControl!: FormControl<string | null>;
  public passwordControl!: FormControl<string | null>;
  public checkboxControl!: FormControl<boolean | null>;

  private stateEmail?: string;
  private statePassword?: string;
  private stateCheckbox?: boolean;

  ngOnInit(): void {
    this.findDataInLocalStorage();

    this.emailControl = new FormControl<string | null>(this.stateEmail ?? null, [
      Validators.required,
      Validators.email,
    ]);
    this.passwordControl = new FormControl<string | null>(this.statePassword ?? null, [
      Validators.required,
      Validators.minLength(6),
      passwordValidator,
    ]);
    this.checkboxControl = new FormControl<boolean | null>(this.stateCheckbox ?? null);

    this.emailControl.statusChanges.pipe(takeUntil(this.destroy$)).subscribe((status) => {
      if (status === 'VALID') {
        this.stateEmail = this.emailControl.value ?? undefined;
      }
    });

    this.passwordControl.statusChanges.pipe(takeUntil(this.destroy$)).subscribe((status) => {
      if (status === 'VALID') {
        this.statePassword = this.passwordControl.value ?? undefined;
      }
    });

    this.checkboxControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.stateCheckbox = value ?? undefined;
    });
  }

  private findDataInLocalStorage(): void {
    const emailQuery = localStorage.getItem('email')!;
    const passwordQuery = localStorage.getItem('password')!;
    const checkboxQuery = localStorage.getItem('remember')!;

    if (emailQuery === null && passwordQuery === null) {
      this.stateEmail = '';
      this.statePassword = '';
      this.stateCheckbox = false;
    } else {
      this.stateEmail = atob(JSON.parse(emailQuery));
      this.statePassword = atob(JSON.parse(passwordQuery));
      this.stateCheckbox = JSON.parse(checkboxQuery);
    }
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    if (this.stateEmail && this.statePassword) {
      this.authService.logIn(this.stateEmail, this.statePassword);
      console.log(`Email - ${this.stateEmail}, password - ${this.statePassword}`);
      localStorage.setItem('email', JSON.stringify(btoa(this.stateEmail)));
      localStorage.setItem('password', JSON.stringify(btoa(this.statePassword)));
      localStorage.setItem('remember', JSON.stringify(this.stateCheckbox));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
