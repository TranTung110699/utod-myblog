// import { DOCUMENT } from '@angular/common';
// import { Component, HostListener, Inject, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-footer',
//   templateUrl: './footer.component.html',
//   styleUrls: ['./footer.component.css'],
// })
// export class FooterComponent implements OnInit {
//   windowScrolled!: boolean;
//   constructor(@Inject(DOCUMENT) private document: Document) {}
//   @HostListener('window:scroll', [])
//   onWindowScroll() {
//     if (
//       window.pageYOffset ||
//       document.documentElement.scrollTop ||
//       document.body.scrollTop > 100
//     ) {
//       this.windowScrolled = true;
//     } else if (
//       (this.windowScrolled && window.pageYOffset) ||
//       document.documentElement.scrollTop ||
//       document.body.scrollTop < 10
//     ) {
//       this.windowScrolled = false;
//     }
//   }
//   scrollToTop() {
//     (function smoothscroll() {
//       var currentScroll =
//         document.documentElement.scrollTop || document.body.scrollTop;
//       if (currentScroll > 0) {
//         window.requestAnimationFrame(smoothscroll);
//         // window.scrollTo(0, currentScroll - currentScroll / 8);
//         window.scrollTo(0, 0);
//         // console.log(currentScroll - currentScroll / 8);
//       }
//     })();
//   }
//   ngOnInit(): void {}
// }

import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  // windowScrolled!: boolean;
  constructor(@Inject(DOCUMENT) private document: Document) {}
  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   if (
  //     window.pageYOffset ||
  //     document.documentElement.scrollTop ||
  //     document.body.scrollTop > 100
  //   ) {
  //     this.windowScrolled = true;
  //   } else if (
  //     (this.windowScrolled && window.pageYOffset) ||
  //     document.documentElement.scrollTop ||
  //     document.body.scrollTop < 10
  //   ) {
  //     this.windowScrolled = false;
  //   }
  // }
  scrollToTop() {
    // (function smoothscroll() {
    //   let currentScroll =
    //     document.documentElement.scrollTop || document.body.scrollTop;
    //   if (currentScroll > 0) {
    // window.requestAnimationFrame(smoothscroll);
    // window.scrollTo(0, currentScroll - currentScroll / 8);
    // console.log(currentScroll);
    // }
    window.scrollTo(0, 0);
    // })();
  }
  ngOnInit() {}
}
