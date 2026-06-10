import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

import { CatalogRepositoryService } from './catalog-repository.service';
import { ICatalogCategory } from './models/catalog-category.model';
import { ICatalogItem } from './models/catalog-item.model';

@Injectable({
    providedIn: 'root'
})
export class CatalogService {
    private readonly itemsByCategory = new Map<number, ICatalogItem[]>();

    constructor(private catalogRepository: CatalogRepositoryService) { }

    getCatalogCategories(): Observable<ICatalogCategory[]> {
        return this.catalogRepository.getCatalogCategories();
    }

    getCatalogItemsByCategory(categoryId: number): Observable<ICatalogItem[]> {
        const cachedItems = this.itemsByCategory.get(categoryId);
        if (cachedItems) {
            return of(cachedItems);
        }

        return this.catalogRepository.getCatalogItemsByCategory(categoryId).pipe(
            tap((items) => this.itemsByCategory.set(categoryId, items))
        );
    }

    getCachedCatalogItems(categoryId: number): ICatalogItem[] | null {
        return this.itemsByCategory.get(categoryId) ?? null;
    }

    clearCatalogItemCache(): void {
        this.itemsByCategory.clear();
    }
}
