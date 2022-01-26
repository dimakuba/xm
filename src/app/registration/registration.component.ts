import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  RegistrationField,
  RegistrationFormConfig,
} from '../core/models/registration';
import { RegistrationApiService } from '../core/services/registration-api.service';
import { ErrorHandler } from '../core/services/error-handler.service';
import { UserService } from '../core/services/user.service';

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
  showHiddenPassword = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private registrationApiService: RegistrationApiService,
    private errorHandler: ErrorHandler,
    private router: Router,
    private userService: UserService,
  ) {}

  private buildRegistrationForm(config: RegistrationFormConfig): FormGroup {
    return this.fb.group(
      config.reduce((form, field) => {
        form[field.name] = this.fb.control(
          null,
          this.createFieldValidators(field),
        );

        return form;
      }, {} as Record<string, AbstractControl>),
    );
  }

  private createFieldValidators(
    registrationField: RegistrationField,
  ): ValidatorFn[] {
    const fieldValidations = registrationField.validations ?? [];

    return [
      ...fieldValidations.map((fieldValidation) =>
        this.createFieldValidator(fieldValidation),
      ),
      ...(registrationField.required
        ? [
            this.createFieldValidator({
              name: 'required',
              value: '',
              message: 'The field is required.',
            }),
          ]
        : []),
    ];
  }

  private createFieldValidator(fieldValidation: FieldValidation): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null || control.value.length === 0) {
        return fieldValidation.name === 'required'
          ? { required: fieldValidation.message }
          : null;
      }

      switch (fieldValidation.name) {
        case 'regex':
          return new RegExp(fieldValidation.value as string).test(control.value)
            ? null
            : { regex: fieldValidation.message };
        case 'maxlength':
          return typeof control.value.length === 'number' &&
            control.value.length > fieldValidation.value
            ? { maxlength: fieldValidation.message }
            : null;
        case 'minlength':
          return typeof control.value.length === 'number' &&
            control.value.length < fieldValidation.value
            ? { minlength: fieldValidation.message }
            : null;
        default:
          return null;
      }
    };
  }

  submit() {
    console.info(this.registrationForm.value);

    this.registrationApiService
      .register(this.registrationForm.value)
      .subscribe({
        next: (registered: boolean) => {
          if (registered) {
            this.userService.isAuthorized = true;
            this.router.navigateByUrl('/welcome');
          }
        },
        error: (e) => this.errorHandler.handle(e),
      });
  }

  getFirstErrorOfFormControl(formControlName: string): string {
    const [firstError] = Object.values(
      this.registrationForm.get(formControlName)?.errors ?? {},
    );

    return firstError;
  }

  computeFormFieldType(type: string): string {
    return type === 'password' && !this.showHiddenPassword
      ? 'password'
      : 'text';
  }

  togglePasswordVisibility() {
    this.showHiddenPassword = !this.showHiddenPassword;
  }
}
