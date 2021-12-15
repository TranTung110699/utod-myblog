import { Component, OnInit } from '@angular/core';
import { HomeArticleService } from '../../../../service/home-article.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css'],
})
export class TagListComponent implements OnInit {
  tagList!: string[];

  constructor(private homeArticleService: HomeArticleService) {}

  ngOnInit(): void {
    this.homeArticleService.getTagList().subscribe((tagData) => {
      this.tagList = tagData.tags;
    });
  }
}
