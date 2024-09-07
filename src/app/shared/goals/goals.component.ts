import { Component, Input, OnInit, SimpleChange } from "@angular/core";
import { GoalsService } from "./goals.service";
import { NgIf, NgFor } from "@angular/common";

class GameDetail {
    display: boolean = false;
    detail: Rest.GameDetailsJson | undefined;
    game: Rest.GameJson | undefined;
}


@Component({
    selector: 'goals',
    templateUrl: './goals.component.html',
    styleUrls: ['./goals.component.css'],
    standalone: true,
    imports: [NgIf, NgFor]
})
export class GoalsComponent implements OnInit {

    @Input() display: boolean = false;
    @Input() game: Rest.GameJson | undefined;

    loading = false;
    gameDetail = new GameDetail();

    constructor(private goalService: GoalsService) { }

    ngOnInit() {
        if (this.game) {
            this.gameDetail.game = this.game;
        }
    }

    ngOnChanges(changes: any) {
        console.log('onChanges', changes);
        if (changes?.display?.currentValue && this.gameDetail.game) {
            this.showDetails(this.gameDetail.game);
        }
    }

    private showDetails(game: Rest.GameJson): void {
        if (this.gameDetail.detail === undefined) {
            console.debug('Start loading of game goals:', this.game);
            this.loading = true;
            this.goalService
                .findGameDetails(game.id)
                .subscribe(
                    (gameDetail: Rest.GameDetailsJson) => {
                        this.gameDetail.detail = gameDetail;
                        console.debug('Completed loading game details for game: ', game, gameDetail);
                    },
                    (error: any) => {
                        console.error('Error while loading game details for game: ', game, error);
                    },
                    () => {
                        this.loading = false;
                    }
                );
        }
    }

}
