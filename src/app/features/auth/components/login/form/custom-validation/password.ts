import { AbstractControl } from '@angular/forms';

export function passwordValidator(formControl: AbstractControl) {
  const password: string = formControl.value;

  const small_letters = 'qwertyuiopasdfghjklzxcvbnm';
  const big_letters = 'QWERTYUIOPLKJHGFDSAZXCVBNM';
  const digits = '0123456789';
  const specials = '!@#$%^&*()_-+=\\|/.,:;[]{}';
  let is_small = false;
  let is_big = false;
  let is_digits = false;
  let is_specials = false;
  let rating = 0;

  [...password].forEach((element) => {
    if (!is_small && small_letters.indexOf(element) != -1) is_small = true;
    else if (!is_big && big_letters.indexOf(element) != -1) is_big = true;
    else if (!is_digits && digits.indexOf(element) != -1) is_digits = true;
    else if (!is_specials && specials.indexOf(element) != -1) is_specials = true;
  });

  if (is_small) rating++;
  if (is_big) rating++;
  if (is_digits) rating++;
  if (is_specials) rating++;

  if (password.length === 0) {
    return {
      myValidator: { message: '' },
    };
  } else if (password.length < 6 && rating < 3) {
    return {
      myValidator: { message: 'Simple password' },
    };
  } else if (password.length < 6 && rating >= 3) {
    return {
      myValidator: { message: 'Average password' },
    };
  } else if (password.length >= 8 && rating < 3) {
    return {
      myValidator: { message: 'Average password' },
    };
  } else if (password.length >= 8 && rating >= 3) {
    return {
      myValidator: { message: 'Complex password' },
    };
  } else if (password.length >= 6 && rating === 1) {
    return {
      myValidator: { message: 'Simple password' },
    };
  } else if (password.length >= 6 && rating > 1 && rating < 4) {
    return {
      myValidator: { message: 'Average password' },
    };
  } else if (password.length >= 6 && rating === 4) {
    return {
      myValidator: { message: 'Complex password' },
    };
  } else {
    return null;
  }
}
