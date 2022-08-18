import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://flix-db-823.herokuapp.com/';

// Get token and username from localStorage
const token = localStorage.getItem('token');
const username = localStorage.getItem('username');

@Injectable({providedIn: 'root'})


export class FetchApiDataService {

    // "(private http: HttpClient)" ==> Inject the HttpClient module to the constructor params
    // This will provide HttpClient to the entire class, making it available via this.http
    constructor(private http: HttpClient) {}

    // API call: User registration
    public userRegistration(userDetails: any): Observable<any> {
        console.log(userDetails);
        return this.http
        .post(apiUrl + 'users', userDetails)
        .pipe(catchError(this.handleError));
    }

    // API call: User login 
    public userLogin(userCredentials: any): Observable<any> {
        console.log(userCredentials);
        return this.http
        .post(apiUrl + 'login', userCredentials)
        .pipe(catchError(this.handleError));
    }
   
    // API call: Get all Movies
    getAllMovies(): Observable<any> {
        return this.http
        .get(apiUrl + 'movies', {
            headers: new HttpHeaders({Authorization: 'Bearer ' + token})
        })
        .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    // API call: Get one movie      
    getOneMovie(title: any): Observable<any> {
        return this.http
        .get(apiUrl + `movies/${title}`, {
            headers: new HttpHeaders({Authorization: 'Bearer ' + token})
        })
        .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    // API call: Get director info    
    getDirectorInfo(directorsName: any): Observable<any> {
        return this.http
        .get(apiUrl + `movies/directors/${directorsName}`, {
            headers: new HttpHeaders({Authorization: 'Bearer ' + token})
        })
        .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    // API call: Get genre info
    getGenreInfo(genreName: any): Observable<any> {
        return this.http
        .get(apiUrl + `movies/genres/${genreName}`, {
            headers: new HttpHeaders({Authorization: 'Bearer ' + token})
        })
        .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }
   
    // API call: Get user info
    getUser(username: any): Observable<any> {
        return this.http
        .get(apiUrl + 'users/' + username, {
            headers: new HttpHeaders({Authorization: 'Bearer ' + token})
        })
        .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    // API call: Add a movie to a user's list of favorite movies
    addFavorite(movieId: any): Observable<any> {
        return this.http
        .post(apiUrl + `users/${username}/favorites/${movieId}`, {}, {
            headers: new HttpHeaders({Authorization: 'Bearer ' + token})
        })
        .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    // API call: Delete a movie from a user's list of favorite movies
    removeFavorite(movieId: any): Observable<any> {
        return this.http
        .delete(apiUrl + `users/${username}/favorites/${movieId}`, {
            headers: new HttpHeaders({Authorization: 'Bearer ' + token})
        })
        .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    // API call: Edit user
    editUser(userData: any): Observable<any> {
        return this.http
        .put(apiUrl + 'users/' + username, {userData}, {
            headers: new HttpHeaders({Authorization: 'Bearer ' + token})
        })
        .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    // API call: Delete user
    deleteUser(): Observable<any> {
        return this.http
        .delete(apiUrl + `users/${username}`, {
            headers: new HttpHeaders({Authorization: 'Bearer ' + token})
        })
        .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }
    

    // Non-typed response extraction
    private extractResponseData(res: any): any {
        const body = res;
        return body || {};
    }

    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error('Some error occured:', error.error.message);
        } else {
            console.error(
                `Error Status code ${error.status}, ` +
                `Error Body is: ${error.error}`
            );
        }       
    }
 
}    