import { AuthService } from 'src/app/service/auth.service';
import { HomeArticleService } from './../../service/home-article.service';
import { Article } from './../../shared/model/article.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  list: Article[] = [];
  limit: number = 1;
  offset: number = 0;
  totalPages: any;
  pages!: number;
  pageNumbers: number[] = [];
  isLoading: boolean = false;

  emptyPage: boolean = false;
  constructor(
    private getArticle: HomeArticleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.limit = this.authService.getPage();
    this.isLoading = true;

    this.getArticle.getUserFeed().subscribe((data: any) => {
      this.totalPages = data.articlesCount;
      this.emptyPage = this.totalPages === 0 ? true : false;
      if (this.totalPages <= 1) {
        this.pages = 0;
      } else {
        this.pages = Math.ceil(this.totalPages / this.limit);
        for (let i = 1; i <= this.pages; i++) {
          this.pageNumbers.push(i);
        }
      }
    });

    this.getArticle
      .getUserFeed(this.offset, this.limit)
      .subscribe((data: any) => {
        this.isLoading = false;
        this.list = data.articles;
      });
  }

  changePage(value: number) {
    this.isLoading = true;
    if (value === 1) {
      this.getArticle
        .getUserFeed(this.offset, this.limit)
        .subscribe((data: any) => {
          this.isLoading = false;
          this.list = data.articles;
        });
    } else {
      this.getArticle
        .getUserFeed(this.limit * (value - 1), this.limit)
        .subscribe((data: any) => {
          this.isLoading = false;
          this.list = data.articles;
        });
    }
  }
}
