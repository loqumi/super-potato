import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Doctor, Nurse, Department } from '../types';

interface CommonProps {
    onCancel: () => void;
    initialData?: Doctor | Nurse | null;
}

interface DoctorFormProps extends CommonProps {
    isDoctor: true;
    onSubmit: (data: Omit<Doctor, 'id'>) => void;
}

interface NurseFormProps extends CommonProps {
    isDoctor: false;
    onSubmit: (data: Omit<Nurse, 'id'>) => void;
}

type EmployeeFormProps = DoctorFormProps | NurseFormProps;

const EmployeeForm: React.FC<EmployeeFormProps> = ({
    initialData,
    onSubmit,
    onCancel,
    isDoctor
}) => {
    const [fullName, setFullName] = useState('');
    const [department, setDepartment] = useState<Department>('cardiology');
    const [isHead, setIsHead] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFullName(initialData.fullName);
            setDepartment(initialData.department);
            if (isDoctor && 'isHead' in initialData) {
                setIsHead((initialData as Doctor).isHead);
            }
        }
    }, [initialData, isDoctor]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName.trim()) return;

        if (isDoctor) {
            const doctorData = { fullName, department, isHead };
            onSubmit(doctorData);
        } else {
            const nurseData = { fullName, department };
            onSubmit(nurseData);
        }
    };

    return (
        <Modal show={true} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{initialData ? 'Edit' : 'Add'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={fullName}
                            maxLength={30}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Department</Form.Label>
                        <Form.Select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value as Department)}
                        >
                            <option value="cardiology">Cardiology</option>
                            <option value="surgery">Surgery</option>
                        </Form.Select>
                    </Form.Group>

                    {isDoctor && (
                        <Form.Group className="mb-3">
                            <Form.Check
                                label="Head of Department"
                                checked={isHead}
                                onChange={(e) => setIsHead(e.target.checked)}
                            />
                        </Form.Group>
                    )}

                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                        <Button variant="primary" type="submit">Save</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EmployeeForm;