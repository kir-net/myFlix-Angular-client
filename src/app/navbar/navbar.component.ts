import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor(
        public router: Router
    ) { }

    ngOnInit(): void { }

    openUserProfile(): void {
        this.router.navigate(['user-profile']);
    }

    openMoviesOrWelcome(): void {
        if (localStorage.length>0){
            this.router.navigate(['movies']);
        }else{
            this.router.navigate(['welcome']);
        }    
    }

    logOut(): void{
        localStorage.clear();
        this.router.navigate(['welcome']);
    }
}


