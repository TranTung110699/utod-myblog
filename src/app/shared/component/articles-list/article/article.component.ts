import { ArticleService } from './../../../../service/article.service';
import { AuthService } from './../../../../service/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  @Input() article: any;
  tagLists: string[] = [];
  favorited!: boolean;
  listImg = [
    '../../../../../assets/images/post/post1.webp',
    '../../../../../assets/images/post/post2.webp',
    '../../../../../assets/images/post/post3.webp',
    '../../../../../assets/images/post/post4.webp',
    '../../../../../assets/images/post/post5.webp',
    '../../../../../assets/images/post/post6.webp',
    '../../../../../assets/images/post/post7.webp',
    '../../../../../assets/images/post/post8.webp',
  ];
  img: string = '';
  constructor(
    private auth: AuthService,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.favorited = this.article.favorited;
    this.tagLists = this.article.tagList;
    this.img = this.listImg[Math.floor(Math.random() * this.listImg.length)];
  }

  onLike(value: any) {
    if (this.auth.isLoggedIn()) {
      this.articleService.favoriteArticle(value).subscribe((data) => {
        this.article = data.article;
        this.favorited = true;
        this.articleService.likeSub.next();
      });
    } else {
      Swal.fire({
        title: 'You must login !!!',
        confirmButtonText: 'Go to login',
        confirmButtonColor: '#ff416c',
        timer: 2500,
        timerProgressBar: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl('/auth/login');
        }
      });
    }
  }

  get isLogin() {
    return this.auth.isLoggedIn();
  }

  onUnLike(value: any) {
    if (this.auth.isLoggedIn()) {
      this.articleService.unfavoriteArticle(value).subscribe((data) => {
        this.article = data.article;
        this.favorited = false;
        this.articleService.likeSub.next();
      });
    } else {
      this.router.navigateByUrl('login');
    }
  }
}
