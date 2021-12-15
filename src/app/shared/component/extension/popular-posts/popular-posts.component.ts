import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-popular-posts',
  templateUrl: './popular-posts.component.html',
  styleUrls: ['./popular-posts.component.css'],
})
export class PopularPostsComponent implements OnInit {
  @Input() mostLike: any;
  constructor() { }

  ngOnInit(): void { }
}
