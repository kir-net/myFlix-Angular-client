
import { Component, OnInit, Input } from '@angular/core';
// import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// import API calls
import { FetchApiDataService } from '../fetch-api-data.service';

import { Router } from '@angular/router';

@Component({
    selector: 'app-user-login-form',
    templateUrl: './user-login-form.component.html',
    styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

    @Input() userData = { 
        Username: '', Password: '' 
    };
  
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserLoginFormComponent>,
        private router: Router
    ) { }

    ngOnInit(): void {}
    
    // send the form inputs to the backend
    loginUser(): void {
        this.fetchApiData
        .userLogin(this.userData)
        .subscribe((response) => {
            localStorage.setItem('user', response.user.Username);
            localStorage.setItem('token', response.token);
            this.dialogRef.close(); // close dialog on success
            this.router.navigate(['movies'])
        });
    }  
} 
