import { formatterCurrency, formatterDate } from '../../../utils';
import { classNames } from 'primereact/utils';
import { ReactNode, useEffect } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { FormatterReadonlyType, ValuesSupported } from '../Hooks';

interface ClassNamesReadOnly {
  item?: string;
  label?: string;
  value?: string;
}

interface IInputReadOnlyProps<T extends FieldValues> {
  label: string;
  readonly: boolean;
  children?: ReactNode;
  classNamesReadOnly?: ClassNamesReadOnly;
  formatterReadonly?: FormatterReadonlyType<T>;
  formatterLabelReadonly?: FormatterReadonlyType<T>;
  showLabelReadonly?: boolean;
  hook: UseFormReturn<T>;
  name: Path<T>;
  hideInput?: (value: T) => boolean;
  className?: string;
}

export const formatterReadOnlyFB = (value: ValuesSupported) => {
  
  if (typeof value === 'number') return formatterCurrency(value);
  if (value instanceof Date) return formatterDate(value);
  if (typeof value === 'string') return value;
  return value as ReactNode;
};

export const InputReadOnly = <T extends FieldValues>({
  label,
  readonly,
  children,
  formatterReadonly,
  formatterLabelReadonly,
  showLabelReadonly = true,
  classNamesReadOnly,
  hideInput,
  hook,
  name,
  ...props
}: IInputReadOnlyProps<T>) => {
  const getValueFormatter = (value: ValuesSupported): string | ReactNode => {
    if (formatterReadonly) return formatterReadonly(value, hook.watch);
    return formatterReadOnlyFB(value);
  };
  const values = hook.watch();
  const isHidden = hideInput?.(values);
  useEffect(() => {
    if (isHidden === true && values[name] !== '') {
      hook.setValue(name, '' as any, { shouldValidate: true });
    }
  }, [isHidden, values[name], hook, name]);

  useEffect(() => {
    if (!isHidden && hook.getFieldState(name).invalid) {
      hook.clearErrors(name);
    }
  }, []);
  if (isHidden) {
    return <></>;
  }
  if (!readonly) return children;
  return (
    <section
      className={classNames(classNamesReadOnly?.item ? classNamesReadOnly?.item : 'flex flex-column w-full gap-1')}
      {...props}
    >
      {showLabelReadonly &&
        (formatterLabelReadonly ? (
          formatterLabelReadonly(hook.getValues(name), hook.watch)
        ) : (
          <label className={classNames(classNamesReadOnly?.label ? classNamesReadOnly?.label : 'm-0 p-0')}>
            {label}
          </label>
        ))}
      <div className={classNames(classNamesReadOnly?.value ? classNamesReadOnly?.value : 'm-0 p-0')}>
        {getValueFormatter(hook.getValues(name))}
      </div>
    </section>
  );
};
