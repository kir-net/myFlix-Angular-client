import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

// import simplified API for Angular apps that makes it possible for
// the client app to communicate with the API or server-side
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';

// import Material Design modules
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MatIconModule } from '@angular/material/icon';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GenreCardComponent } from './genre-card/genre-card.component';
import { DirectorCardComponent } from './director-card/director-card.component';
import { MovieDetailsCardComponent } from './movie-details-card/movie-details-card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const appRoutes: Routes = [
    { path: 'welcome', component: WelcomePageComponent },
    { path: 'movies', component: MovieCardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
    declarations: [
        AppComponent,
        UserRegistrationFormComponent,
        UserLoginFormComponent,
        MovieCardComponent,
        WelcomePageComponent,
        UserProfileComponent,
        GenreCardComponent,
        DirectorCardComponent,
        MovieDetailsCardComponent,
        NavbarComponent,
        EditUserComponent
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatDialogModule,
        MatSnackBarModule,
        MatDividerModule,
        MatGridListModule,
        FormsModule,
        MatIconModule 
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
