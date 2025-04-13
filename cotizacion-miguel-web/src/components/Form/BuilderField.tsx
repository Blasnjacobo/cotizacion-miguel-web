import { FieldValues, UseFormReturn } from 'react-hook-form';
import { ConfigField, FormatterReadonlyType, PropsForType } from './Hooks/useFormBuilder.interface';
import { ICategory,  Input, IOptions } from './Inputs';
import { InputReadOnly } from './Inputs/InputReadOnly';
import { TreeNode } from 'primereact/treenode';
import { SelectItemOptionsType } from 'primereact/selectitem';

interface IBuilderFieldProps<T extends FieldValues> {
  formatterDefaultReadonly?: FormatterReadonlyType<T>;
  configForm: ConfigField<T>;
  hook: UseFormReturn<T>;
  isReadOnly: boolean;
  props: object;
}

export const BuilderField = <T extends FieldValues>({ configForm, hook, isReadOnly, props, formatterDefaultReadonly }: IBuilderFieldProps<T>) => {
  const map = {
    number: (
      <Input.Number
        control={hook.control}
        label={configForm.label ?? ''}
        validationRules={configForm.validationRules ?? {}}
        name={configForm.name}
        errors={hook.formState.errors}
        onValueChange={e => hook.setValue(configForm.name, e.value as never, { shouldValidate: true })}
        {...configForm.props as PropsForType<T, "number">}
        {...props}
      />
    ),
    text: (
      <Input.Text
        onKeyUp={() => hook.trigger(configForm.name)}
        control={hook.control}
        label={configForm.label ?? ''}
        validationRules={configForm.validationRules ?? {}}
        name={configForm.name}
        errors={hook.formState.errors}
        {...configForm.props as PropsForType<T, "text">}
        {...props}
      />
    ),
    phoneNumber: (
      <Input.PhoneNumber
        errors={hook.formState.errors}
        name={configForm.name}
        control={hook.control}
        validationRules={configForm.validationRules ?? {}}
        label={configForm.label ?? ''}
        {...configForm.props as PropsForType<T, "phoneNumber">}
        {...props}
      />
    ),
    password: (
      <Input.Password
        control={hook.control}
        errors={hook.formState.errors}
        label={configForm.label ?? ''}
        name={configForm.name}
        validationRules={configForm.validationRules ?? {}}
        {...configForm.props as PropsForType<T, "password">}
        {...props}
      />
    ),
    date: (
      <Input.Calendar
        control={hook.control}
        errors={hook.formState.errors}
        label={configForm.label ?? ''}
        name={configForm.name}
        validationRules={configForm.validationRules ?? {}}
        {...configForm.props as PropsForType<T, "date">}
        {...props}
      />
    ),
    select: (
      <Input.Dropdown
        control={hook.control}
        errors={hook.formState.errors}
        label={configForm.label ?? ''}
        name={configForm.name}
        validationRules={configForm.validationRules ?? {}}
        options={(configForm.options as SelectItemOptionsType) ?? []}
        onChange={e => hook.setValue(configForm.name, e.value as never, { shouldValidate: true })}
        {...configForm.props as PropsForType<T, "select">}
        {...props}
      />
    ),
    autocomplete: (
      <Input.AutoComplete
        control={hook.control}
        errors={hook.formState.errors}
        name={configForm.name}
        validationRules={configForm.validationRules ?? {}}
        label={configForm.label ?? ''}
        {...configForm.props as PropsForType<T, "autocomplete">}
        {...props}
      />
    ),
    radio: (
      <Input.Radio
        categories={(configForm.options as ICategory[]) ?? []}
        control={hook.control}
        errors={hook.formState.errors}
        name={configForm.name}
        validationRules={configForm.validationRules ?? {}}
        {...configForm.props as PropsForType<T, "radio">}
        {...props}
      />
    ),
    multiSelect: (
      <Input.MultiSelect
        control={hook.control}
        errors={hook.formState.errors}
        label={configForm.label ?? ''}
        name={configForm.name}
        options={(configForm.options as IOptions[]) ?? []}
        validationRules={configForm.validationRules ?? {}}
        {...configForm.props as PropsForType<T, "multiSelect">}
        {...props}
      />
    ),
    textarea: (
      <Input.TextArea
        onKeyUp={() => hook.trigger(configForm.name)}
        label={configForm.label ?? ''}
        control={hook.control}
        name={configForm.name}
        errors={hook.formState.errors}
        validationRules={configForm.validationRules ?? {}}
        {...configForm.props as PropsForType<T, "textarea">}
        {...props}
      />
    ),
    otp: (
      <Input.Otp
        control={hook.control}
        name={configForm.name}
        errors={hook.formState.errors}
        label={configForm.label}
        validationRules={configForm.validationRules}
        {...configForm.props as PropsForType<T, "otp">}
        {...props}
      />
    ),
    mask: (
      <Input.Mask
        control={hook.control}
        name={configForm.name}
        errors={hook.formState.errors}
        label={configForm.label}
        validationRules={configForm.validationRules}
        {...configForm.props as PropsForType<T, "mask">}
        {...props}
        />
    ),
    treeCheckbox: (
      <Input.TreeCheckbox
        control={hook.control}
        name={configForm.name}
        errors={hook.formState.errors}
        label={configForm.label}
        validationRules={configForm.validationRules}
        options={configForm.options as TreeNode[]}
        {...configForm.props as PropsForType<T, "treeCheckbox">}
        {...props}
      />
    )
  }[configForm.type];
  return (
    <InputReadOnly
      label={configForm.label ?? ''}
      readonly={isReadOnly}
      hook={hook}
      name={configForm.name}
      formatterReadonly={configForm.formatterReadonly ?? formatterDefaultReadonly}
      showLabelReadonly={configForm.showLabelReadonly}
      formatterLabelReadonly={configForm.formatterLabelReadonly}
      hideInput={configForm.hideInput}
      {...configForm.props}
      {...props}
    >
      {map}
    </InputReadOnly>
  );
};
