import { TreeSelect, TreeSelectProps } from 'primereact/treeselect';
import { IInputProps, Input } from './Input';
import { FieldValues } from 'react-hook-form';

export interface ITreeCheckboxProps<T extends FieldValues>
  extends Omit<IInputProps<T>, 'render'>,
  Omit<TreeSelectProps, 'name'> { }

export const TreeCheckbox = <T extends FieldValues>({
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
  ...treeSelectProps
}: ITreeCheckboxProps<T> ) => {
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
  return <Input {...propsInput} render={({ field, fieldState }) => (
    <TreeSelect
        selectionMode="checkbox"
        {...field}
        {...treeSelectProps}
        onChange={(e) => {
            field.onChange(e.value);
            onChange?.(e);
        }}
        onBlur={(e) => {
            field.onBlur();
            onBlur?.(e);
        }}
        data-testid={`input-tree-checkbox-${name}`}
        invalid={fieldState.invalid || Boolean(errors?.[name])}
        id={name}
    />
  )} />;
};
