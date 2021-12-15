import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/service/article.service';
import { CanComponentDeactivate } from 'src/app/shared/guards/can-deactivate-guard.service';
import { ArticlePost } from 'src/app/shared/model/article.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  @Input() article?: any;
  errors: string[] = [];
  editFlag = false;
  title!: string;
  description!: string;
  content!: string;
  tags!: string;
  articleEditorForm!: FormGroup;
  testTags!: string;
  listTags: string[] = [];

  changeFlag = false;
  @Output() change = new EventEmitter<boolean>();
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.article !== undefined) {
      this.editFlag = true;
      this.title = this.article.title;
      this.description = this.article.description;
      this.content = this.article.body;
      this.listTags = this.article.tagList;
    }
    this.articleEditorForm = this.fb.group({
      title: [this.title, Validators.required],
      description: [this.description, Validators.required],
      content: [this.content, Validators.required],
      tags: [this.listTags],
    });
    this.change.emit(false);

    this.articleEditorForm.valueChanges.subscribe(() => {
      if (this.changeFlag) {
        this.change.emit(true);
      }
      this.changeFlag = true;
    });
  }

  get form() {
    return this.articleEditorForm.controls;
  }

  handleForm(form: any) {
    this.change.emit(false);
    const formValue = {
      title: form.title,
      description: form.description,
      body: form.content,
      tagList: this.listTags,
    };

    Swal.fire({
      title: 'Are you sure?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#273043',
      cancelButtonColor: '#DC3545',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        if (this.editFlag) {
          this.editArticle(formValue, this.article.slug);
        } else {
          this.postArticle(formValue);
        }
      }
    });
  }

  postArticle(article: ArticlePost) {
    this.articleService.postNewArticle({ article: article }).subscribe(
      (data: any) => {
        this.isLoading = false;
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Post New Post success!!!',
        });
        this.router.navigate(['/article', data.article.slug]);
      },
      (err) => {
        this.isLoading = false;
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'error',
          title: 'Post New Post fail!!!',
        });
      }
    );
  }

  editArticle(article: ArticlePost, articleSlug: string) {
    this.articleService
      .editArticle({ article: article }, articleSlug)
      .subscribe(
        (data) => {
          this.isLoading = false;
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: 'success',
            title: 'Edit Post success!!!',
          });
          this.router.navigate(['/article', data.article.slug]);
        },
        (err) => {
          this.isLoading = false;
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: 'error',
            title: 'Edit Post fail!!!',
          });
        }
      );
  }

  enterTags() {
    if (!this.testTags) {
      return;
    }
    this.listTags.push(this.testTags);
    this.testTags = '';
  }

  delTags(msg: string) {
    const index: number = this.listTags.indexOf(msg);
    if (index !== -1) {
      this.listTags.splice(index, 1);
    }
  }
}
