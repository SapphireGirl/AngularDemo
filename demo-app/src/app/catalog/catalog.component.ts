import { Component, OnInit } from '@angular/core';
import { ICatalogCategory } from '../services/models/catalog-category.model';
import { ICatalogItem } from '../services/models/catalog-item.model';
import { CatalogService } from '../services/catalog.service';

@Component({
    selector: 'app-catalog',
    standalone: false,
    templateUrl: './catalog.component.html',
    styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {
    private readonly imageBasePath = 'assets/images/';
    categories: ICatalogCategory[] = [];
    isLoading = false;
    loadingCategoryId: number | null = null;
    categoriesErrorMessage = '';
    itemsErrorMessage = '';
    selectedCategoryId: number | null = null;

    constructor(private catalogService: CatalogService) { }

    ngOnInit(): void {
        this.loadCategories();
    }

    loadCategories(): void {
        this.isLoading = true;
        this.categoriesErrorMessage = '';
        this.itemsErrorMessage = '';
        this.selectedCategoryId = null;
        this.loadingCategoryId = null;
        this.catalogService.clearCatalogItemCache();

        this.catalogService.getCatalogCategories().subscribe({
            next: (categories) => {
                this.categories = categories;
                this.isLoading = false;
            },
            error: () => {
                this.categoriesErrorMessage = 'Unable to load categories right now. Please try again.';
                this.isLoading = false;
            }
        });
    }

    toggleCategory(categoryId: number): void {
        if (this.selectedCategoryId === categoryId) {
            this.selectedCategoryId = null;
            this.loadingCategoryId = null;
            this.itemsErrorMessage = '';
            return;
        }

        this.selectedCategoryId = categoryId;
        this.itemsErrorMessage = '';

        const cachedItems = this.catalogService.getCachedCatalogItems(categoryId);
        if (cachedItems) {
            this.loadingCategoryId = null;
            return;
        }

        this.loadingCategoryId = categoryId;

        this.catalogService.getCatalogItemsByCategory(categoryId).subscribe({
            next: () => {
                this.loadingCategoryId = null;
            },
            error: () => {
                this.itemsErrorMessage = 'Unable to load items for this category right now. Please try again.';
                this.loadingCategoryId = null;
            }
        });
    }

    isCategoryExpanded(categoryId: number): boolean {
        return this.selectedCategoryId === categoryId;
    }

    getItemsForCategory(categoryId: number): ICatalogItem[] {
        return this.catalogService.getCachedCatalogItems(categoryId) ?? [];
    }

    getItemCount(categoryId: number): number | null {
        const items = this.catalogService.getCachedCatalogItems(categoryId);
        return items ? items.length : null;
    }

    getImageSrc(imageName: string): string {
        if (/^https?:\/\//i.test(imageName) || imageName.startsWith('assets/')) {
            return imageName;
        }

        return `${this.imageBasePath}${imageName}`;
    }
}
