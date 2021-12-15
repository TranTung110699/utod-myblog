import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ArticleService } from 'src/app/service/article.service';
import { AuthService } from 'src/app/service/auth.service';
import { HomeArticleService } from 'src/app/service/home-article.service';
import { Article } from 'src/app/shared/model/article.model';

@Component({
  selector: 'app-profile-author',
  templateUrl: './profile-author.component.html',
  styleUrls: ['./profile-author.component.css'],
})
export class ProfileAuthorComponent implements OnInit {
  userName!: string;
  articles!: Article[];
  limit = 2; // limit, can changes by settings.
  offset = 0;
  totalPages: number[] = [];
  pageIndexSub$!: Subscription;
  pageIndex!: number;
  isLoading: boolean = false;
  currentPage: number = 1;

  emptyPage: boolean = false;
  constructor(
    private homeArticleService: HomeArticleService,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.limit = this.authService.getPage();
    this.isLoading = true;
    this.route.params
      .pipe(
        switchMap((data) => {
          this.userName = data['username'];
          return this.homeArticleService.getAuthorArticles(
            this.userName,
            this.offset,
            this.limit
          );
        })
      )
      .subscribe((data) => {
        this.isLoading = false;
        this.articles = data.articles;
        const articlesCount = data.articlesCount;
        this.emptyPage = articlesCount === 0 ? true : false;
        this.totalPages = [];
        const numberPages = Math.ceil(articlesCount / this.limit);
        for (let i = 1; i <= numberPages; i++) {
          this.totalPages.push(i);
        }
      });

    this.pageIndexSub$ = this.articleService.pageIndexSub
      .pipe(
        switchMap((pageIndex) => {
          this.isLoading = true;
          this.currentPage = pageIndex + 1;
          return this.homeArticleService.getAuthorArticles(
            this.userName,
            pageIndex * this.limit,
            this.limit
          );
        })
      )
      .subscribe((data) => {
        this.isLoading = false;
        this.articles = data.articles;
      });
  }

  ngOnDestroy(): void {
    this.pageIndexSub$.unsubscribe();
  }
}
