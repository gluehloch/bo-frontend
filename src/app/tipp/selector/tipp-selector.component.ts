import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-tipp-selector',
    templateUrl: './tipp-selector.component.html',
    styleUrls: ['./tipp-selector.component.css']
})
export class TippSelectorComponent implements OnChanges {

    @Input() selectionState: string | undefined;

    states = [
        {id: 'desktop', name: 'Desktop'},
        {id: 'small', name: 'Kompakt'},
        /*{id: 'mobile', name: 'Mobile Screen'},*/
    ];

    form = new FormGroup({
        state: new FormControl(/*this.states[0]*/),
    });

    constructor(private router: Router) {
    }

    ngOnInit() {
        console.log('ngOnInit', this.selectionState);
    }

    /**
     * Reagiert auf Aenderungen an den Properties, die mit {@code @Input}
     * annotiert sind.
     *
     * @param changes SimpleChanges
     */
    ngOnChanges(changes: SimpleChanges) {
        console.log('ngOnChanges', changes);

        if (changes.selectionState && changes.selectionState.currentValue) {
            for (const st of this.states) {
                if (st.id === changes.selectionState.currentValue) {
                    // this.form.controls['state'].setValue(st, {onlySelf: true});
                    // this.form.get('state').patchValue(st);
                    // this.form.get('state').setValue(st);
                    this.form.controls['state'].setValue(st);
                }
            }
        }
    }

    /**
     * Wird direkt aus dem HTML Template heraus aufgerufen:
     * {@code (ngModelChange)="onModelChange($event)"}
     *
     * @param event Ein HTML DOM Event
     */
    onModelChange(event: any): void {
        console.log('onModelChange', event);

        if (event.id === 'desktop') {
            this.router.navigate(['./tipp']);
        } else if (event.id === 'small') {
            this.router.navigate(['./tipp-small']);
        } else if (event.id === 'mobile') {
            this.router.navigate(['./tipp-mobile']);
        }
    }

/*
    public clickButton(): void {
        console.log('clickButton', this.form.controls['state'].value);
    }
*/

}
