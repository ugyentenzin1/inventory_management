/* eslint-disable @typescript-eslint/ban-ts-comment */
import {AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {get, isArray, isNumber, isObject} from 'lodash-es';
import {FormDataPrefix} from '../enum/formprefix.enum';
import {ConditionalEvaluator} from '../misc/conditionalevalators';
import {AffectedControl, ReactiveFormSchema} from '../model/formschema.model';
import {CONDITION_FNS} from '../misc/form.constant';

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace FormUtil {
  export function buildForm(formData: any, formConfig: ReactiveFormSchema, group: AbstractControl = new FormGroup({}), parentKey = ''): FormGroup {
    Object.keys(formData || {})?.forEach(key => {
      const applicableKey: string = parentKey ? (parentKey + '.' + key) : key;
      if (isArray(formData[key]) || isObject(formData[key])) {
        if (isArray(formData) && isNumber(+key)) {
          (group as FormArray).push(new FormGroup({}));
        } else { // @ts-ignore
          group['controls'][key] = isArray(formData[key]) ? new FormArray([]) : new FormGroup({});
          // @ts-ignore
          (group['controls'][key] as FormArray | FormGroup).setParent(group as (FormArray | FormGroup));
        } // @ts-ignore
        buildForm(formData[key], formConfig, group['controls'][key], applicableKey);
      } else { // @ts-ignore
        isArray(formData) ? (group as FormArray).push(new FormControl(formData[key], composeValidators(formConfig, applicableKey))) :
          (group as FormGroup).addControl(key, new FormControl(formData[key], composeValidators(formConfig, applicableKey)));
      }
    });
    (group as FormGroup).updateValueAndValidity();
    return group as FormGroup;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any,max-len,max-lines-per-function
  export function evaluationValueChange(formSchema: ReactiveFormSchema, valueChangeKey: string, form?: AbstractControl, state?: any): void {
    // @ts-ignore
    formSchema.valueChanges[valueChangeKey].forEach(config => {
      const result: boolean = evaluationExpressions(config, form, state);
      config.affectedControlKeys.forEach((controlKey, index) => { // @ts-ignore
        !result && form.get(controlKey).setValue(undefined);
        // @ts-ignore
        result && !!get(config.patchControlValue, controlKey) && form.get(controlKey).setValue(getPatchingValue(config.patchControlValue[controlKey], form, state));
        // @ts-ignore
        index === 0 && config?.disableKeys?.forEach(key => form.get(key)[result ? 'disable' : 'enable']());
        // @ts-ignore
        (config.clearValidators ?? true) && form.get(controlKey).clearValidators();
        // @ts-ignore
        form.get(controlKey).setValidators(result ? getValidationFns(formSchema, controlKey) : undefined);
        // @ts-ignore
        form.get(controlKey).updateValueAndValidity({emitEvent: false});
      });
    });
  }


// eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function getPatchingValue(key: string, form?: AbstractControl, state?: any): string | boolean | any[] | undefined {
    const value: string[] = key.split(':') || [];
    if (value[0] === FormDataPrefix.FORM_FIELD) { // @ts-expect-error
      return form.get(value[1]).value;
    } else if (value[0] === FormDataPrefix.STATE_DATA) {
      return get(state, value[1]);
    } else if (value[0] === FormDataPrefix.VALUE_ONLY) {
      return value[1];
    } else {
      return undefined;
    }
  }


// eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function evaluationExpressions(config: AffectedControl, form?: AbstractControl, state?: any): boolean {
    let result = false; // @ts-ignore
    const symbols: string[] = config.expression?.split(' ')?.filter(text => ['&&', '||']?.includes(text)) || []; // @ts-ignore
    const expressionResults: boolean[] = config.expression?.split(/\s+(?:|\|\||&&)\s+/)?.map(exp =>
      evaluateExpression(exp, form, state)) || [];
    for (let i = 0; i <= expressionResults.length - 1; i++) { // @ts-ignore
      result = i === 0 ? expressionResults[0] : ConditionalEvaluator[CONDITION_FNS[symbols[i - 1]]](result, expressionResults[i]);
    }
    return result;
  }

  export function evaluateExpression(expression: string, form?: AbstractControl, state?: any): boolean {
    const values: string[] = expression.split(' ') || []; // @ts-ignore
    return values.length === 3 ? ConditionalEvaluator[CONDITION_FNS[values[1]]](
      getValueBasedAnnotation(values[0], form, state), getValueBasedAnnotation(values[2], form, state)
    ) : getValueBasedAnnotation(values[0], form, state);
  }

  export function getValueBasedAnnotation(expression: string, form?: AbstractControl, state?: any): string {
    const value: string[] = expression.split(':') || [];
    if (value[0] === FormDataPrefix.FORM_FIELD) { // @ts-ignore
      return (form.get(value[1]).value ?? '').toString();
    } else if (value[0] === FormDataPrefix.FORM_FIELD_BOOLEAN) { // @ts-ignore
      return form.get(value[1]).value;
    } else if (value[0] === FormDataPrefix.STATE_DATA) {
      return get(state, value[1], '').toString();
    } else if (value[0] === FormDataPrefix.STATE_DATA_BOOLEAN) {
      return get(state, value[1]);
    } else {
      return value[1]?.toString();
    }
  }

  export function composeValidators(formConfig: ReactiveFormSchema, key: string): ValidatorFn[] {
    return getValidationFns(formConfig, key);
  }

  export function getValidationFns(formConfig: ReactiveFormSchema, key: string): ValidatorFn[] {
    let validatorFns: ValidatorFn[] = [];
    [key].forEach(partedKey => { // eslint-disable-next-line max-len
      formConfig.skipRequiredValidators && !formConfig.skipRequiredValidators.includes(partedKey) && validatorFns.push(Validators.required);
      // @ts-ignore
      get(formConfig?.customValidators, partedKey) && (validatorFns = [...validatorFns, ...formConfig.customValidators[key]]);
      // @ts-ignore
      get(formConfig?.optionalValidators, partedKey) && (validatorFns = [...validatorFns, ...formConfig.optionalValidators[key]]);
    });
    return validatorFns;
  }
}

export {FormUtil as ReactiveFormUtil}