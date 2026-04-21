import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICatalogItem } from './models/catalog-item.model';

@Injectable({
    providedIn: 'root'
})
export class CatalogRepositoryService {
    private readonly apiUrl = 'http://localhost:3000/api/catalog';

    constructor(private http: HttpClient) { }

    getCatalogItems(): Observable<ICatalogItem[]> {
        return this.http.get<ICatalogItem[]>(this.apiUrl);
    }
}
