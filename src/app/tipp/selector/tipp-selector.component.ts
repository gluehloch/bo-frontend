import { Component, Input, OnChanges, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { ResponsiveService, DeviceInfo } from '../../shared/responsive.service';
import { UserPreferenceService } from '../../shared/user-preference.service';

interface TipFormState {
    id: 'desktop' | 'small' | 'mobile';
    name: 'Desktop' | 'Kompakt' | 'Mobile';
    description: string;
    icon: string;
    isOptimal?: boolean;
}

@Component({
    selector: 'app-tipp-selector',
    templateUrl: './tipp-selector.component.html',
    styleUrls: ['./tipp-selector.component.css'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgFor, NgClass, NgIf, TitleCasePipe]
})
export class TippSelectorComponent implements OnInit, OnChanges, OnDestroy {

    @Input() selectionState: string | undefined;
    @Input() demoMode: boolean = false;

    states: TipFormState[] = [
        {
            id: 'desktop', 
            name: 'Desktop', 
            description: 'Vollständige Tabellenansicht für große Bildschirme',
            icon: 'bi-monitor'
        },
        {
            id: 'small', 
            name: 'Kompakt', 
            description: 'Kompakte Ansicht für mittlere Bildschirme',
            icon: 'bi-tablet'
        },
        {
            id: 'mobile', 
            name: 'Mobile', 
            description: 'Optimiert für Smartphones und Touch-Bedienung',
            icon: 'bi-phone'
        },
    ];

    form = new FormGroup({
        state: new FormControl(),
        autoSelect: new FormControl(true)
    });

    currentDeviceInfo: DeviceInfo | undefined;
    private subscriptions: Subscription[] = [];
    showOptimalBadge = true;
    isAutoSelectEnabled = true;

    constructor(
        private router: Router,
        private responsiveService: ResponsiveService,
        private userPreferenceService: UserPreferenceService
    ) {}

    ngOnInit() {
        console.log('ngOnInit', this.selectionState);

        // Initialize auto-select preference from localStorage
        this.isAutoSelectEnabled = this.userPreferenceService.getAutoSelectPreference();
        this.form.controls['autoSelect'].setValue(this.isAutoSelectEnabled, { emitEvent: false });

        // Subscribe to device info changes
        const deviceInfoSub = this.responsiveService.deviceInfo$.subscribe(deviceInfo => {
            this.currentDeviceInfo = deviceInfo;
            this.updateOptimalFlags();
            
            // Auto-select optimal form if enabled and no user preference
            if (this.isAutoSelectEnabled && !this.userPreferenceService.hasUserPreference()) {
                this.autoSelectOptimalForm(deviceInfo);
            }
        });
        this.subscriptions.push(deviceInfoSub);

        // Subscribe to auto-select toggle changes
        const autoSelectSub = this.form.controls['autoSelect'].valueChanges.subscribe(autoSelect => {
            const autoSelectValue = autoSelect ?? true; // Default to true if null
            this.isAutoSelectEnabled = autoSelectValue;
            this.userPreferenceService.saveAutoSelectPreference(autoSelectValue);
            
            if (autoSelectValue && this.currentDeviceInfo) {
                // Clear user preference and auto-select
                this.userPreferenceService.clearTipFormPreference();
                this.autoSelectOptimalForm(this.currentDeviceInfo);
            }
        });
        this.subscriptions.push(autoSelectSub);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    private updateOptimalFlags(): void {
        if (this.currentDeviceInfo) {
            this.states.forEach(state => {
                state.isOptimal = state.id === this.currentDeviceInfo?.recommendedTipForm;
            });
        }
    }

    private autoSelectOptimalForm(deviceInfo: DeviceInfo): void {
        if (!this.isAutoSelectEnabled) return;

        const recommendedForm = deviceInfo.recommendedTipForm;
        const currentStateId = this.form.controls['state'].value?.id;

        // Only auto-navigate if we're not already on the recommended form
        if (currentStateId !== recommendedForm) {
            const recommendedState = this.states.find(state => state.id === recommendedForm);
            if (recommendedState) {
                console.log('Auto-selecting optimal form:', recommendedForm);
                this.form.controls['state'].setValue(recommendedState, { emitEvent: false });
                this.navigateToForm(recommendedState);
            }
        }
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
                    this.form.controls['state'].setValue(st, { emitEvent: false });
                    this.updateOptimalFlags();
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

        if (event && event.id) {
            // Save user preference when manually selecting
            this.userPreferenceService.saveTipFormPreference(event.id);
            this.navigateToForm(event);
        }
    }

    private navigateToForm(state: TipFormState): void {
        if (this.demoMode) {
            console.log('Demo mode: Would navigate to', state.id);
            return;
        }

        if (state.id === 'desktop') {
            this.router.navigate(['./tipp']);
        } else if (state.id === 'small') {
            this.router.navigate(['./tipp-small']);
        } else if (state.id === 'mobile') {
            this.router.navigate(['./tipp-mobile']);
        }
    }

    /**
     * Get the current recommended form based on device capabilities
     */
    getRecommendedForm(): string {
        return this.currentDeviceInfo?.recommendedTipForm || 'desktop';
    }

    /**
     * Check if a form is currently optimal for the device
     */
    isOptimalFormType(formId: string): boolean {
        return this.currentDeviceInfo?.recommendedTipForm === formId;
    }

    /**
     * Get device info for display
     */
    getDeviceInfo(): string {
        if (!this.currentDeviceInfo) return '';
        
        const { screenWidth, screenHeight } = this.currentDeviceInfo;
        return `${screenWidth}×${screenHeight}`;
    }

/*
    public clickButton(): void {
        console.log('clickButton', this.form.controls['state'].value);
    }
*/

}
