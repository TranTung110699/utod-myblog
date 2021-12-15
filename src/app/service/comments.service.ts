import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Article, ArticleData } from '../shared/model/article.model';
import {
  CommentPost,
  CommentsData,
  CommentSingle,
} from '../shared/model/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly API_URL = 'https://conduit.productionready.io/api';

  deleteEvent = new Subject<number>();

  constructor(private http: HttpClient) {}

  // Show all comments of public articles
  getArticle() {
    return this.http.get<ArticleData>( `${this.API_URL}/articles`);
  }

  // Get comments from an article
  getArticleComments(slug: string) {
    return this.http.get<CommentsData>(
      `${this.API_URL}/articles/${slug}/comments`
    );
  }

  // Add comment to an article
  postArticleComment(slug: string, comment: CommentPost) {
    return this.http.post<CommentSingle>(
      `${this.API_URL}/articles/${slug}/comments`,
      comment
    );
  }

  // Delete comment from an article
  deleteArticleComment(slug: string, commentId: number) {
    return this.http.delete<CommentSingle>(
      `${this.API_URL}/articles/${slug}/comments/${commentId}`
    );
  }
}
