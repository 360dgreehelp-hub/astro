export type FocusArea = 'Love' | 'Career' | 'Business' | 'Full';

export type OnboardingFormValues = {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth?: string;
  placeOfBirth: string;
  focus: FocusArea;
  rashi?: string;
  nakshatra?: string;
  lagna?: string;
};
