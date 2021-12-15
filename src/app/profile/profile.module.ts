import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileFavoriteComponent } from './profile-article/profile-favorite/profile-favorite.component';
import { ProfileAuthorComponent } from './profile-article/profile-author/profile-author.component';
import { ProfileArticleComponent } from './profile-article/profile-article.component';

import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileArticleComponent,
    ProfileFavoriteComponent,
    ProfileAuthorComponent,
  ],
  imports: [ProfileRoutingModule, SharedModule],
  // exports: [],
})
export class ProfileModule {}
