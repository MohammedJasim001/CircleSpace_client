
export interface User {
    _id: string;
    username: string;
    email: string;
    password?: string;
    bio?: string;
    profilePicture?: string;
    followers: string[];
    following: string[];
    posts: string[];
    likedPosts: string[];
    comments: string[];
    archivedStories: string[];
    createdAt: Date;
    updatedAt: Date;
    __v?: number;
  }
  export interface FollowResponse {
    message: string;
    data: User;
  }
  export interface LikeResponse{
    message:string;
  }