import { Profile } from './profile.model';
import { Comment } from './comment.model';


export interface ArticlePost {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface Article extends ArticlePost {
  slug: string;
  createdAt: string;
  updatedAt: string;
  favorited: string;
  favoritesCount: string;
  author: Profile;
  comments: Comment[];
}

export interface ArticleObj {
  article: Article;
}

export interface ArticleData {
  articles: Article[];
  articlesCount: number;
}
