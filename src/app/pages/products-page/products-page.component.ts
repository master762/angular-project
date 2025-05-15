import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from "../../components/products/products.component";


interface FilterItem {
  name: string;
  count: number;
  checked: boolean;
  visible: boolean;
}

interface FilterSection {
  title: string;
  isOpen: boolean;
  items: FilterItem[];
  searchText: string;
}
@Component({
  selector: 'app-products-page',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, ProductsComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent {
  sections: FilterSection[] = [
    {
      title: 'Brand',
      isOpen: true,
      items: [
        { name: 'Apple', count: 110, checked: false, visible: true },
        { name: 'Samsung', count: 125, checked: false, visible: true },
        { name: 'Xiaomi', count: 68, checked: false, visible: true },
        { name: 'Poco', count: 44, checked: false, visible: true },
        { name: 'OPPO', count: 36, checked: false, visible: true },
        { name: 'Honor', count: 10, checked: false, visible: true },
        { name: 'Motorola', count: 34, checked: false, visible: true },
        { name: 'Nokia', count: 22, checked: false, visible: true },
        { name: 'Realme', count: 35, checked: false, visible: true }
      ],
      searchText: ''
    },
    {
      title: 'Battery capacity',
      isOpen: false,
      items: [ { name: 'Realme', count: 35, checked: false, visible: true }, { name: 'Realme', count: 35, checked: false, visible: true }, { name: 'Realme', count: 35, checked: false, visible: true }],
      searchText: ''
    },
     {
      title: 'Screen type',
      isOpen: false,
      items: [ { name: 'Realme', count: 35, checked: false, visible: true }, { name: 'Realme', count: 35, checked: false, visible: true }, { name: 'Realme', count: 35, checked: false, visible: true }],
      searchText: ''
    },
     {
      title: 'Battery capacity',
      isOpen: false,
      items: [ { name: 'Realme', count: 35, checked: false, visible: true }, { name: 'Realme', count: 35, checked: false, visible: true }, { name: 'Realme', count: 35, checked: false, visible: true }],
      searchText: ''
    },
     {
      title: 'Protection class',
      isOpen: false,
      items: [ { name: 'Realme', count: 35, checked: false, visible: true }, { name: 'Realme', count: 35, checked: false, visible: true }, { name: 'Realme', count: 35, checked: false, visible: true }],
      searchText: ''
    },
     {
      title: 'Built-in memory',
      isOpen: false,
      items: [ { name: 'Realme', count: 35, checked: false, visible: true }, { name: 'Realme', count: 35, checked: false, visible: true }, { name: 'Realme', count: 35, checked: false, visible: true }],
      searchText: ''
    },
  ];

  toggleSection(section: FilterSection): void {
    section.isOpen = !section.isOpen;
  }

  toggleItem(item: FilterItem): void {
    item.checked = !item.checked;
  }

  filterItems(section: FilterSection): void {
    const searchTerm = section.searchText.toLowerCase();
    section.items.forEach(item => {
      item.visible = item.name.toLowerCase().includes(searchTerm);
    });
  }

  hasNoVisibleItems(section: FilterSection): boolean {
    return section.items.length > 0 && section.items.every(item => !item.visible);
  }
}

