import {AbstractControl, FormGroup} from '@angular/forms';
import {debounceTime, startWith} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ReactiveFormSchema} from '../model/formschema.model';
import { ReactiveFormUtil } from '../form-utils/form.utils';
import { FormUtil } from '../misc/form';

@UntilDestroy()
export abstract class FormBaseComponent {
  form!: FormGroup;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any;

  configureForm(formSchema: ReactiveFormSchema): void {
    this.form = ReactiveFormUtil.buildForm(Object.keys(formSchema.formModel || {})?.length ?
      formSchema.formModel : new formSchema.formModel(), formSchema);
    formSchema?.valueChanges && Object.keys(formSchema.valueChanges)?.forEach(key => {
      this.form.get(key)?.valueChanges.pipe(
        startWith(this.form.get(key)?.value as boolean),
        debounceTime(400), untilDestroyed(this)).subscribe(() =>
        ReactiveFormUtil.evaluationValueChange(formSchema, key, this.form, this.state));
    });
  }

  formBuilder(formSchema: ReactiveFormSchema): FormGroup {
    return ReactiveFormUtil.buildForm(new formSchema.formModel(), formSchema);
  }

  props(key: string): AbstractControl | null {
    return this.form.get(key);
  }

  validate(): boolean {
    this.form.invalid && this.form.markAllAsTouched();
    this.form.invalid && setTimeout(() => FormUtil.focusOnErrorElement('.p-error'), 400);
    return this.form.valid;
  }

}
