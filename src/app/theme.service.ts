import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private lightTheme = new Subject<boolean>();
  isLightTheme = this.lightTheme.asObservable();

  constructor(private overlayContainer: OverlayContainer) {}

  setLightTheme(isLightTheme: boolean): void {
    localStorage.setItem('light-theme', JSON.stringify(isLightTheme));
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    if (isLightTheme) {
      overlayContainerClasses.add('light-theme');
    } else {
      overlayContainerClasses.remove('light-theme');
    }
    this.lightTheme.next(isLightTheme);
  }
}
