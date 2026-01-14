import prisma from '@/lib/prisma';
import { getTranslations } from 'next-intl/server';
import StatusSelector from '@/components/dashboard/appointments/StatusSelector';

export default async function AppointmentsPage() {
    const t = await getTranslations('Dashboard');
    const appointments = await prisma.appointmentRequest.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="container-fluid p-4">
            <h1 className="h3 mb-4 text-gray-800">Appointment Requests</h1>

            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Recent Requests</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Service</th>
                                    <th>Notes</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center p-4">No appointment requests yet.</td>
                                    </tr>
                                ) : (
                                    appointments.map((apt) => (
                                        <tr key={apt.id}>
                                            <td className="fw-bold">{apt.name}</td>
                                            <td>
                                                <a href={`tel:${apt.phone}`} className="text-decoration-none">{apt.phone}</a>
                                            </td>
                                            <td>
                                                <span className="badge bg-info text-dark">{apt.serviceType}</span>
                                            </td>
                                            <td>{apt.notes || '-'}</td>
                                            <td>
                                                <StatusSelector id={apt.id} currentStatus={apt.status} />
                                            </td>
                                            <td>{new Date(apt.createdAt).toLocaleDateString()} {new Date(apt.createdAt).toLocaleTimeString()}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
