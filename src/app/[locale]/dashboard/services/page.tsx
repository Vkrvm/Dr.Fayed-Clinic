'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, GripVertical, Star } from 'lucide-react';
import { useServices } from '@/hooks/useServices';
import { toggleFeatured, updateDisplayOrder } from '@/lib/actions/services';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from './ServicesPage.module.scss';

interface SortableRowProps {
    service: any;
    onDelete: (id: string) => void;
    onToggleFeatured: (id: string) => void;
    featuredCount: number;
}

function SortableRow({ service, onDelete, onToggleFeatured, featuredCount }: SortableRowProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: service.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isDragging ? '#f0f0f0' : undefined,
    };

    const canFeature = service.isFeatured || featuredCount < 3;

    return (
        <tr ref={setNodeRef} style={style}>
            <td>
                <button
                    {...attributes}
                    {...listeners}
                    className={styles.dragHandle}
                    title="Drag to reorder"
                >
                    <GripVertical size={18} />
                </button>
            </td>
            <td>
                <button
                    className={`${styles.featuredBtn} ${service.isFeatured ? styles.featured : ''}`}
                    onClick={() => onToggleFeatured(service.id)}
                    disabled={!canFeature && !service.isFeatured}
                    title={service.isFeatured ? 'Remove from landing page' : 'Show on landing page'}
                >
                    <Star size={18} fill={service.isFeatured ? '#ffc107' : 'none'} />
                </button>
            </td>
            <td>{service.title_en}</td>
            <td>{service.title_ar}</td>
            <td>
                <span className={styles.iconBadge}>{service.icon}</span>
            </td>
            <td>
                <div className={styles.actions}>
                    <Link
                        href={`/en/dashboard/services/${service.id}/edit`}
                        className={styles.editBtn}
                    >
                        <Edit size={16} />
                        Edit
                    </Link>
                    <button
                        className={styles.deleteBtn}
                        onClick={() => onDelete(service.id)}
                    >
                        <Trash2 size={16} />
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default function ServicesManagementPage() {
    const { services, isLoaded, deleteService, refreshServices } = useServices();
    const [orderedServices, setOrderedServices] = useState(services);
    const [featuredCount, setFeaturedCount] = useState(0);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        // Sort by displayOrder, then by createdAt
        const sorted = [...services].sort((a, b) =>
            (a.displayOrder ?? 999) - (b.displayOrder ?? 999)
        );
        setOrderedServices(sorted);
        setFeaturedCount(services.filter(s => s.isFeatured).length);
    }, [services]);

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = orderedServices.findIndex(s => s.id === active.id);
            const newIndex = orderedServices.findIndex(s => s.id === over.id);

            const newOrder = arrayMove(orderedServices, oldIndex, newIndex);
            setOrderedServices(newOrder);

            // Save new order to database
            const orderedIds = newOrder.map(s => s.id);
            await updateDisplayOrder(orderedIds);
            await refreshServices();
        }
    };

    const handleToggleFeatured = async (id: string) => {
        const result = await toggleFeatured(id);
        if (!result.success) {
            alert(result.error);
        }
        await refreshServices();
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this service?')) {
            try {
                await deleteService(id);
                alert('Service deleted successfully!');
            } catch (error) {
                console.error('Delete failed:', error);
                alert('Failed to delete service.');
            }
        }
    };

    if (!isLoaded) {
        return <div className={styles.container}>Loading services...</div>;
    }

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Services Management</h1>
                        <p className={styles.subtitle}>
                            Manage all medical services •
                            <span className={styles.featuredInfo}>
                                {featuredCount}/3 featured on landing page
                            </span>
                        </p>
                    </div>
                    <Link href="/en/dashboard/services/new" className={styles.addBtn}>
                        <Plus size={20} />
                        Add New Service
                    </Link>
                </div>

                <div className={styles.tableContainer}>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th style={{ width: '50px' }}>Order</th>
                                    <th style={{ width: '60px' }}>Featured</th>
                                    <th>Title (English)</th>
                                    <th>Title (Arabic)</th>
                                    <th>Icon</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <SortableContext
                                    items={orderedServices.map(s => s.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {orderedServices.map((service) => (
                                        <SortableRow
                                            key={service.id}
                                            service={service}
                                            onDelete={handleDelete}
                                            onToggleFeatured={handleToggleFeatured}
                                            featuredCount={featuredCount}
                                        />
                                    ))}
                                </SortableContext>
                            </tbody>
                        </table>
                    </DndContext>
                </div>
            </div>
        </div>
    );
}
