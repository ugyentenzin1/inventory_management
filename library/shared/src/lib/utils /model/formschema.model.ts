import {ValidationErrors, ValidatorFn} from '@angular/forms';

export interface ReactiveFormSchema {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formModel: any;
  skipRequiredValidators?: string[];
  customValidators?: { [key: string]: (ValidatorFn | ValidationErrors)[] };
  optionalValidators?: { [key: string]: (ValidatorFn | ValidationErrors)[] };
  valueChanges?: {
    [key: string]: AffectedControl[];
  }
}

export interface AffectedControl {
  affectedControlKeys: string[];
  patchControlValue?: { [key: string]: string };
  disableKeys?: string[];
  expression?: string;
  clearValue?: boolean;
  clearValidators?: boolean;
}
