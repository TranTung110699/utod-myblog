import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/service/article.service';
import { Article } from 'src/app/shared/model/article.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css'],
})
export class EditArticleComponent implements OnInit {
  article!: Article;
  articleSlug!: string;
  isLoading!: boolean;

  changesInput!: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService
  ) {
    this.articleSlug = this.activatedRoute.snapshot.params?.['slug'];
  }

  ngOnInit(): void {
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
        this.isLoading = false;
      }
    );
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.changesInput) {
      return Swal.fire({
        text: 'Do you want to discard the changes?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#273043',
        cancelButtonColor: '#DC3545',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          return true;
        } else {
          return false;
        }
      });
    }

    return true;
  }
}
