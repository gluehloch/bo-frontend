import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'gameresult',
    templateUrl: './gameresult.component.html',
    styleUrls: ['./gameresult.component.css']
})
export class GameResultComponent implements OnInit {

    @Input() game: Rest.GameJson;
    @Input() halfTime: boolean = false;

    constructor() { }

    ngOnInit() {
    }

    private result() {
        if (this.game.ko && this.game.result.homeGoals !== this.game.result.guestGoals) {
            return this.game.result.homeGoals + ':' + this.game.result.guestGoals;
        } else if (this.game.ko && this.game.result.homeGoals === this.game.result.guestGoals
                                && this.game.overtimeResult.homeGoals !== this.game.overtimeResult.guestGoals) {
            return this.game.overtimeResult.homeGoals + ':' + this.game.overtimeResult.guestGoals + ' n.V.';
        } else if (this.game.ko && this.game.result.homeGoals === this.game.result.guestGoals
                                && this.game.overtimeResult.homeGoals === this.game.overtimeResult.guestGoals) {
            return this.game.penaltyResult.homeGoals + ':' + this.game.penaltyResult.guestGoals + ' n.E.';
        } else if (!this.game.ko) {
            return this.game.result.homeGoals + ':' + this.game.result.guestGoals;      
        }
    }

    printResult() {
        let result: string = '';
        if (this.halfTime) {
            result = '(' + this.game.halfTimeResult.homeGoals
                + ':' + this.game.halfTimeResult.guestGoals
                + ')'
        }

        return result + this.result();
    }
}
