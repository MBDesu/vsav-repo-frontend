import { Component, OnInit, NgZone } from '@angular/core';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/overlay';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent implements OnInit {

  windowScrolled: boolean;
  scrollData: CdkScrollable;
  readonly OFFSET_TO_SHOW = 100;

  constructor(private scrollDispatcher: ScrollDispatcher, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.scrollDispatcher.scrolled().subscribe((data: CdkScrollable) => this.ngZone.run<void>(() => this.onWindowScroll(data)));
  }

  onWindowScroll(scrollData: CdkScrollable): void {
    this.scrollData = scrollData;
    const scrollPos = scrollData.getElementRef().nativeElement.scrollTop || 0;
    const yFromBottom = scrollData.measureScrollOffset('bottom');
    this.windowScrolled = scrollPos >= this.OFFSET_TO_SHOW && yFromBottom >= 100;
  }

  scrollToTop(): void {
    this.scrollData.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
