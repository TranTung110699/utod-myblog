import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedRoutingModule } from './shared-routing.module';

import { ArticleComponent } from './component/articles-list/article/article.component';
import { ArticlesListComponent } from './component/articles-list/articles-list.component';
import { ArticleDetailComponent } from './component/article-detail/article-detail.component';
import { CommentComponent } from './component/article-detail/comment/comment.component';
import { CommentItemComponent } from './component/article-detail/comment-item/comment-item.component';
import { CommentListComponent } from './component/article-detail/comment-list/comment-list.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { LoadingSpinnerComponent } from './component/loading-spinner/loading-spinner.component';
import { ArticleTagComponent } from './component/articles-list/article/article-tag/article-tag.component';
import { TruncatePipe } from './pipe/truncate.pipe';
import { PreloaderComponent } from './component/preloader/preloader.component';
import { AlertComponent } from './component/alert/alert.component';
import { WidgetAboutComponent } from './component/extension/widget-about/widget-about.component';
import { NewsletterComponent } from './component/extension/newsletter/newsletter.component';
import { HeroCarouselComponent } from './component/extension/hero-carousel/hero-carousel.component';
import { PopularPostsComponent } from './component/extension/popular-posts/popular-posts.component';
import { TagListComponent } from './component/extension/tag-list/tag-list.component';
import { DebounceClickDirective } from './directive/debounce-click.directive';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { BreaklinePipe } from './pipe/breakline.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoadingPostComponent } from './component/loading-post/loading-post.component';
@NgModule({
  declarations: [
    ArticlesListComponent,
    ArticleDetailComponent,
    CommentComponent,
    ArticleComponent,
    CommentItemComponent,
    CommentListComponent,
    PaginationComponent,
    LoadingSpinnerComponent,
    ArticleTagComponent,
    TruncatePipe,
    PreloaderComponent,
    AlertComponent,
    WidgetAboutComponent,
    NewsletterComponent,
    HeroCarouselComponent,
    PopularPostsComponent,
    TagListComponent,
    DebounceClickDirective,
    PageNotFoundComponent,
    BreaklinePipe,
    LoadingPostComponent,
  ],
  imports: [CommonModule, SharedRoutingModule, NgxPaginationModule],
  exports: [
    CommonModule,
    CommentComponent,
    ArticlesListComponent,
    ArticleDetailComponent,
    ArticleComponent,
    LoadingSpinnerComponent,
    PaginationComponent,
    PreloaderComponent,
    AlertComponent,
    WidgetAboutComponent,
    NewsletterComponent,
    HeroCarouselComponent,
    PopularPostsComponent,
    DebounceClickDirective,
    PageNotFoundComponent,
    BreaklinePipe,
    LoadingPostComponent,
  ],
})
export class SharedModule {}
