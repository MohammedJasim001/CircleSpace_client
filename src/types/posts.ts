export interface Comment {
    _id: string;
    author: {
      userName: string;
      profileImage: string;
    };
    text: string;
  }
  interface Author {
    _id: string;
    userName: string;
    profileImage: string;
  }
  
  export interface Post {
    author: string;
    content: string;
    description: string;
    likes: string[];
    _id: string;
    comments: Comment[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface PostResponse {
    message: string;
    data: Post;
  }
  
  export interface CreatePostResponse {
    message: string;
    data: Post;
  }
  
  export interface GetPostResponse {
    _id: string;
    author: Author;
    image: string;
    description: string;
    likes: string[];
    comments: Comment[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface GetuniquePostResponse {
    _id: string;
    content: string;
    description: string;
    createdAt: string;
    likes: string[];
    author: {
      _id: string;
      username: string;
      profileImage: string;
    };
    comments: Comment[];
  }
  
  // export interface Comment {
  //   _id: string;
  //   content: string;
  //   createdAt: string;
  //   author: {
  //     _id: string;
  //     userName: string;
  //     profilImage: string;
  //   };
  //   replies: Reply[];
  // }
  
  export interface Reply {
    _id: string;
    content: string;
    createdAt: string;
    author: {
      _id: string;
      username: string;
      profilePicture: string;
    };
  }