import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrationResolverOutput } from '../core/resolvers/registration.resolver';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import {
  FieldValidation,
  RegistrationFormConfig,
} from '../core/models/registration';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  readonly registrationResolverOutput: RegistrationResolverOutput =
    this.route.snapshot.data['registrationResolverOutput'];
  registrationForm: FormGroup = this.buildRegistrationForm(
    this.registrationResolverOutput.registrationFieldList,
  );

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

  private buildRegistrationForm(config: RegistrationFormConfig): FormGroup {
    return this.fb.group(
      config.reduce((form, field) => {
        form[field.name] = this.fb.control(
          null,
          this.createFieldValidators(field.validations),
        );

        return form;
      }, {} as Record<string, AbstractControl>),
    );
  }

  private createFieldValidators(
    fieldValidations: FieldValidation[] | undefined,
  ): ValidatorFn[] {
    if (!fieldValidations) {
      return [];
    }

    return fieldValidations.map((fieldValidation) =>
      this.createFieldValidator(fieldValidation),
    );
  }

  private createFieldValidator(fieldValidation: FieldValidation): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null || control.value.length === 0) {
        return null; // don't validate empty values to allow optional controls
      }

      console.log(control.value);
      switch (fieldValidation.name) {
        case 'regex':
          return new RegExp(fieldValidation.value as string).test(control.value)
            ? null
            : { regex: fieldValidation.message };
        default:
          return null;
      }
    };
  }

  submit() {
    if (this.registrationForm.invalid) {
      return;
    }
  }
}
