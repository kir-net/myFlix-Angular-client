
import { Component, OnInit, Input } from '@angular/core';
// import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// import API calls
import { FetchApiDataService } from '../fetch-api-data.service';
// import to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-login-form',
    templateUrl: './user-login-form.component.html',
    styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

    @Input() userData = { 
        Username: '', Password: '', Email: '', Birthday: '' 
    };
  
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserLoginFormComponent>,
        public snackBar: MatSnackBar,
        private router: Router
    ) { }

    ngOnInit(): void {}
    
    // send the form inputs to the backend
    loginUser(): void {
        this.fetchApiData
        .userLogin(this.userData)
        .subscribe((response) => {
            console.log(response);
            localStorage.setItem('user', response.user.Username);
            localStorage.setItem('token', response.token);
            this.dialogRef.close(); // close dialog on success
            this.snackBar.open(response, 'OK', {duration: 2000});
            this.router.navigate(['movies'])
        }, 
        (response) => {
            console.log(response);
            this.snackBar.open(response, 'OK', {duration: 2000})
        });
    }  
} 
