import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appDebounceClick]',
})
export class DebounceClickDirective implements OnInit, OnDestroy {
  @Input() debounceTime = 250;
  @Output() debounceClick = new EventEmitter(); // Create custom event on DOM elements and components
  private clicks = new Subject();
  private subscription!: Subscription;

  constructor() {}

  ngOnInit() {
    this.subscription = this.clicks
      .pipe(debounceTime(this.debounceTime))
      .subscribe((e) => this.debounceClick.emit(e)); // Delay to emit the click event
  }

  @HostListener('click', ['$event']) // This decorator allows to listen to events on the Host Element
  clickEvent(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
    // console.log('Click from Host Element!');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
