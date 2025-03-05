import React, { useState } from 'react';
import { Doctor } from '../types';
import EmployeeForm from '../components/EmployeeForm';
import { Pencil, Trash, Plus } from 'react-bootstrap-icons';

const mockDoctors: Doctor[] = [
    { id: '1', fullName: 'John Doe', department: 'cardiology', isHead: true },
    { id: '2', fullName: 'Jane Smith', department: 'surgery', isHead: false },
];

const DoctorsPage: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
    const [showForm, setShowForm] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

    const handleDelete = (id: string) => {
        setDoctors(doctors.filter(doctor => doctor.id !== id));
    };

    const handleSubmit = (data: Omit<Doctor, 'id'>) => {
        if (selectedDoctor) {
            setDoctors(doctors.map(d =>
                d.id === selectedDoctor.id ? { ...data, id: d.id } : d
            ));
        } else {
            setDoctors([...doctors, { ...data, id: Date.now().toString() }]);
        }
        setShowForm(false);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Doctors</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setSelectedDoctor(null);
                        setShowForm(true);
                    }}
                >
                    <Plus size={20} /> Add Doctor
                </button>
            </div>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Head</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {doctors.map(doctor => (
                    <tr key={doctor.id}>
                        <td>{doctor.fullName}</td>
                        <td>{doctor.department}</td>
                        <td>{doctor.isHead ? 'Yes' : 'No'}</td>
                        <td>
                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => {
                                    setSelectedDoctor(doctor);
                                    setShowForm(true);
                                }}
                            >
                                <Pencil size={16} />
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(doctor.id)}
                            >
                                <Trash size={16} />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showForm && (
                <EmployeeForm
                    initialData={selectedDoctor}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setSelectedDoctor(null);
                    }}
                    isDoctor={true}
                />
            )}
        </div>
    );
};

export default DoctorsPage;