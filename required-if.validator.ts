import { AbstractControl, ValidatorFn } from '@angular/forms';

export function requiredIfValidator(requiredFieldName: string, requiredValue: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
        const thisFieldValue = control.value;
        const requiredField = control.root.get(requiredFieldName);

        if (requiredField && requiredField.value === requiredValue && !thisFieldValue) {
            return {
                requiredIf: requiredFieldName
            };
        }

        return null;
    };
}
