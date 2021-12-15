import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ArticleObj, ArticlePost } from '../shared/model/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly API_URL = 'https://conduit.productionready.io/api';
  pageIndexSub = new Subject<number>();
  likeSub = new Subject();
  constructor(private http: HttpClient) {}

  // Get single article by slug
  getArticleBySlug(slug: string) {
    return this.http.get<ArticleObj>(`${this.API_URL}/articles/${slug}`);
  }

  // Creat the new article
  postNewArticle(article: { article: ArticlePost }) {
    return this.http.post<ArticleObj>(`${this.API_URL}/articles`, article);
  }

  // Update the article
  editArticle(article: { article: ArticlePost }, slug: string) {
    return this.http.put<ArticleObj>(
      `${this.API_URL}/articles/${slug}`,
      article
    );
  }

  // Delete the article
  deleteArticle(slug: string) {
    return this.http.delete<ArticleObj>(`${this.API_URL}/articles/${slug}`);
  }

  // Like the article
  favoriteArticle(slug: string) {
    return this.http.post<ArticleObj>(
      `${this.API_URL}/articles/${slug}/favorite`,
      {}
    );
  }

  // Unlike the article
  unfavoriteArticle(slug: string) {
    return this.http.delete<ArticleObj>(
      `${this.API_URL}/articles/${slug}/favorite`
    );
  }
}
