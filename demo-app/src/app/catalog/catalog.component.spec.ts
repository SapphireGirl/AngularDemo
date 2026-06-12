import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { CatalogComponent } from './catalog.component';
import { CatalogService } from '../services/catalog.service';
import { ICatalogCategory } from '../services/models/catalog-category.model';
import { ICatalogItem } from '../services/models/catalog-item.model';

const MOCK_CATEGORIES: ICatalogCategory[] = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Books' }
];

const MOCK_ITEMS: ICatalogItem[] = [
    { id: 10, title: 'Widget', description: 'A widget.', category: 'Electronics', price: 19.99, imageName: 'widget.png' },
    { id: 11, title: 'Gadget', description: 'A gadget.', category: 'Electronics', price: 29.99, imageName: 'gadget.png' }
];

describe('CatalogComponent', () => {
    let fixture: ComponentFixture<CatalogComponent>;
    let component: CatalogComponent;
    let mockCatalogService: jasmine.SpyObj<CatalogService>;
    let cachedByCategory: Map<number, ICatalogItem[]>;

    beforeEach(async () => {
        cachedByCategory = new Map<number, ICatalogItem[]>();
        mockCatalogService = jasmine.createSpyObj('CatalogService', [
            'getCatalogCategories',
            'getCatalogItemsByCategory',
            'getCachedCatalogItems',
            'clearCatalogItemCache'
        ]);
        mockCatalogService.getCatalogCategories.and.returnValue(of(MOCK_CATEGORIES));
        mockCatalogService.getCatalogItemsByCategory.and.callFake((categoryId: number) => {
            cachedByCategory.set(categoryId, MOCK_ITEMS);
            return of(MOCK_ITEMS);
        });
        mockCatalogService.getCachedCatalogItems.and.callFake((categoryId: number) => cachedByCategory.get(categoryId) ?? null);
        mockCatalogService.clearCatalogItemCache.and.callFake(() => cachedByCategory.clear());

        await TestBed.configureTestingModule({
            declarations: [CatalogComponent],
            imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule],
            providers: [{ provide: CatalogService, useValue: mockCatalogService }]
        }).compileComponents();

        fixture = TestBed.createComponent(CatalogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load categories on init', () => {
        expect(mockCatalogService.getCatalogCategories).toHaveBeenCalledTimes(1);
        expect(mockCatalogService.clearCatalogItemCache).toHaveBeenCalledTimes(1);
        expect(component.categories).toEqual(MOCK_CATEGORIES);
        expect(component.isLoading).toBeFalse();
    });

    it('should fetch items when a category card is clicked', () => {
        component.toggleCategory(1);

        expect(mockCatalogService.getCatalogItemsByCategory).toHaveBeenCalledOnceWith(1);
        expect(component.selectedCategoryId).toBe(1);
        expect(component.loadingCategoryId).toBeNull();
    });

    it('should collapse when the same category is clicked again', () => {
        component.toggleCategory(1);
        component.toggleCategory(1);

        expect(component.selectedCategoryId).toBeNull();
        expect(component.itemsErrorMessage).toBe('');
    });

    it('should serve items from cache on re-opening a previously loaded category', () => {
        component.toggleCategory(1);  // fetch
        component.toggleCategory(1);  // collapse
        component.toggleCategory(1);  // re-open — should hit cache

        expect(mockCatalogService.getCatalogItemsByCategory).toHaveBeenCalledTimes(1);
        expect(component.loadingCategoryId).toBeNull();
    });

    it('should set an error message when the item fetch fails', () => {
        mockCatalogService.getCatalogItemsByCategory.and.returnValue(throwError(() => new Error('server error')));

        component.toggleCategory(2);

        expect(component.itemsErrorMessage).toBeTruthy();
        expect(component.loadingCategoryId).toBeNull();
    });

    it('should clear error and selected category when refreshing', () => {
        mockCatalogService.getCatalogItemsByCategory.and.returnValue(throwError(() => new Error('fail')));
        component.toggleCategory(1);

        component.loadCategories();

        expect(component.itemsErrorMessage).toBe('');
        expect(component.selectedCategoryId).toBeNull();
        expect(mockCatalogService.clearCatalogItemCache).toHaveBeenCalledTimes(2);
    });

    it('should report item count after items are loaded', () => {
        expect(component.getItemCount(1)).toBeNull();

        component.toggleCategory(1);

        expect(component.getItemCount(1)).toBe(MOCK_ITEMS.length);
    });

    it('should expose items for a loaded category', () => {
        component.toggleCategory(1);

        expect(component.getItemsForCategory(1)).toEqual(MOCK_ITEMS);
    });

    it('should return an empty array for a category that has not been loaded', () => {
        expect(component.getItemsForCategory(99)).toEqual([]);
    });

    it('isCategoryExpanded should return true only for the selected category', () => {
        component.toggleCategory(1);

        expect(component.isCategoryExpanded(1)).toBeTrue();
        expect(component.isCategoryExpanded(2)).toBeFalse();
    });

    it('should build an assets image path from imageName', () => {
        expect(component.getImageSrc('widget.png')).toBe('assets/images/widget.png');
    });

    it('should keep absolute image urls unchanged', () => {
        const absoluteUrl = 'https://cdn.example.com/images/widget.png';

        expect(component.getImageSrc(absoluteUrl)).toBe(absoluteUrl);
    });

    it('should keep existing assets paths unchanged', () => {
        const assetsPath = 'assets/images/widget.png';

        expect(component.getImageSrc(assetsPath)).toBe(assetsPath);
    });
});
