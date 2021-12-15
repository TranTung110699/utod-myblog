import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { Article } from 'src/app/shared/model/article.model';

@Component({
  selector: 'app-profile-article',
  templateUrl: './profile-article.component.html',
  styleUrls: ['./profile-article.component.css'],
})
export class ProfileArticleComponent implements OnInit {
  @Input() authorName: string | undefined;

  username!: string;
  articles!: Article[];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.getUserName();
  }
}
