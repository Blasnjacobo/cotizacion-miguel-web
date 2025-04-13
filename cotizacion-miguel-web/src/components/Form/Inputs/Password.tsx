import { Password as PrimePassword, PasswordProps as PrimePasswordProps } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { FieldValues } from 'react-hook-form';
import { Input, IInputProps } from './Input';

export interface IInputPasswordProps<T extends FieldValues> extends Omit<IInputProps<T>, "render">, Omit<PrimePasswordProps, 'name'> { }

export const Password = <T extends FieldValues>({
  name,
  control,
  validationRules,
  errors,
  label,
  classNameRoot,
  hideFeedbackMessage,
  classNameLabel,
  styleRoot,
  onChange,
  onBlur,
  ...passwordProps
}: IInputPasswordProps<T>) => {
  const propsInput = { control, errors, label, name, validationRules, classNameLabel, classNameRoot, hideFeedbackMessage, styleRoot };
  return (
    <Input
      {...propsInput}
      render={({ field, fieldState }) => (
        <PrimePassword
          {...field}
          inputId={field.name}
          {...passwordProps}
          data-testid={`input-password-${name}`}
          invalid={fieldState.invalid || Boolean(errors?.[name])}
          className={classNames('w-full block', passwordProps.className)}
          inputClassName={classNames('w-full', passwordProps.inputClassName)}
          onChange={(e) => {
            field.onChange(e.target.value);
            onChange?.(e);
          }}
          onBlur={(e) => {
            field.onBlur();
            onBlur?.(e);
          }}
        />
      )}
    />
  );
};
