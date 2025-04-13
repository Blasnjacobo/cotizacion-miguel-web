export const formatterDateRange = (startDate: Date, endDate: Date): string => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    const start = startDate.toLocaleDateString('en-US', options);
    const end = endDate.toLocaleDateString('en-US', options);
    return `From ${start} to ${end}`;
}