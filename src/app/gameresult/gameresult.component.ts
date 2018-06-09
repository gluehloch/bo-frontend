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

    private isRegular(): boolean {
        return (!this.game.ko) || (this.game.ko && this.game.result.homeGoals !== this.game.result.guestGoals);
    }

    private isOvertime(): boolean {
        return this.game.ko
            && this.game.result.homeGoals === this.game.result.guestGoals
            && this.game.overtimeResult.homeGoals !== this.game.overtimeResult.guestGoals;
    }

    private isPenalty(): boolean {
        return this.game.ko 
            && this.game.result.homeGoals === this.game.result.guestGoals
            && this.game.overtimeResult.homeGoals === this.game.overtimeResult.guestGoals;
    }

    private result() {
        if (this.isRegular()) {
            return this.game.result.homeGoals + ':' + this.game.result.guestGoals;
        } else if (this.isOvertime()) {
            return this.game.overtimeResult.homeGoals + ':' + this.game.overtimeResult.guestGoals + ' n.V.';
        } else if (this.isPenalty()) {
            return this.game.penaltyResult.homeGoals + ':' + this.game.penaltyResult.guestGoals + ' n.E.';
        }

        return "Ups";
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
