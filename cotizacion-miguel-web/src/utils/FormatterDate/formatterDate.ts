
export const formatterDate = (date: Date | string, options?: Intl.DateTimeFormatOptions) =>
    typeof date === 'string' ? date : 
        date.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric", ...options });

export const formatTimeWithTimezone = (date: Date, timezone: string) => { 
    const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const time = formatter.format(date);
    return `${time} ${timezone}`;
}