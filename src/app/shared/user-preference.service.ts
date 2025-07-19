import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserPreferenceService {
  
  private readonly TIP_FORM_PREFERENCE_KEY = 'tip-form-preference';
  private readonly AUTO_SELECT_PREFERENCE_KEY = 'tip-form-auto-select';

  constructor() { }

  /**
   * Save user's tip form preference
   */
  saveTipFormPreference(formType: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.TIP_FORM_PREFERENCE_KEY, formType);
    }
  }

  /**
   * Get user's saved tip form preference
   */
  getTipFormPreference(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.TIP_FORM_PREFERENCE_KEY);
    }
    return null;
  }

  /**
   * Clear user's tip form preference
   */
  clearTipFormPreference(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.TIP_FORM_PREFERENCE_KEY);
    }
  }

  /**
   * Save user's auto-select preference
   */
  saveAutoSelectPreference(autoSelect: boolean): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.AUTO_SELECT_PREFERENCE_KEY, autoSelect.toString());
    }
  }

  /**
   * Get user's auto-select preference (defaults to true)
   */
  getAutoSelectPreference(): boolean {
    if (typeof localStorage !== 'undefined') {
      const preference = localStorage.getItem(this.AUTO_SELECT_PREFERENCE_KEY);
      return preference !== null ? preference === 'true' : true; // Default to true
    }
    return true;
  }

  /**
   * Check if user has a saved preference
   */
  hasUserPreference(): boolean {
    return this.getTipFormPreference() !== null;
  }
}