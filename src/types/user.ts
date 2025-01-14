
export interface User {
  profileImage: string;
  name: string;
  userName: string;
  bio: string;
  posts: { content: string }[];
  followers: {
    userName: string;
    _id: string;
    profileImage: string;
    followers: { _id: string }[];
  }[];
  following: {
    userName: string;
    _id: string;
    profileImage: string;
    followers: { _id: string }[];
  }[];
  _id: string;
}
  export interface FollowResponse {
    message: string;
    data: User;
  }
  export interface LikeResponse{
    message:string;
  }