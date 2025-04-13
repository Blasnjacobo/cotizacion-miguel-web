/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode } from 'react';
import { FieldValues, Path, RegisterOptions, UseFormProps, UseFormReturn, UseFormWatch } from 'react-hook-form';
import { IAutoCompleteProps, IDropdownProps, IInputCalendarProps, IInputNumberProps, IInputOtpProps, IInputPasswordProps, IInputPhoneNumberProps, IInputTextProps, IMultiSelectProps, IRadioProps, ITextareaProps, IInputMaskProps } from '../Inputs';
import { TreeNode } from 'primereact/treenode';
import { ITreeCheckboxProps } from '../Inputs/TreeCheckbox';
import { SelectItemOptionsType } from 'primereact/selectitem';

export interface IUseFormBuilderProps<T extends FieldValues> {
  isReadOnly?: boolean;
  configForm: ConfigForm<T>;
  defaultValues?: Partial<Record<keyof T, ValuesSupported>>;
  formatterDefaultReadonly?: FormatterReadonlyType<T>;
  propsUseForm?: Omit<UseFormProps<T>, 'defaultValues'>;
}

export type InputForm<T, R> = {
  [K in keyof T as `Input${Capitalize<string & K>}`]: R;
};

export type ValuesSupported = string | number | Date | boolean | Array<any> | Record<string, any>;

export type TypesForm =
  | 'text'
  | 'phoneNumber'
  | 'number'
  | 'password'
  | 'date'
  | 'select'
  | 'autocomplete'
  | 'radio'
  | 'multiSelect'
  | 'textarea'
  | 'otp'
  | "mask"
  | "treeCheckbox"

type PropsByType<T extends FieldValues> = {
  text: IInputTextProps<T>;
  phoneNumber: IInputPhoneNumberProps<T>;
  number: IInputNumberProps<T>;
  password: IInputPasswordProps<T>;
  date: IInputCalendarProps<T>;
  select: IDropdownProps<T>;
  autocomplete: IAutoCompleteProps<T>;
  radio: IRadioProps<T>;
  multiSelect: IMultiSelectProps<T>;
  textarea: ITextareaProps<T>;
  otp: IInputOtpProps<T>;
  mask: IInputMaskProps<T>;
  treeCheckbox: ITreeCheckboxProps<T>;
};

export type PropsForType<T extends FieldValues, K extends TypesForm> = K extends keyof PropsByType<T>
  ? Omit<PropsByType<T>[K], PropsOmitInput>
  : never;

export type Options = {
  name: string;
  value: ValuesSupported | ReactNode;
};

export type FormatterReadonlyType<T extends FieldValues> = (value: ValuesSupported, watch: UseFormWatch<T>) => string | ReactNode | JSX.Element;

export type ConfigField<T extends FieldValues, K extends TypesForm = TypesForm> = {
  type: K;
  label?: string;
  name: Path<T>;
  defaultValue?: ValuesSupported | ReactNode;
  validationRules?: RegisterOptions<T>;
  options?: SelectItemOptionsType | Options | TreeNode[];
  formatterReadonly?: FormatterReadonlyType<T>;
  formatterLabelReadonly?: FormatterReadonlyType<T>;
  showLabelReadonly?: boolean;
  props?: PropsForType<T, K>; 
  hideInput?: (value: T) => boolean;
};

export type ConfigForm<T extends FieldValues> = Record<keyof T, ConfigField<T>>;

export type PropsOmitInput =
  | 'control'
  | 'label'
  | 'errors'
  | 'getValues'
  | 'name'
  | 'validationRules'
  | 'type'
  | 'trigger'
  | 'categories';

export type TypesPropsInputs<T extends FieldValues> =
  | Omit<IInputTextProps<T>, PropsOmitInput>
  | Omit<IAutoCompleteProps<T>, PropsOmitInput>
  | Omit<IInputNumberProps<T>, PropsOmitInput>;

export type InputsForm<T extends FieldValues> = InputForm<T, FC<TypesPropsInputs<T> | Record<string, object | string | number | boolean>>>;
export interface ReturnFormBuilder<T extends FieldValues> {
  setAllValues(values: Partial<T>): void;
  hookForm: UseFormReturn<T>;
  Form: InputForm<T, FC<TypesPropsInputs<T> | Record<string, object | string | number | boolean>>>;
  defaultValues?: Partial<Record<keyof T, ValuesSupported | ReactNode>>;
}

export interface UseFormBuilderProps<T extends FieldValues> {
  isReadOnly?: boolean;
  configForm: ConfigForm<T>;
  defaultValues?: Partial<Record<keyof T, ValuesSupported | ReactNode>>;
}