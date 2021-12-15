import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { UserInfo } from 'src/app/shared/model/user.model';

@Component({
  selector: 'app-widget-about',
  templateUrl: './widget-about.component.html',
  styleUrls: ['./widget-about.component.css'],
})
export class WidgetAboutComponent implements OnInit {
  user!: UserInfo;
  constructor() {}

  ngOnInit(): void {}
}
