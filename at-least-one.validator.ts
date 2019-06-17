import {
    FormGroup,
    ValidationErrors,
    ValidatorFn,
  } from '@angular/forms';

  export const atLeastOne = (validator: ValidatorFn) => (group: FormGroup): ValidationErrors | null => {
    const hasAtLeastOne = group && group.controls && Object.keys(group.controls)
      .some(k => group.controls[k].value === true);

    return hasAtLeastOne ? null : {
      atLeastOne: true,
    };
  };
