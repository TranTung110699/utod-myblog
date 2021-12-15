import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeArticleService } from '../service/home-article.service';
import { Article, ArticleData } from '../shared/model/article.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tagMode = false;
  ViewMode: 'global' | 'tags' | 'feed' = 'global';
  tags: string[] = [];
  tagsValue = '';
  mostLikes: any[] = [];
  public screenWidth: any;
  public screenHeight: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private getArticle: HomeArticleService
  ) {}

  ngOnInit(): void {
    this.getArticle.getGlobalFeed().subscribe((data: any) => {
      this.mostLikes = data.articles
        .sort((a: any, b: any) => {
          return a.favoritesCount - b.favoritesCount;
        })
        .reverse();
    });

    this.getArticle.getTagList().subscribe((tagData) => {
      this.tags = tagData.tags;
    });
  }

  changeViewMode() {
    this.tagMode = false;
    this.ViewMode = 'global';
  }

  sendTag(value: string): void {
    if (this.auth.isLoggedIn()) {
      this.tagsValue = value;
      this.tagMode = true;
      this.ViewMode = 'tags';
      if (window.innerWidth > 767) {
        window.scrollTo(0, 600);
      } else if (window.innerWidth <= 767) {
        window.scrollTo(0, 200);
      }
    } else {
      return;
    }
  }

  changeFeedMode() {
    if (this.auth.isLoggedIn()) {
      this.tagMode = false;
      this.ViewMode = 'feed';
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
}
