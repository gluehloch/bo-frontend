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

    private isRegular(): boolean {
        if (!this.game) {
            return false;
        }
        return (!this.game.ko) || (this.game.ko && this.game.result.homeGoals !== this.game.result.guestGoals);
    }

    private isOvertime(): boolean {
        if (!this.game) {
            return false;
        }
        return this.game.ko
            && this.game.result.homeGoals === this.game.result.guestGoals
            && this.game.overtimeResult.homeGoals !== this.game.overtimeResult.guestGoals;
    }

    private isPenalty(): boolean {
        if (!this.game) {
            return false;
        }
        return this.game.ko
            && this.game.result.homeGoals === this.game.result.guestGoals
            && this.game.overtimeResult.homeGoals === this.game.overtimeResult.guestGoals;
    }

    private result(): string {
        if (!this.game) {
            return '---';
        }
        if (!this.game.finished) {
            return '-:-';
        } else if (this.isRegular()) {
            return this.game.result.homeGoals + ':' + this.game.result.guestGoals;
        } else if (this.isOvertime()) {
            return this.game.overtimeResult.homeGoals + ':' + this.game.overtimeResult.guestGoals + ' n.V.';
        } else if (this.isPenalty()) {
            return this.game.penaltyResult.homeGoals + ':' + this.game.penaltyResult.guestGoals + ' n.E.';
        }

        return 'Ups';
    }

    printResult() {
        let result = '';
        if (!this.game) {
            return '---';
        }
        if (this.game.finished && this.halfTime) {
            result = '(' + this.game.halfTimeResult.homeGoals
                + ':' + this.game.halfTimeResult.guestGoals
                + ') '
        }

        return result + this.result();
    }
}
