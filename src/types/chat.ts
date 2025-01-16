
export interface Chat {
  chatPartner: {
    _id: string;
    userName: string;
    profileImage: string;
  };
  latestMessage: string;
  timestamp: string;
  senderId: string;
}