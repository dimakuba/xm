import { IsBoolean, IsDefined, IsString } from 'class-validator';

export class FieldValidation {
  @IsDefined() @IsString() name: string;
  @IsDefined() @IsString() message: string;
  @IsDefined() value: string | number;

  constructor(options: FieldValidation) {
    this.name = options.name;
    this.message = options.message;
    this.value = options.value;
  }
}

export class RegistrationField {
  @IsDefined() @IsString() name: string;
  @IsDefined() @IsString() type: 'text' | 'email' | 'phone' | 'password';
  @IsDefined() @IsString() label: string;
  @IsDefined() @IsBoolean() required: boolean;
  validations?: FieldValidation[];

  constructor(options: RegistrationField) {
    this.name = options.name;
    this.type = options.type;
    this.label = options.label;
    this.required = options.required;
    this.validations = options?.validations?.map((v) => new FieldValidation(v));
  }
}

export type RegistrationFormConfig = RegistrationField[];

export interface RegistrationRequest {
  [fieldName: string]: string;
}
