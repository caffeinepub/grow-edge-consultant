import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Enquiry {
    id: Principal;
    service: Service;
    country: string;
    fullName: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export enum Service {
    studyAbroad = "studyAbroad",
    jobPlacement = "jobPlacement",
    ieltsTraining = "ieltsTraining",
    shortTermCourses = "shortTermCourses",
    onlineCourses = "onlineCourses"
}
export interface backendInterface {
    addSubscriber(email: string): Promise<void>;
    getAllEnquiries(): Promise<Array<Enquiry>>;
    getAllEnquiriesSortedByTimestamp(): Promise<Array<Enquiry>>;
    getAllSubscribers(): Promise<Array<string>>;
    submitEnquiry(fullName: string, phone: string, email: string, service: Service, country: string, message: string): Promise<Principal>;
}
