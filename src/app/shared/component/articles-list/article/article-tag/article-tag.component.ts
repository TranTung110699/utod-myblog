import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-article-tag',
  templateUrl: './article-tag.component.html',
  styleUrls: ['./article-tag.component.css'],
})
export class ArticleTagComponent implements OnInit {
  @Input() tag!: string;
  @Input() index!: number;
  constructor() {}

  ngOnInit(): void {}
}
