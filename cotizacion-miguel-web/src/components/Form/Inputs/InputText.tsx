import { FieldValues } from 'react-hook-form';
import { Input, IInputProps } from './Input';
import { InputText as PrimeInputText } from '../../index';
import { classNames } from 'primereact/utils';
import { type InputTextProps as PrimeInputTextProps } from 'primereact/inputtext';

export interface IInputTextProps<T extends FieldValues>
  extends Omit<IInputProps<T>, 'render'>,
    Omit<PrimeInputTextProps, 'name'> {}

export const InputText = <T extends FieldValues>({
  control,
  errors,
  label,
  name,
  validationRules,
  classNameLabel,
  classNameRoot,
  hideFeedbackMessage,
  styleRoot,
  onChange,
  onBlur,
  ...inputTextProps
}: IInputTextProps<T>) => {
  const propsInput = {
    control,
    errors,
    label,
    name,
    validationRules,
    classNameLabel,
    classNameRoot,
    hideFeedbackMessage,
    styleRoot,
  };
  return (
    <Input
      {...propsInput}
      render={({ field, fieldState }) => (
        <PrimeInputText
          {...field}
          id={name}
          value={field.value ?? undefined}
          {...inputTextProps}
          onChange={(e) => {
            field.onChange(e.target.value.trimStart());
            onChange?.(e);
          }}
          onBlur={(e) => {
            field.onBlur();
            onBlur?.(e);
          }}
          data-testid={`input-text-${name}`}
          invalid={fieldState.invalid || Boolean(errors?.[name])}
          className={classNames('w-full', inputTextProps.className)}
        />
      )}
    />
  );
};
