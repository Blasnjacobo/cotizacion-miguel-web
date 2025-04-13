import { FieldValues, useWatch } from 'react-hook-form';
import { Input, IInputProps } from './Input';
import { classNames } from 'primereact/utils';
import { InputNumber as PrimeInputNumber } from '../../index';
import { InputNumberProps as PrimeInputNumberProps } from 'primereact/inputnumber';
import { useEffect, useState } from 'react';

export interface IInputNumberProps<T extends FieldValues>
  extends Omit<IInputProps<T>, 'render'>,
  Omit<PrimeInputNumberProps, 'name'> { }

export const InputNumber = <T extends FieldValues>({
  classNameLabel,
  classNameRoot,
  control,
  errors,
  hideFeedbackMessage,
  inputId,
  label,
  name,
  maxLength,
  useGrouping = true,
  onBlur,
  onChange,
  onValueChange,
  styleRoot,
  validationRules,
  minFractionDigits,
  ...inputNumberProps
}: IInputNumberProps<T>) => {
  const propsInput = {
    classNameLabel,
    classNameRoot,
    control,
    errors,
    hideFeedbackMessage,
    label,
    name,
    styleRoot,
    validationRules,
  };

  const [value, setValue] = useState<number>(0);
  // const groupingValue = (useGrouping ? 1 : 0)

  // Watch for changes in the form state
  const watchedValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    // Update local state when form state changes
    setValue(watchedValue || 0);
  }, [watchedValue]);

  useEffect(() => {
    control._defaultValues[name] && setValue(control._defaultValues[name]);
  }, [control._defaultValues, name]);

    // Determine if we should allow decimals based on minFractionDigits
    const allowDecimals = minFractionDigits !== undefined && minFractionDigits > 0;
  // Calculate actual maxLength accounting for special characters
  const calculateMaxLength = () => {
    if (!maxLength) return undefined;

    let extraChars = 0;

    // Add 1 for decimal point if decimals are allowed
    if (allowDecimals) {
      extraChars += 1;
    }

    // Account for grouping separators (commas)
    if (useGrouping && maxLength > 3) {
      // Estimate number of thousand separators (one comma per 3 digits)
      const estimatedSeparators = Math.floor((maxLength - 1) / 3);
      extraChars += estimatedSeparators;
    }

    return maxLength + extraChars;
  };

  const maxLengthFinal = calculateMaxLength();


  return (
    <Input
      {...propsInput}
      render={({ field, fieldState }) => {
        return (
          <PrimeInputNumber
            {...field}
            value={value}
            useGrouping={useGrouping}
            minFractionDigits={minFractionDigits}
            {...inputNumberProps}
            maxLength={maxLengthFinal}
            data-testid={`input-number-${name}`}
            invalid={fieldState.invalid || Boolean(errors?.[name])}
            inputId={inputId}
            onValueChange={(e) => {
              field.onChange(e);
              setValue(e.target.value as number);
              onValueChange?.(e);
            }}
            onChange={(e) => {
              field.onChange(e.value);
              onChange?.(e);
            }}
            className={classNames('w-full', inputNumberProps.className)}
            inputClassName={classNames('w-full', inputNumberProps.inputClassName)}
          />
        );
      }}
    />
  );
};
