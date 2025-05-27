import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterLink, RouterOutlet],
})
export class HeaderComponent {
  isModalOpen = false;

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
    document.body.style.overflow = this.isModalOpen ? 'hidden' : '';
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent): void {
    if (this.isModalOpen) {
      this.toggleModal();
    }
  }
}
