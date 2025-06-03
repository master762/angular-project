import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories = signal([
    { name: 'Phones', icon: '/img/Phones.svg' },
    { name: 'Smart Watches', icon: '/img/SmartWatches.svg' },
    { name: 'Cameras', icon: '/img/Cameras.svg' },
    { name: 'Headphones', icon: '/img/Headphones.svg' },
    { name: 'Computers', icon: '/img/Computers.svg' },
    { name: 'Gaming', icon: '/img/Gaming.svg' },
    { name: 'Tablets', icon: '/img/Tablets.svg' },
    { name: 'Drones', icon: '/img/Drones.svg' },
    { name: 'Smart Home', icon: '/img/SmartHome.svg' },
    { name: 'Accessories', icon: '/img/Accessories.svg' }
  ]);

  currentPosition = signal(0);
  visibleCategories = signal(6);

  visibleItems = computed(() => {
    const start = this.currentPosition();
    const end = start + this.visibleCategories();
    return this.categories().slice(start, end);
  });

  next() {
    if (this.currentPosition() + this.visibleCategories() < this.categories().length) {
      this.currentPosition.update(pos => pos + 1);
    }
  }

  prev() {
    if (this.currentPosition() > 0) {
      this.currentPosition.update(pos => pos - 1);
    }
  }

  flipArrow(img: string) {
    return img === '/img/navArrow.svg' ? 'scaleX(-1)' : 'none';
  }
}