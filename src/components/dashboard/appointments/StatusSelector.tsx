'use client';

import { useState } from 'react';
import { updateAppointmentStatus } from '@/app/actions/appointment';

interface StatusSelectorProps {
    id: string;
    currentStatus: string;
}

export default function StatusSelector({ id, currentStatus }: StatusSelectorProps) {
    const [status, setStatus] = useState(currentStatus);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusChange = async (newStatus: string) => {
        setIsUpdating(true);
        // Optimistic update
        setStatus(newStatus);

        const result = await updateAppointmentStatus(id, newStatus);

        if (!result.success) {
            // Revert on failure
            setStatus(currentStatus);
            console.error(result.message);
        }
        setIsUpdating(false);
    };

    const getStatusColor = (s: string) => {
        switch (s) {
            case 'pending': return 'bg-warning text-dark';
            case 'contacted': return 'bg-info text-white';
            case 'completed': return 'bg-success text-white';
            case 'cancelled': return 'bg-danger text-white';
            default: return 'bg-secondary text-white';
        }
    };

    return (
        <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isUpdating}
            className={`form-select form-select-sm border-0 text-white ${getStatusColor(status)}`}
            style={{
                cursor: 'pointer',
                width: 'auto',
                display: 'inline-block',
                fontWeight: '500',
                textAlign: 'center',
                textAlignLast: 'center'
            }}
        >
            <option value="pending" className="bg-white text-dark">Pending</option>
            <option value="contacted" className="bg-white text-dark">Contacted</option>
            <option value="completed" className="bg-white text-dark">Completed</option>
            <option value="cancelled" className="bg-white text-dark">Cancelled</option>
        </select>
    );
}
