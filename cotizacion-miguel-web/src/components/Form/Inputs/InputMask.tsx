import { FieldValues } from 'react-hook-form';
import { Input, IInputProps } from './Input';
import { InputMask as PrimeInputMask, type InputMaskProps as PrimeInputMaskProps } from '../../index';
import { classNames } from 'primereact/utils';
import { useEffect, useState } from 'react';

export interface IInputMaskProps<T extends FieldValues>
  extends Omit<IInputProps<T>, 'render'>,
    Omit<PrimeInputMaskProps, 'name'> {}

export const InputMask = <T extends FieldValues>({
  control,
  errors,
  mask,
  label,
  name,
  validationRules,
  classNameLabel,
  classNameRoot,
  hideFeedbackMessage,
  styleRoot,
  onChange,
  onBlur,
  ...inputMaskProps
}: IInputMaskProps<T>) => {
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

  const [value, setValue] = useState<string | undefined>('');

  useEffect(() => {
    setValue(control._defaultValues[name] ?? '');
  }, []);
  
  return (
    <Input
      {...propsInput}
      render={({ field, fieldState }) => (
        <PrimeInputMask
          {...field}
          value={value}
          autoClear={false}
          {...inputMaskProps}
          id={name}
          mask={mask}
          data-testid={`input-mask-${name}`}
          onChange={(e) => {
            setValue(e.value ?? '');
            const cleanValue = e.value?.replace(/[^0-9a-zA-Z]+/g, '');
            field.onChange(cleanValue);
            onChange?.(e);
            onChange?.(e);
          }}
          onBlur={(e) => {
            field.onBlur();
            onBlur?.(e);
          }}
          invalid={fieldState.invalid || Boolean(errors?.[name])}
          className={classNames('w-full', inputMaskProps.className)}
        />
      )}
    />
  );
};
