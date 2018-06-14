import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameResultComponent } from './gameresult.component';

describe('GameresultComponent', () => {
    let component: GameResultComponent;
    let fixture: ComponentFixture<GameResultComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ GameResultComponent ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GameResultComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        component.game = {
            id: 0,
            openligaid: 0,
            index: 0,
            roundId: 0,
            dateTime: null,
            homeTeam: {
                id: 0,
                openligaid: 0,
                name: '',
                longName: '',
                shortName: '',
                xshortName: '',
                logo: '',
                type: ''
            },
            guestTeam: {
                id: 0,
                openligaid: 0,
                name: '',
                longName: '',
                shortName: '',
                xshortName: '',
                logo: '',
                type: ''
            },
            halfTimeResult: {
                homeGoals: 0,
                guestGoals: 0
            },
            result: {
                homeGoals: 0,
                guestGoals: 0
            },
            overtimeResult: {
                homeGoals: 0,
                guestGoals: 0
            },
            penaltyResult: {
                homeGoals: 0,
                guestGoals: 0
            },
            finished: true,
            ko: true,
            tipps: [] /*GameTippJson[]*/
        }
        expect(component.printResult).toEqual('0:0');
    });
});
