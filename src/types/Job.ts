export interface Job{
    id: string;
    title: string;
    company: string;
    status:"Applied" | "Interview" | "Rejected" | "Offer" ;
}