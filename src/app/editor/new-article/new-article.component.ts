import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/shared/guards/can-deactivate-guard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css'],
})
export class NewArticleComponent implements OnInit, CanComponentDeactivate {
  changesInput!: boolean;
  constructor() {}

  ngOnInit(): void {}
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.changesInput) {
      return Swal.fire({
        text: 'Do you want to discard the changes?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#273043',
        cancelButtonColor: '#DC3545',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          return true;
        } else {
          return false;
        }
      });
    }

    return true;
  }
}
