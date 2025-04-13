import { classNames } from '../../index';
import { InputTextarea, InputTextareaProps } from 'primereact/inputtextarea';
import { FieldValues } from 'react-hook-form';
import { Input, IInputProps } from './Input';

export interface ITextareaProps<T extends FieldValues>
  extends Omit<IInputProps<T>, 'render'>,
    Omit<InputTextareaProps, 'name'> {}

    export const TextArea = <T extends FieldValues>({
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
      ...textAreaProps
    }: ITextareaProps<T>) => {
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
            <>
              <InputTextarea
                {...field}
                {...textAreaProps}
                onChange={(e) => {
                  field.onChange(e.target.value.trimStart());
                  onChange?.(e);
                }}
                onBlur={(e) => {
                  field.onBlur();
                  onBlur?.(e);
                }}
                data-testid={`input-textarea-${name}`}
                invalid={fieldState.invalid || Boolean(errors?.[name])}
                id={name}
                className={classNames('w-full', textAreaProps.className)}
              />
              {textAreaProps.maxLength && textAreaProps.maxLength - (field.value?.length || 0) >= 0 && (
                <span className="mt-2 text-info-500">
                  {textAreaProps.maxLength - (field.value?.length || 0)} characters remaining
                </span>
              )}
            </>
          )}
        />
      );
    };