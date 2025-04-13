import './styles/InputPhoneNumber.scss';
import { classNames } from '../../index';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText, InputTextProps } from 'primereact/inputtext';
import { FieldValues, Path } from 'react-hook-form';
import { Input, IInputProps } from './Input';

export interface IInputPhoneNumberProps<T extends FieldValues>
  extends Omit<IInputProps<T>, 'render'>,
  Omit<InputTextProps, 'name'> {
  code?: string;
  label?: string;
  name: Path<T>;
}

export const InputPhoneNumber = <T extends FieldValues>({
  code = 'MX',
  errors,
  name,
  label,
  control,
  validationRules,
  classNameLabel,
  classNameRoot,
  hideFeedbackMessage,
  styleRoot,
  onChange,
  onBlur,
  ...inputPhoneNumberProps
}: IInputPhoneNumberProps<T>) => {
  const propsInput = {
    control,
    errors,
    label,
    name,
    validationRules,
    classNameLabel,
    classNameRoot: 'InputPhoneNumber',
    hideFeedbackMessage,
    styleRoot,
  };
  return (
    <Input
      {...propsInput}
      render={({ field, fieldState }) => (
        <IconField iconPosition="left">
          <InputIcon className="InputPhoneNumber__flag">
            {/* <i dangerouslySetInnerHTML={{ __html: CountryFlagSvg[code] }}></i>
              <span> {country?.dialCode ?? ''} </span> */}
          </InputIcon>
          <InputText
            {...field}
            id={name}
            type="tel"
            keyfilter="int"
            {...inputPhoneNumberProps}
            data-testid={`input-phonenumber-${name}`}
            className={classNames(
              'InputPhoneNumber__input',
              inputPhoneNumberProps.className
            )}
            invalid={fieldState.invalid || Boolean(errors?.[name])}
            onChange={(e) => {
              field.onChange(e.target.value);
              onChange?.(e);
            }}
            onBlur={(e) => {
              field.onBlur();
              onBlur?.(e);
            }}
          />
        </IconField>
      )}
    />
  );
};
