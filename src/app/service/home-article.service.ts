import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleData } from '../shared/model/article.model';

@Injectable({
  providedIn: 'root',
})
export class HomeArticleService {
  private readonly API_URL = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient) {}

  // Get most recent articles globally
  getGlobalFeed(offset: number = 0, limit: number = 20) {
    return this.http.get<ArticleData>(
      `${this.API_URL}/articles/?limit=${limit}&offset=${offset}`
    );
  }

  // Get multiple articles created by followed users
  getUserFeed(offset: number = 0, limit: number = 20) {
    return this.http.get<ArticleData>(
      `${this.API_URL}/articles/feed/?limit=${limit}&offset=${offset}`
    );
  }

  // Get articles by author name
  getAuthorArticles(
    username: string | undefined,
    offset: number = 0,
    limit: number = 20
  ) {
    return this.http.get<ArticleData>(
      `${this.API_URL}/articles/?author=${username}&limit=${limit}&offset=${offset}`
    );
  }

  // Get articles by favorited author
  getAuthorFavArticles(
    username: string,
    offset: number = 0,
    limit: number = 20
  ) {
    return this.http.get<ArticleData>(
      `${this.API_URL}/articles/?favorited=${username}&limit=${limit}&offset=${offset}`
    );
  }

  // Get articles by tag
  getTagFeed(tag: string, offset: number, limit: number) {
    return this.http.get<ArticleData>(
      `${this.API_URL}/articles/?tag=${tag}&limit=${limit}&offset=${offset}`
    );
  }

  // Get tag list
  getTagList() {
    return this.http.get<any>(`${this.API_URL}/tags`);
  }
}
