import { Article } from './../../model/article.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {
  @Input() listArticles : Article[] = []
  constructor() { }

  ngOnInit(): void {

  }

}
