export type Department = 'cardiology' | 'surgery';

export interface Employee {
    id: string;
    fullName: string;
    department: Department;
}

export interface Doctor extends Employee {
    isHead: boolean;
}

export interface Nurse extends Employee {}