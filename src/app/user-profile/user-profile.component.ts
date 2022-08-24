import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { EditUserComponent } from '../edit-user/edit-user.component';

import { MatDialog } from '@angular/material/dialog';
import { AppModule } from '../app.module';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

    user: any = {};
    movies: any[] = [];
    filteredMovies: any[] = [];

    constructor(
        public dialog: MatDialog,
        public router: Router,
        public fetchApiData: FetchApiDataService
    ) { }
  
    ngOnInit(): void { 
        this.getUser();   
        this.getUsersFavoriteMovies();      
    }
    
    getUser(): void {
        this.fetchApiData
        .getUser().subscribe((response:any) => {   
            this.user = response; 
            console.log(this.user);
            return this.user;
        });
    }

    getUsersFavoriteMovies(): void {
        this.fetchApiData
        .getAllMovies().subscribe((response: any) => {
            this.movies = response;
            this.filteredMovies = this.filterMovies(this.movies, this.user.FavoriteMovies);
            return this.filteredMovies;
        });
    }

    filterMovies(movies:any, FavoriteMovies:any): any {
        let remainingMovies = [];
        for (let movie in movies) {
            if (FavoriteMovies.includes(movies[movie]._id)) {
                remainingMovies.push(movies[movie]);
            }
        }
        return remainingMovies;
    }

    removeFromFavoriteMovies(movie_id:string): void {
        this.fetchApiData
        .removeFavorite(movie_id)
        .subscribe((response) => {
            console.log(response);
            window.location.reload();
        });
    }

    // button click --> edit user information 
    openEditUserDialog(): void {
        this.dialog.open(EditUserComponent, {
            width: '280px'
        });
    }

}
