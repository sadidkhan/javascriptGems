import { AbstractControl, ValidatorFn } from '@angular/forms';

export function equalValidator(path: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: string } | null => {
      const sourceValue = control.value;
      const destinationControl = control.root.get(path);

      if (destinationControl && sourceValue !== destinationControl.value) {
          return { 'equal': path };
      }

      return null;
  };
}
