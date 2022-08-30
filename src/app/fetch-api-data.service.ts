import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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

    /**
     * POST: register a new user
     * @param userDetails 
     * @returns a new user object in JSON format
     */
    public userRegistration(userDetails: any): Observable<any> {
        console.log(userDetails);
        return this.http
        .post(apiUrl + 'users', userDetails)
        .pipe(catchError(this.handleError));
    }

    /**
     * POST: User login
     * @param userCredentials
     * @param {any} router 
     * @returns {Object} user
     * @requires passport
     */ 
    public userLogin(userCredentials: any): Observable<any> {
        console.log(userCredentials);
        return this.http
        .post(apiUrl + 'login', userCredentials)
        .pipe(catchError(this.handleError));
    }
   
    /**
     * GET: Get all movies data
     * 
     * @returns {Object[]} movies
     * @requires passport
     */
    getAllMovies(): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http
        .get(apiUrl + 'movies', {
            headers: new HttpHeaders({Authorization: 'Bearer ' + token})
        })
        .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    /**
     * GET: get one movie by title
     * @param {any} Title
     * @returns {Object} movie
     * @requires passport
     */     
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

    /**
     * GET: get info about a director by name
     * @param Name (of director)
     * @returns {Object} director
     * @requires passport
     */    
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

    /**
     * GET: get data about a single genre by Genre Name
     * @param {any} genreName
     * @returns {Object} genre
     * @requires passport
     */
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
     
    /**
     * GET: Return data on one user by username
     * 
     * @param {string} username
     * @returns {Object} user
     * @requires passport
     */
    getUser(): Observable<any> {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');
        return this.http
        .get(apiUrl + `users/${username}`, {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + token,
            })
        })
        .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    /**
     * POST: Allow users to add a movie to their list of favorites
     * @param {any} movieID
     * @requires passport
     */
    addFavorite(movieId: any): Observable<any> {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');
        return this.http
        .post(apiUrl + `users/${username}/movies/${movieId}`, {}, {
            headers: new HttpHeaders({Authorization: 'Bearer ' + token})
        })
        .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    /** 
     * DELETE: Remove a movie from a user's list of favorite movies
     * @param {any} movieID
     * @requires passport
     */
    removeFavorite(movieId: any): Observable<any> {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');
        return this.http
        .delete(apiUrl + `users/${username}/movies/${movieId}`, {
            headers: new HttpHeaders({Authorization: 'Bearer ' + token})
        })
        .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    /**
     * PUT: Allow users to update their user data
     * @param {string} Username
     * @returns {Object} user - with new informations
     * @requires passport
     */
    editUser(userData: any): Observable<any> {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');
        return this.http
        .put(apiUrl + `users/${username}`, userData, {
            headers: new HttpHeaders({Authorization: 'Bearer ' + token})
        })
        
    }

    /**
     * DELETE: Remove a user by username
     * @param {string} Username
     * @requires passport
     */
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
        return throwError('Something bad happened; please try again later.');       
    }
 
}    