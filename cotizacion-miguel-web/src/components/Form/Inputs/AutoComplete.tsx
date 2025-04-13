import { AutoComplete as PrimeAutoComplete, classNames } from '../../index';
import { type AutoCompleteProps } from 'primereact/autocomplete';
import { FieldValues } from 'react-hook-form';
import { Input, IInputProps } from './Input';

export interface IAutoCompleteProps<T extends FieldValues>
  extends Omit<IInputProps<T>, 'render'>,
    Omit<AutoCompleteProps, 'name' | 'value' | 'suggestions'> {
}

export const AutoComplete = <T extends FieldValues>({
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
  ...autoCompleteProps
}: IAutoCompleteProps<T>) => {
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
  return (
    <Input
      {...propsInput}
      render={({ field, fieldState }) => (
        <PrimeAutoComplete
          {...field}
          value={field.value}
          {...autoCompleteProps}
          onChange={(e) => {
            field.onChange(e.target.value.trimStart());
            onChange?.(e);
          }}
          onBlur={(e) => {
            field.onBlur();
            onBlur?.(e);
          }}
          data-testid={`input-autocomplete-${name}`}
          inputId={name}
          invalid={fieldState.invalid || Boolean(errors?.[name])}
          className={classNames('w-full', autoCompleteProps.className)}
          inputClassName={classNames('w-full', autoCompleteProps.inputClassName)}
        />
      )}
    />
  );
};
