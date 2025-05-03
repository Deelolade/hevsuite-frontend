// utils/formatDate.ts
import { format } from 'date-fns';

export const formatDateWithSuffix = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'do MMMM, yyyy'); // Example: 2nd June, 2025
  };

export const formatTime = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'hh:mmaaa').toLowerCase(); // Example: 10:00pm
  };