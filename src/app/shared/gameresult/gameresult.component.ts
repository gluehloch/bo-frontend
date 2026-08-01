import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-gameresult',
    templateUrl: './gameresult.component.html',
    styleUrls: ['./gameresult.component.css'],
    standalone: true
})
export class GameResultComponent implements OnInit {

    @Input() game: Rest.GameJson | undefined;
    @Input() halfTime = false;

    constructor() { }

    ngOnInit() {
    }

    private isOvertime(): boolean {
        if (!this.game) {
            return false;
        }
        return this.game.ko
            && this.game.overtimeResult.homeGoals !== this.game.overtimeResult.guestGoals;
    }

    private isPenalty(): boolean {
        if (!this.game) {
            return false;
        }
        return this.game.ko
            && this.game.penaltyResult.homeGoals !== this.game.penaltyResult.guestGoals;
    }

    private result(): string {
        if (!this.game) {
            return '---';
        }
        // Reihenfolge beachten!
        if (!this.game.finished) {
            return '-:-';
        } else if (this.isPenalty()) {
            return this.game.penaltyResult.homeGoals + ':' + this.game.penaltyResult.guestGoals + ' n.E.';
        } else if (this.isOvertime()) {
            return this.game.overtimeResult.homeGoals + ':' + this.game.overtimeResult.guestGoals + ' n.V.';
        } 
        return this.game.result.homeGoals + ':' + this.game.result.guestGoals;
    }

    printResult() {
        let result = '';
        if (!this.game) {
            return '---';
        }

        // Halbzeitergebnis nur anzeigen, wennn das Spiel kein KO Spiel ist.
        if (this.game.finished && this.halfTime && !this.game.ko) {
            result = '(' + this.game.halfTimeResult.homeGoals
                + ':' + this.game.halfTimeResult.guestGoals
                + ') '
        }

        return result + this.result();
    }
}
