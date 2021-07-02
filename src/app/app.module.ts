import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
;
import { Covid19Component } from './covid19/covid19.component'

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        FormsModule,
        MatIconModule,
        MatFormFieldModule,
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        Covid19Component
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };