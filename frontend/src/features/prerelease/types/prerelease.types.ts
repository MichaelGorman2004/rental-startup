/** Respondent type options. */
export type RespondentType = 'student_org' | 'venue';

/** Form values for the prerelease interest form. */
export interface InterestFormValues {
  firstName: string;
  lastName: string;
  respondentType: RespondentType;
  orgOrVenueName: string;
  email: string;
  phone: string;
  personalNote: string;
}

/** Response from the API after form submission. */
export interface InterestResponse {
  id: string;
  firstName: string;
  lastName: string;
  respondentType: RespondentType;
  orgOrVenueName: string;
  email: string;
  createdAt: string;
}
