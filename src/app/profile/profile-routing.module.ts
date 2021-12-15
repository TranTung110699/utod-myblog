import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileAuthorComponent } from './profile-article/profile-author/profile-author.component';
import { ProfileFavoriteComponent } from './profile-article/profile-favorite/profile-favorite.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: ProfileAuthorComponent,
      },
      {
        path: 'favorite',
        component: ProfileFavoriteComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
