import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/shared/model/comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent implements OnInit {
  @Input() comments!: Comment[];
  page: number = 1;

  constructor() {}

  ngOnInit(): void {}

  onScroll() {
    window.scrollTo(0, 680);
  }
}
