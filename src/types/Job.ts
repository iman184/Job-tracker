export interface Job{
    id: string;
    title: string;
    company: string;
    status:"Applied" | "Interview" | "Rejected" | "Offer";
    dateApplied: string;
    lastUpdated: string;
    jobLink?: string;
    salary?: string;
    location?: string;
    notes?: string;
    contactPerson?: string;
}