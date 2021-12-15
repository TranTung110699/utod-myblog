import { Profile } from './profile.model';

export interface Comment {
  id: number;
  body: string;
  createdAt: string;
  updatedAt: string;
  author: Profile;
}

export interface CommentPost {
  comment: {
    body: string;
  };
}

export interface CommentSingle {
  comment: Comment;
}

export interface CommentsData {
  comments: Comment[];
}
