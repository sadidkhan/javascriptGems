import { AbstractControl, ValidatorFn } from '@angular/forms';

export function pinValidator(): ValidatorFn {
    const restictedPins: string[] = [
        '0000', '1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999', '1234'
    ];
    return (control: AbstractControl): { [key: string]: boolean } | null => {

        const regex = /^[0-9]{4}$/;

        if (!regex.test(control.value)) {
            return {
                invalidPin: true
            };
        }

        if (control.value && control.value.length === 4) {
            if (restictedPins.find(data => data === control.value)) {
                return {
                    invalidPin: true
                };
            }
        }
    };
}
