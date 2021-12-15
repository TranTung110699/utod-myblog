import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/service/article.service';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import { Article } from '../../model/article.model';
import { Profile } from '../../model/profile.model';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
})
export class ArticleDetailComponent implements OnInit {
  articleSlug!: string;
  article!: Article;
  isLoading!: boolean;

  preload: boolean = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.articleSlug = this.activatedRoute.snapshot.params?.['slug'];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.preload = false;
    }, 2000);

    this.getArticle();
  }

  getArticle() {
    this.isLoading = true;
    this.articleService.getArticleBySlug(this.articleSlug).subscribe(
      (data) => {
        this.article = data.article;
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.userService
          .getUserProfile(this.article.author.username)
          .subscribe((user) => {
            this.article.author;
            this.article.author = user.profile;
          });
        this.isLoading = false;
      }
    );
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  get currentUser(): string {
    return this.auth.getUserName();
  }

  editArticle(slug: string) {
    this.router.navigate(['editor', slug]);
  }

  deleteArticle(slug: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#273043',
      cancelButtonColor: '#DC3545',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.articleService.deleteArticle(slug).subscribe(
          () => {
            this.router.navigate(['/profile', this.currentUser]);
          },
          (err) => {
            console.log(err);
          }
        );
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#273043',
        });
      }
    });
  }

  favourite() {
    if (!this.auth.isLoggedIn()) {
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
      return;
    }
    this.articleService.favoriteArticle(this.article.slug).subscribe(
      (data) => {
        this.article = data.article;
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          iconHtml:
            '<i class="fas fa-heart" style="font-size: 15px; color:#fe4f70"></i>',
          title: 'Favourite !!!',
          customClass: {
            icon: 'no-border',
          },
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  unfavorite() {
    if (!this.auth.isLoggedIn()) {
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
      return;
    }
    this.articleService.unfavoriteArticle(this.article.slug).subscribe(
      (data) => {
        this.article = data.article;
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          iconHtml:
            '<i class="fas fa-heart-broken" style="font-size: 15px; color:#fe4f70"></i>',
          title: 'UnFavourite !!!',
          customClass: {
            icon: 'no-border',
          },
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  follow() {
    if (!this.auth.isLoggedIn()) {
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
      return;
    }
    this.userService.followUser(this.article.author.username).subscribe(
      (data: { profile?: Profile }) => {
        this.article.author = data.profile!;
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          iconHtml:
            '<i class="fas fa-user-plus" style="font-size: 15px; color:#fe4f70"></i>',
          title: 'Followed !!!',
          customClass: {
            icon: 'no-border',
          },
        });
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
  }

  unfollow() {
    if (!this.auth.isLoggedIn()) {
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
      return;
    }
    this.userService.unFollowUser(this.article.author.username).subscribe(
      (data) => {
        this.article.author = data.profile;
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          iconHtml:
            '<i class="fas fa-user-minus" style="font-size: 15px; color:#fe4f70"></i>',
          title: 'UnFollowed !!!',
          customClass: {
            icon: 'no-border',
          },
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
