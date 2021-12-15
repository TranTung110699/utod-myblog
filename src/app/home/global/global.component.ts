import { switchMap } from 'rxjs/operators';
import { ArticleService } from './../../service/article.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HomeArticleService } from 'src/app/service/home-article.service';
import { Article, ArticleData } from 'src/app/shared/model/article.model';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css'],
})
export class GlobalComponent implements OnInit {
  list: Article[] = [];
  limit: number = 3;
  offset: number = 0;
  totalPages: any;
  pages!: number;
  pageNumbers: number[] = [];
  isLoading: boolean = false;
  actived: boolean = false;
  currentPage: number = 1;
  pageIndexSub$!: Subscription;
  constructor(
    private getArticle: HomeArticleService,
    private authService: AuthService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.limit = this.authService.getPage();

    this.isLoading = true;

    this.getArticle
      .getGlobalFeed(this.offset, this.limit)
      .subscribe((data: ArticleData) => {
        this.totalPages = data.articlesCount;
        if (this.totalPages <= 1) {
          this.pages = 0;
        } else {
          this.pages = Math.ceil(this.totalPages / this.limit);
          for (let i = 1; i <= this.pages; i++) {
            this.pageNumbers.push(i);
          }
        }
        this.isLoading = false;
        this.list = data.articles;
      });

    this.pageIndexSub$ = this.articleService.pageIndexSub
      .pipe(
        switchMap((pageIndex) => {
          this.isLoading = true;
          this.currentPage = pageIndex + 1;
          return this.getArticle.getGlobalFeed(
            pageIndex * this.limit,
            this.limit
          );
        })
      )
      .subscribe((data) => {
        this.isLoading = false;
        this.list = data.articles;
      });
  }

  ngOnDestroy(): void {
    this.pageIndexSub$.unsubscribe();
  }
}
