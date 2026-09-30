import { Service } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Service()
export class ScreenService {
  // Tailwind CSS breakpoints (match these to your Tailwind config if customized)
  private breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  };

  private widthSubject = new BehaviorSubject<number>(window.innerWidth);

  constructor() {
    // Add event listener for screen resize
    window.addEventListener('resize', this.updateWidth.bind(this));
    // Initialize with the current width
    this.updateWidth();
  }

  private updateWidth(): void {
    this.widthSubject.next(window.innerWidth);
  }

  // Getter to expose the current width as an observable
  get width$() {
    return this.widthSubject.asObservable();
  }

  get isMobile(): boolean {
    const width = this.widthSubject.value;
    return width < this.breakpoints.lg;
  }

  // Individual getters for breakpoints
  get isSm(): boolean {
    const width = this.widthSubject.value;
    return width <= this.breakpoints.sm;
  }

  get isMd(): boolean {
    const width = this.widthSubject.value;
    return width < this.breakpoints.md;
  }

  get isLg(): boolean {
    const width = this.widthSubject.value;
    return width <= this.breakpoints.lg;
  }

  get isXl(): boolean {
    const width = this.widthSubject.value;
    return width <= this.breakpoints.xl;
  }
}
