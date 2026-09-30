import { Service, signal } from '@angular/core';

@Service()
export class AppState {
  isLoading = signal(false);
}
