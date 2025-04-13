import { Control, Controller, ControllerFieldState, ControllerRenderProps, FieldValues, Path, RegisterOptions, UseFormStateReturn } from "react-hook-form";
import { CSSProperties } from "react";
import { classNames } from "../../index";
import { InputText } from './InputText';
import { InputCalendar } from './InputCalendar';
import { InputNumber } from './InputNumber';
import { InputOtp } from "./InputOtp";
import { Dropdown } from "./Dropdown";
import { InputPhoneNumber } from "./InputPhoneNumber";
import { Password } from "./Password";
import { AutoComplete } from "./AutoComplete";
import { ErrorMessageInput } from "./ErrorMessageInput";
import { MultiSelect } from "./MultiSelect";
import { TextArea } from "./TextArea";
import { RadioGroup } from "./RadioGroup";
import { InputMask } from "./InputMask";
import { TreeCheckbox } from "./TreeCheckbox";
import "./styles/Input.scss";

export type InputRender<T extends FieldValues> = ({ field, fieldState, formState, }: {
    field: ControllerRenderProps<T, Path<T>>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<T>;
}) => React.ReactElement;
export interface IInputProps<T extends FieldValues> {
    name: Path<T>;
    label?: string;
    control: Control<T>;
    validationRules?: RegisterOptions<T, Path<T>>;
    errors: FieldValues;
    classNameRoot?: string;
    styleRoot?: CSSProperties;
    classNameLabel?: string;
    hideFeedbackMessage?: boolean;
    render: InputRender<T>;
}
const Input = <T extends FieldValues>({
    control,
    errors,
    label,
    name,
    validationRules,
    render,
    classNameLabel,
    classNameRoot = 'flex flex-column gap-1',
    hideFeedbackMessage,
    styleRoot,
}: IInputProps<T>) => {
    const errorMessage = errors?.[name]?.message;
    return (
        <section className={classNames(classNameRoot, "InputForm")} style={styleRoot}>
            {label && (
                <label htmlFor={name} className={classNameLabel}>
                    {label}
                    {!hideFeedbackMessage && validationRules?.required && <span>*</span>}
                </label>
            )}
            <Controller
                name={name}
                control={control}
                rules={validationRules}
                render={render}
            />
            {errorMessage && <ErrorMessageInput severity="error" text={errorMessage} />}
        </section>
    )
}
Input.Text = InputText;
Input.Number = InputNumber;
Input.Otp = InputOtp;
Input.Dropdown = Dropdown;
Input.PhoneNumber = InputPhoneNumber;
Input.Password = Password;
Input.Calendar = InputCalendar;
Input.AutoComplete = AutoComplete;
Input.MultiSelect = MultiSelect;
Input.TextArea = TextArea;
Input.Radio = RadioGroup;
Input.Mask = InputMask;
Input.TreeCheckbox = TreeCheckbox;

export { Input };

