import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ArticleService } from 'src/app/service/article.service';
import { AuthService } from 'src/app/service/auth.service';
import { Article } from './../../shared/model/article.model';
import { HomeArticleService } from './../../service/home-article.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
  @Input() tags: any;
  limit: number = 1;
  offset: number = 0;
  totalPages: any;
  pages!: number;
  list: Article[] = [];
  isLoading: boolean = false;
  pageNumbers: number[] = [];
  currentPage: number = 1;
  pageIndexSub$!: Subscription;

  constructor(
    private getArticle: HomeArticleService,
    private authService: AuthService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.limit = this.authService.getPage();
    this.isLoading = true;
    this.getArticle
      .getTagFeed(this.tags, this.offset, this.limit)
      .subscribe((data) => {
        this.isLoading = false;
        this.totalPages = data.articlesCount;
        if (this.totalPages <= 1) {
          this.pages = 0;
        } else {
          this.pageNumbers = [];
          this.pages = Math.ceil(this.totalPages / this.limit);
          for (let i = 1; i <= this.pages; i++) {
            this.pageNumbers.push(i);
          }
        }
        this.list = data.articles;
      });

    this.pageIndexSub$ = this.articleService.pageIndexSub
      .pipe(
        switchMap((pageIndex) => {
          this.isLoading = true;
          this.currentPage = pageIndex + 1;
          return this.getArticle.getTagFeed(
            this.tags,
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
}
