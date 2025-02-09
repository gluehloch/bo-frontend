import { Component, OnInit, signal } from "@angular/core";
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { FormsModule } from "@angular/forms";
import { NgFor, NgIf } from "@angular/common";
import { NavigationRouterService } from "../navigationrouter.service";
import { Router } from "@angular/router";
import { ProfileService } from "./profile.service";

@Component({
    selector: 'profil',
    templateUrl: './profile.component.html',
    standalone: true,
    imports: [NgIf, NgFor, FormsModule, SpinnerComponent]
})
export class ProfileComponent implements OnInit {

    contentReady = signal(true); // TODO Laden der Mannschaftslisten wird nicht angezeigt.

    constructor(
        private router: Router,
        private profileService: ProfileService
        ,
        private navigationRouterService: NavigationRouterService) {
    }
    
    ngOnInit() {
    }

}