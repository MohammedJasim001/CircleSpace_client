import { format, isToday, isYesterday } from 'date-fns';

export const formatMessageTime = (timestamp: string) => {
  const date = new Date(timestamp);

  if (isToday(date)) {
    return format(date, 'p'); // e.g., "10:30 AM"
  }

  if (isYesterday(date)) {
    return 'Yesterday';
  }

  return format(date, 'dd/MM/yyyy'); // e.g., "15/01/2025"
};
