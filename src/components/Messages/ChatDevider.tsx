import React from 'react';

interface DateDividerProps {
  date: string;
}

const DateDivider: React.FC<DateDividerProps> = ({ date }) => {
  return (
    <div className="text-center text-gray-400 text-sm my-2">
      {date}
    </div>
  );
};

export default DateDivider;