export interface Reply {
    author: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
  }
  
  export interface CommentData {
    author: {
        _id:string;
        userName:string;
        profileImage:string
    };
    content: string;
    post: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface CreateCommentResponse {
    message: string;
    data: CommentData;
  }