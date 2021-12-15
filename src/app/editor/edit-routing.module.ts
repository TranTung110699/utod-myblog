import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard.service';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate-guard.service';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { EditComponent } from './edit.component';
import { NewArticleComponent } from './new-article/new-article.component';

const routes: Routes = [
  {
    path: '',
    component: EditComponent,
    children: [
      {
        path: '',
        component: NewArticleComponent,
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: ':slug',
        component: EditArticleComponent,
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditArticleRoutingModule {}
