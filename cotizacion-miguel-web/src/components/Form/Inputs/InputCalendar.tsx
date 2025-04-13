import { addLocale, Calendar, CalendarProps, classNames } from '../../index';
import { FieldValues } from 'react-hook-form';
import { Input, IInputProps } from './Input';
import { useEffect, useRef } from 'react';

export const localeEs = {
  firstDayOfWeek: 1,
  dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
  dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  monthNames: [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ],
  monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  today: 'Hoy',
  clear: 'Limpiar',
};
addLocale('es', localeEs);

export interface IInputCalendarProps<T extends FieldValues>
  extends Omit<IInputProps<T>, 'render'>,
  Omit<CalendarProps, 'name'> { }

export const InputCalendar = <T extends FieldValues>({
  name,
  control,
  validationRules,
  errors,
  label,
  classNameRoot,
  classNameLabel,
  hideFeedbackMessage,
  styleRoot,
  onChange,
  onBlur,
  ...calendarProps
}: IInputCalendarProps<T>) => {
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

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.type = 'tel';
    ref.current.inputMode = 'numeric';
  }, []);

  return (
    <Input
      {...propsInput}
      render={({ field, fieldState }) => (
        <Calendar
          {...field}
          mask="99/99/9999"
          selectionMode="single"
          showIcon
          {...calendarProps}
          inputRef={ref}
          data-testid={`input-calendar-${name}`}
          id={name}
          invalid={fieldState.invalid || Boolean(errors?.[name])}
          className={classNames('w-full', calendarProps.className)}
          inputClassName={classNames(calendarProps.inputClassName)}
          onChange={(e) => {
            field.onChange(e.target.value);
            onChange?.(e);
          }}
          onBlur={(e) => {
            field.onBlur();
            onBlur?.(e);
          }}
        />
      )}
    />
  );
};
