// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
// import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// import API calls
import { FetchApiDataService } from '../fetch-api-data.service';
// import to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

    @Input() userData = { 
        Username: '', Password: '', Email: '', Birthday: '' 
    };
  
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
        public snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {}
    
    // send the form inputs to the backend
    registerUser(): void {
        this.fetchApiData.userRegistration(this.userData)
        .subscribe((response) => {
            // Logic for a successful user registration here
            this.dialogRef.close(); // close dialog on success
            console.log(response);
            this.snackBar.open(response, 'OK', {duration: 2000});
        }, 
        (response) => {
            console.log(response);
            this.snackBar.open(response, 'OK', {duration: 2000})
        });
    }
    
}      