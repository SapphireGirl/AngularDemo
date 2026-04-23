import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICatalogCategory } from './models/catalog-category.model';
import { ICatalogItem } from './models/catalog-item.model';

@Injectable({
    providedIn: 'root'
})
export class CatalogRepositoryService {
    private readonly apiUrl = 'http://localhost:3000/api/catalog';

    constructor(private http: HttpClient) { }

    getCatalogCategories(): Observable<ICatalogCategory[]> {
        return this.http.get<ICatalogCategory[]>(`${this.apiUrl}/categories`);
    }

    getCatalogItemsByCategory(categoryId: number): Observable<ICatalogItem[]> {
        return this.http.get<ICatalogItem[]>(`${this.apiUrl}/categories/${categoryId}/items`);
    }
}
