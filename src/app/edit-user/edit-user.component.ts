// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
// import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// import API calls
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

    @Input() userData: any = { };

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<EditUserComponent>,
        public router: Router,
    ) { }

    ngOnInit(): void {
    }


    // send the form inputs to the backend
    editUser(): void {
        this.fetchApiData
        .editUser(this.userData)
        .subscribe((response) => {
            this.dialogRef.close(); // close dialog on success
            localStorage.clear();
            this.router.navigate(['welcome']);          
        })
    }  

}
