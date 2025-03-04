import {
  AbstractControl,
  FormArray,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function teamsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control instanceof FormArray) {
      const filledTeams = control.controls.filter(
        (control) => control.value && control.value.trim() !== ''
      );
      return filledTeams.length < 2 ? { notEnoughTeams: true } : null;
    }
    return null;
  };
}
