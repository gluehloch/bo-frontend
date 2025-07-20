import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  recommendedTipForm: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  
  // Bootstrap-like breakpoints
  private readonly breakpoints = {
    mobile: 576,    // < 576px = mobile
    tablet: 992,    // 576px - 991px = tablet/small
    desktop: 992    // >= 992px = desktop
  };

  private deviceInfoSubject = new BehaviorSubject<DeviceInfo>(this.getCurrentDeviceInfo());
  public deviceInfo$: Observable<DeviceInfo> = this.deviceInfoSubject.asObservable();

  constructor() {
    // Listen to window resize events
    if (typeof window !== 'undefined') {
      fromEvent(window, 'resize')
        .pipe(
          debounceTime(150), // Debounce resize events
          map(() => this.getCurrentDeviceInfo()),
          startWith(this.getCurrentDeviceInfo())
        )
        .subscribe(deviceInfo => {
          this.deviceInfoSubject.next(deviceInfo);
        });
    }
  }

  private getCurrentDeviceInfo(): DeviceInfo {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const height = typeof window !== 'undefined' ? window.innerHeight : 768;

    const isMobile = width < this.breakpoints.mobile;
    const isTablet = width >= this.breakpoints.mobile && width < this.breakpoints.tablet;
    const isDesktop = width >= this.breakpoints.desktop;

    // Determine recommended tip form based on screen size and capabilities
    let recommendedTipForm: 'desktop' | 'small' | 'mobile' = 'desktop';
    
    if (isMobile) {
      recommendedTipForm = 'mobile';
    } else if (isTablet || (width < 1200 && height < 800)) {
      recommendedTipForm = 'small';  // compact form for tablets or smaller screens
    } else {
      recommendedTipForm = 'desktop';
    }

    return {
      isMobile,
      isTablet,
      isDesktop,
      screenWidth: width,
      screenHeight: height,
      recommendedTipForm
    };
  }

  /**
   * Get current device info synchronously
   */
  getCurrentDevice(): DeviceInfo {
    return this.deviceInfoSubject.value;
  }

  /**
   * Check if current device should use mobile layout
   */
  isMobileDevice(): boolean {
    return this.getCurrentDevice().isMobile;
  }

  /**
   * Check if current device should use tablet/small layout
   */
  isTabletDevice(): boolean {
    return this.getCurrentDevice().isTablet;
  }

  /**
   * Check if current device should use desktop layout
   */
  isDesktopDevice(): boolean {
    return this.getCurrentDevice().isDesktop;
  }

  /**
   * Get the recommended tip form for current device
   */
  getRecommendedTipForm(): string {
    return this.getCurrentDevice().recommendedTipForm;
  }

  /**
   * Check if the given form is optimal for the current device
   */
  isOptimalForm(formType: string): boolean {
    return this.getRecommendedTipForm() === formType;
  }
}