import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
    HTTP_INTERCEPTORS,
    provideHttpClient,
    withInterceptorsFromDi
} from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './catalog/catalog.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ErrorHandlingInterceptor } from './interceptors/error-handling.interceptor';
import { AccountMenuComponent } from './shared/account-menu/account-menu.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { SignInComponent } from './user/sign-in.component';
import { SignOutComponent } from './user/sign-out.component';

@NgModule({
    declarations: [
        AppComponent,
        CatalogComponent,
        NavBarComponent,
        AccountMenuComponent,
        SignInComponent,
        SignOutComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoggingInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlingInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }