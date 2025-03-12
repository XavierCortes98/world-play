import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function teamsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!(control instanceof FormArray)) {
      return null;
    }
    const filledTeams = control.controls.filter((c) => {
      const teamGroup = c as FormGroup;
      const teamName = teamGroup.get('name')?.value;
      return teamName && teamName.trim() !== '';
    });
    return filledTeams.length < 2 ? { notEnoughTeams: true } : null;
  };
}
