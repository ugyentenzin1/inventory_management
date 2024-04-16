import {FormArray, FormControl, FormGroup} from '@angular/forms';

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Form {
  // eslint-disable-next-line max-lines-per-function
  export function markAllFormFieldsAsTouched(formGroup: FormGroup): void {
    formGroup.markAsTouched({onlySelf: true});
    Object.keys(formGroup.controls || {})?.forEach(field => {
      // eslint-disable-next-line @typescript-eslint/typedef
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
        control.markAsDirty({onlySelf: true});
        control.updateValueAndValidity({onlySelf: true, emitEvent: true});
      } else if (control instanceof FormGroup) {
        control.markAsTouched({onlySelf: true});
        markAllFormFieldsAsTouched(control);
      } else if (control instanceof FormArray) {
        control.markAsTouched({onlySelf: true});
        for (const ctrl of control.controls) {
          if (ctrl instanceof FormGroup) {
            markAllFormFieldsAsTouched(ctrl);
          } else if (ctrl instanceof FormControl) {
            ctrl.markAsTouched({onlySelf: true});
            ctrl.updateValueAndValidity({onlySelf: true, emitEvent: true});
          }
        }
      }
    });
  }

  export function checkForUntouchedFields(formGroup: FormGroup): void {
    resetErrorNull(formGroup);
    Object.keys(formGroup.controls || {})?.forEach(field => {
      // eslint-disable-next-line @typescript-eslint/typedef
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        resetErrorNull(control);
      } else if (control instanceof FormGroup) {
        resetErrorNull(control);
        checkForUntouchedFields(control);
      } else if (control instanceof FormArray) {
        resetErrorNull(control);
        for (const ctrl of control.controls) {
          if (ctrl instanceof FormGroup) {
            checkForUntouchedFields(ctrl);
          } else if (ctrl instanceof FormControl) {
            resetErrorNull(ctrl);
          }
        }
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function resetErrorNull(control: any): void {
    control.setErrors(null);
    control.updateValueAndValidity({onlySelf: true, emitEvent: true});
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function focusOnErrorElement(errorElement = 'error'): void {
    // eslint-disable-next-line @typescript-eslint/typedef,@typescript-eslint/no-explicit-any
    const firstError = document.querySelectorAll(errorElement) as any;
    if (firstError.length > 0) {
      if (firstError[0].scrollIntoViewIfNeeded) {
        firstError[0].scrollIntoViewIfNeeded();
      } else {
        firstError[0].focus();
      }
    }
  }
}

export {Form as FormUtil};
