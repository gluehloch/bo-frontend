import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { TippSelectorComponent } from '../tipp/selector/tipp-selector.component';
import { ResponsiveService } from '../shared/responsive.service';

@Component({
  selector: 'app-responsive-demo',
  template: `
    <div class="container mt-4">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h4 class="mb-0">
                <i class="bi bi-magic"></i> 
                Enhanced Tip Form Selector Demo
              </h4>
              <small class="text-muted">
                Automatic optimal form selection based on your device
              </small>
            </div>
            <div class="card-body">
              <!-- Selector Component -->
              <app-tipp-selector selectionState="desktop" [demoMode]="true"></app-tipp-selector>
              
              <!-- Demo Info -->
              <div class="mt-4 p-3 bg-light rounded">
                <h5><i class="bi bi-info-circle"></i> How it works:</h5>
                <ul class="mb-0">
                  <li><strong>Automatic Detection:</strong> The system detects your screen size and recommends the best tip form</li>
                  <li><strong>Mobile (< 576px):</strong> Card-based layout with quick tip buttons</li>
                  <li><strong>Tablet (576px - 991px):</strong> Compact vertical layout</li>
                  <li><strong>Desktop (≥ 992px):</strong> Full table layout with all details</li>
                  <li><strong>User Override:</strong> You can manually select any form and your preference is saved</li>
                  <li><strong>Auto-Switch:</strong> Toggle to enable/disable automatic switching</li>
                </ul>
              </div>

              <!-- Test Instructions -->
              <div class="mt-3 p-3 bg-primary text-white rounded">
                <h6><i class="bi bi-laptop"></i> Test Instructions:</h6>
                <p class="mb-2">
                  <strong>To test responsive behavior:</strong>
                </p>
                <ol class="mb-0">
                  <li>Resize your browser window to different sizes</li>
                  <li>Watch how the recommended form changes automatically</li>
                  <li>Try toggling the "Automatic Formular-Optimierung" switch</li>
                  <li>Select a specific form manually to override automatic selection</li>
                  <li>Refresh the page to see if your preference is remembered</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [NgIf, TippSelectorComponent]
})
export class ResponsiveDemoComponent {
  constructor(public responsiveService: ResponsiveService) {}
}