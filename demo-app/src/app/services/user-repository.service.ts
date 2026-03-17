import { Injectable } from "@angular/core";
import { Observable, EMPTY, throwError, timer } from "rxjs";
import { IUser } from "./models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserRepositoryService {
    currentUser: IUser | null = null;

    constructor() { }

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
        if (credentials.email !== 'me@example.com' || credentials.password !== 'super-secret') {
            return throwError(() => new Error('Invalid login'));
        }

        this.currentUser = {
            userId: 'e61aebed-dbc5-437a-b514-02b8380d8efc',
            first: 'Justine',
            last: 'Alires',
            email: 'me@example.com',
            classes: []
        };

        return EMPTY
    }
}
