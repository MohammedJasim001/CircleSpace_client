import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

interface Message {
    _id: string;
    sender: { _id: string };
    receiver: string;
    content: string;
    createdAt: Date;
  }

export const formatMessageDate = (date: Date): string => {
  const messageDate = dayjs(date);
  
  if (messageDate.isToday()) {
    return "Today";
  } else if (messageDate.isYesterday()) {
    return "Yesterday";
  }
  
  return messageDate.format("DD/MM/YYYY");
};

export const formatMessageTime = (date: Date): string => {
  return dayjs(date).format("hh:mm A");
};

export const groupMessagesByDate = (messages: Message[]) => {
  const grouped: Record<string, Message[]> = {};

  messages.forEach((message) => {
    const dateLabel = formatMessageDate(message.createdAt);

    if (!grouped[dateLabel]) {
      grouped[dateLabel] = [];
    }

    grouped[dateLabel].push(message);
  });

  return grouped;
};