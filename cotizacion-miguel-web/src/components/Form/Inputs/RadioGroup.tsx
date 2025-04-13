import { FieldValues } from 'react-hook-form';
import { RadioButtonProps } from 'primereact/radiobutton';
import { RadioButton } from '../../index';
import { Input, IInputProps } from './Input';
import './styles/RadioGroup.scss';

export interface IRadioProps<T extends FieldValues>
  extends Omit<IInputProps<T>, 'render'>,
    Omit<RadioButtonProps, 'name'> {
  categories: ICategory[];
  horizontal?: boolean;
  classNameContent?: string;
}
export interface ICategory {
  name: string;
  value: string;
}
export const RadioGroup = <T extends FieldValues>({
  label,
  classNameLabel,
  classNameRoot,
  hideFeedbackMessage,
  styleRoot,
  name,
  categories,
  control,
  errors,
  validationRules,
  horizontal = true,
  classNameContent,
  onChange,
  onBlur,
  ...radioProps
}: IRadioProps<T>) => {
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
        <div className={`RadioGroup ${horizontal ? 'horizontal' : 'flex-column'} ${classNameContent}`}>
          {categories.map((category) => {
            return (
              <div key={category.value} className="RadioButton">
                <label
                  htmlFor={category.value}
                  className={`RadioButton__label font-normal ${category.value === field.value ? 'activeRadio' : ''}`}
                >
                  <RadioButton
                    {...field}
                    value={category.value}
                    {...radioProps}
                    data-testid={`input-radio-${name}-${category.value}`}
                    inputId={category.value}
                    onChange={(e) => {
                      field.onChange(e.value);
                      onChange?.(e);
                    }}
                    onBlur={(e) => {
                      field.onBlur();
                      onBlur?.(e);
                    }}
                    checked={category.value === field.value}
                    invalid={fieldState.invalid || Boolean(errors?.[name])}
                  />
                  <span>{category.name}</span>
                </label>
              </div>
            );
          })}
        </div>
      )}
    />
  );
};
