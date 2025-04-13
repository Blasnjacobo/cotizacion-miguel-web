import { DefaultValues, FieldValues, Path, PathValue, useForm } from 'react-hook-form';
import { FC, useMemo } from 'react';
import { BuilderField } from '../BuilderField';
import { InputForm, IUseFormBuilderProps, ReturnFormBuilder } from './useFormBuilder.interface';

export const useFormBuilder = <T extends FieldValues>({
  isReadOnly = false,
  configForm,
  defaultValues,
  propsUseForm,
  formatterDefaultReadonly,
}: IUseFormBuilderProps<T>): ReturnFormBuilder<T> => {
  const getDefaultValues = useMemo(() => {
    if (defaultValues) return defaultValues as DefaultValues<T>;
    return Object.keys(configForm).reduce((accumulator, key) => {
      const fieldConfig = configForm[key as keyof T];
      accumulator[fieldConfig.name as string] = fieldConfig.defaultValue ?? '';
      return accumulator;
    }, {} as DefaultValues<T>);
  }, [configForm, defaultValues]);

  const hookForm = useForm<T>({ ...propsUseForm, defaultValues: getDefaultValues });

  const Form = useMemo(
    () =>
      Object.keys(configForm).reduce((accumulator, key) => {
        const fieldKey = `Input${key[0].toUpperCase()}${key.slice(1)}`;
        (accumulator as Record<string, FC>)[fieldKey] = (props) => (
          <BuilderField formatterDefaultReadonly={formatterDefaultReadonly} props={props} configForm={configForm[key as keyof T]} hook={hookForm} isReadOnly={isReadOnly} />
        );
        return accumulator;
      }, {} as InputForm<T, FC>),
    [configForm, hookForm, isReadOnly]
  );

  const setAllValues = (newValues: Partial<T>) => {
    hookForm.watch();
    Object.keys(newValues).forEach((key) => {
      hookForm.setValue(key as Path<T>, newValues[key] as PathValue<T, Path<T>>);
    });
  };

  return {
    Form,
    hookForm,
    setAllValues,
  };
};
