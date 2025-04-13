import { MultiSelect as PrimeMultiSelect } from '../../index';
import { MultiSelectProps as PrimeMultiSelectProps } from 'primereact/multiselect';
import { classNames } from 'primereact/utils';
import { FieldValues } from 'react-hook-form';
import { Input, IInputProps } from './Input';

export interface IOptions {
  name: string;
  value: string;
}

export interface IMultiSelectProps<T extends FieldValues> extends Omit<IInputProps<T>, "render">, Omit<PrimeMultiSelectProps, 'name'> {
  isAllChipsToggle?: boolean;
}

export const MultiSelect = <T extends FieldValues>({
  classNameLabel,
  classNameRoot,
  control,
  errors,
  hideFeedbackMessage,
  isAllChipsToggle = false,
  label,
  name,
  options,
  styleRoot,
  validationRules,
  onChange,
  onBlur,
  ...multiselectProps
}: IMultiSelectProps<T>) => {
  const propsInput = { control, errors, label, name, validationRules, classNameLabel, classNameRoot, hideFeedbackMessage, styleRoot };
  return (
    <Input
      {...propsInput}
      render={({ field, fieldState }) => (
        <PrimeMultiSelect
          {...field}
          options={options}
          optionLabel="name"
          maxSelectedLabels={isAllChipsToggle ? undefined : 3}
          {...multiselectProps}
          data-testid={`input-multiselect-${name}`}
          invalid={fieldState.invalid || Boolean(errors?.[name])}
          pt={{
            header: { className: isAllChipsToggle ? '' : 'hidden', ...multiselectProps.pt?.header },
            ...multiselectProps.pt,
          }}
          className={classNames('w-full', multiselectProps.className)}
          onChange={(e) => {
            field.onChange(e.value);
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
