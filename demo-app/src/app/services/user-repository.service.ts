import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError, timer } from "rxjs";
import { map } from "rxjs/operators";
import { IUser } from "./models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserRepositoryService {
    private readonly tokenStorageKey = 'token';
    private readonly apiUrl = 'http://localhost:3000/api';
    currentUser: IUser | null = null;

    constructor(private http: HttpClient) { }

    saveUser(user: IUser): Observable<any> {
        let classes = user.classes || [];
        this.currentUser = { ...user, classes: [...classes] };

        return timer(1000);
    }

    enroll(classId: string): Observable<any> {
        if (!this.currentUser) {
            return throwError(() => new Error("User is not signed in"));
        }

        if (this.currentUser.classes.includes(classId)) {
            return throwError(() => new Error("User is already enrolled in this class"));
        }
        // concat creates a new array, so we can use the spread operator to add the classId
        // to the existing classes array without mutating it.
        this.currentUser = {
            ...this.currentUser,
            classes: this.currentUser.classes.concat(classId)
        };

        return timer(1000);
    }

    drop(classId: string): Observable<any> {

        if (!this.currentUser) {
            return throwError(() => new Error("User is not signed in"));
        }

        if (!this.currentUser.classes.includes(classId)) {
            return throwError(() => new Error("User is not enrolled in this class"));
        }

        this.currentUser = {
            ...this.currentUser,
            classes: this.currentUser?.classes.filter((c: string) => c !== classId)
        };

        return timer(1000);
    }

    signIn(credentials: any): Observable<any> {
        return this.http
            .post<{ token: string; user: IUser }>(`${this.apiUrl}/auth/login`, credentials)
            .pipe(
                map((response) => {
                    localStorage.setItem(this.tokenStorageKey, response.token);
                    this.currentUser = response.user;
                    return response.user;
                })
            );
    }

    signOut(): void {
        this.currentUser = null;
        localStorage.removeItem(this.tokenStorageKey);
    }

    isAuthenticated(): boolean {
        if (this.currentUser) {
            return true;
        }

        const token = localStorage.getItem(this.tokenStorageKey);
        if (!token) {
            return false;
        }

        const payload = this.readTokenPayload(token);
        if (!payload?.exp) {
            return false;
        }

        const nowSeconds = Math.floor(Date.now() / 1000);
        return nowSeconds < Number(payload.exp);
    }

    private readTokenPayload(token: string): { exp?: number } | null {
        try {
            const [payloadSegment] = token.split('.');
            if (!payloadSegment) {
                return null;
            }

            const normalized = payloadSegment.replace(/-/g, '+').replace(/_/g, '/');
            const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
            const json = atob(padded);
            return JSON.parse(json);
        } catch {
            return null;
        }
    }
}
