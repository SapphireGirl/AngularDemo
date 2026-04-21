import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICatalogItem } from '../services/models/catalog-item.model';
import { CatalogRepositoryService } from '../services/catalog-repository.service';

@Component({
    selector: 'app-catalog',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './catalog.component.html',
    styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {
    items: ICatalogItem[] = [];
    isLoading = false;
    errorMessage = '';

    constructor(private catalogRepository: CatalogRepositoryService) { }

    ngOnInit(): void {
        this.loadCatalog();
    }

    loadCatalog(): void {
        this.isLoading = true;
        this.errorMessage = '';

        this.catalogRepository.getCatalogItems().subscribe({
            next: (items) => {
                this.items = items;
                this.isLoading = false;
            },
            error: () => {
                this.errorMessage = 'Unable to load the catalog right now. Please try again.';
                this.isLoading = false;
            }
        });
    }
}
