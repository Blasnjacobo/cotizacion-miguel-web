import {
  classNames,
  Dropdown as PrimeDropdown,
  DropdownProps as PrimeDropdownProps,
} from '../../index';
import { FieldValues } from 'react-hook-form';
import './styles/Dropdown.scss';
import { Input, IInputProps } from './Input';

export interface IDropdownProps<T extends FieldValues> extends Omit<IInputProps<T>, "render">, Omit<PrimeDropdownProps, 'name'> { }

export const Dropdown = <T extends FieldValues>({
  classNameLabel,
  classNameRoot,
  control,
  errors,
  hideFeedbackMessage,
  label,
  name,
  onBlur,
  onChange,
  styleRoot,
  validationRules,
  ...dropdownProps
}: IDropdownProps<T>) => {
  const propsInput = { control, errors, label, name, validationRules, classNameLabel, classNameRoot, hideFeedbackMessage, styleRoot };
  return (
    <Input
      {...propsInput}
      render={({ field, fieldState }) => (
        <PrimeDropdown
          {...field}
          optionLabel="name"
          {...dropdownProps}
          data-testid={`input-dropdown-${name}`}
          invalid={fieldState.invalid || Boolean(errors?.[name])}
          inputId={name}
          className={classNames(
            'w-full',
            dropdownProps.className
          )}
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
