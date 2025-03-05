import React, { useState } from 'react';
import { Nurse } from '../types';
import EmployeeForm from '../components/EmployeeForm';
import { Pencil, Trash, Plus } from 'react-bootstrap-icons';
import useMobileView from "../hooks/useMobileView";

const mockNurses: Nurse[] = [
    { id: '1', fullName: 'Alice Johnson', department: 'cardiology' },
    { id: '2', fullName: 'Bob Wilson', department: 'surgery' },
];

const NursesPage: React.FC = () => {
    const isMobile = useMobileView();
    const [nurses, setNurses] = useState<Nurse[]>(mockNurses);
    const [showForm, setShowForm] = useState(false);
    const [selectedNurse, setSelectedNurse] = useState<Nurse | null>(null);

    const handleDelete = (id: string) => {
        setNurses(nurses.filter(nurse => nurse.id !== id));
    };

    const handleSubmit = (data: Omit<Nurse, 'id'>) => {
        if (selectedNurse) {
            setNurses(nurses.map(n =>
                n.id === selectedNurse.id ? { ...data, id: n.id } : n
            ));
        } else {
            setNurses([...nurses, { ...data, id: Date.now().toString() }]);
        }
        setShowForm(false);
    };

    const renderMobileView = () => (
        <div className="row g-3">
            {nurses.map(nurse => (
                <div key={nurse.id} className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title text-truncate" title={nurse.fullName}>
                                {nurse.fullName}
                            </h5>
                            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="badge bg-primary">
                {nurse.department}
              </span>
                            </div>
                            <div className="d-flex justify-content-end gap-2">
                                <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() => {
                                        setSelectedNurse(nurse);
                                        setShowForm(true);
                                    }}
                                >
                                    <Pencil size={16} />
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(nurse.id)}
                                >
                                    <Trash size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderDesktopView = () => (
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {nurses.map(nurse => (
                <tr key={nurse.id}>
                    <td className="text-truncate" title={nurse.fullName}>
                        {nurse.fullName}
                    </td>
                    <td>{nurse.department}</td>
                    <td>
                        <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => {
                                setSelectedNurse(nurse);
                                setShowForm(true);
                            }}
                        >
                            <Pencil size={16} />
                        </button>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(nurse.id)}
                        >
                            <Trash size={16} />
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Nurses</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setSelectedNurse(null);
                        setShowForm(true);
                    }}
                >
                    <Plus size={20} /> Add Nurse
                </button>
            </div>

            {isMobile ? renderMobileView() : renderDesktopView()}

            {showForm && (
                <EmployeeForm
                    initialData={selectedNurse}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setSelectedNurse(null);
                    }}
                    isDoctor={false}
                />
            )}
        </div>
    );
};

export default NursesPage;