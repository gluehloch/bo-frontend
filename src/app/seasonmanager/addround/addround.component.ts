import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-add-round',
    templateUrl: './addround.component.html',
    styleUrls: ['./addround.component.css'],
    imports: [FormsModule],
    standalone: true,
})
export class AddRoundComponent implements OnInit {

    ngOnInit() {
    }

}
