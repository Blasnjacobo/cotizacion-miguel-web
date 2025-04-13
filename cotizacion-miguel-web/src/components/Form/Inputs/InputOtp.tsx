import { InputOtpProps as PrimeInputOtpProps, } from 'primereact/inputotp';
import { InputOtp as PrimeInputOtp, } from '../../index';
import { FieldValues } from 'react-hook-form';
import { Input, IInputProps } from './Input';

export interface IInputOtpProps<T extends FieldValues> extends Omit<IInputProps<T>, "render">, Omit<PrimeInputOtpProps, 'name'> { }

export const InputOtp = <T extends FieldValues>({
  label,
  name,
  control,
  validationRules,
  errors,
  onChange,
  classNameLabel,
  classNameRoot,
  hideFeedbackMessage,
  styleRoot,
  onBlur,
  ...inputOtpProps
}: IInputOtpProps<T>) => {
  const propsInput = { control, errors, label, name, validationRules, classNameLabel, classNameRoot, hideFeedbackMessage, styleRoot };
  return (
    <Input
      {...propsInput}
      render={({ field, fieldState }) => (
        <PrimeInputOtp
          {...field}
          value={field.value}
          className='test'
          {...inputOtpProps}
          data-testid={`input-otp-${name}`}
          invalid={fieldState.invalid || errors?.[name]}
          onChange={(e) => {
            field.onChange(e.value);
            onChange?.(e);
          }}
          onBlur={(e) => {
            field.onBlur();
            onBlur?.(e);
          }}
        />
      )} />
  );
};
