import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'

import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { MovieDetailsCardComponent } from '../movie-details-card/movie-details-card.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {  

    user: any = {};
    movies: any[] = [];
    constructor(
        public dialog: MatDialog,
        public fetchApiData: FetchApiDataService
    ) { }
  
    ngOnInit(): void {
        this.getMovies();
    }
    

    getMovies(): void {
        this.fetchApiData
        .getAllMovies().subscribe((resp: any) => {
            this.movies = resp;
            console.log(this.movies);
            return this.movies;
        });
    }

    getUser(): void {
        this.fetchApiData
        .getUser().subscribe((response:any) => {   
            this.user = response; 
            console.log(this.user);
            return this.user;
        });
    }


    openGenreCard(name: string, description: string): void {
        this.dialog.open(GenreCardComponent, {
            data: {
                Name: name,
                Description: description,
            },
            // Assign dialog width
            width: '500px'
        })
    }

    openDirectorCard(name: string, description: string, birth: string, death:any): void {
        this.dialog.open(DirectorCardComponent, {
            data: {
                Name: name,
                Description: description,
                Birth: birth,
                Death: death
            },
            // Assign dialog width
            width: '500px'
        })
    }

    openMovieDetailsCard(title:string, description:string, actors:string[]): void {
        this.dialog.open(MovieDetailsCardComponent, {
            data: {
                Title: title,
                Description: description,
                Actors: actors
            },
            // Assign dialog width
            width: '500px'
        })
    }

    addtoFavoriteMovies(movie_id:string): void {
        this.fetchApiData
        .addFavorite(movie_id)
        .subscribe((response) => {
            console.log(response);
        }, 
        (response) => {
            console.log(response);
        });
    }

  }



