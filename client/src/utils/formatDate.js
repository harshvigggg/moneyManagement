import { format, parseISO } from 'date-fns';

export const formatDate = (dateStr) => {
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : new Date(dateStr);
  return format(date, 'dd MMM yyyy');
};

export const formatMonth = (monthStr) => {
  const [year, month] = monthStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return format(date, 'MMM yy');
};
