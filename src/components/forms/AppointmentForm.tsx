'use client';

import { useActionState } from 'react'; // React 19 hook (was useFormState)
import { createAppointmentRequest, AppointmentState } from '@/app/actions/appointment';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

import { useState, useEffect } from 'react';
import Select from 'react-select';
// Using react-phone-input-2 for better UI
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Standard style

import styles from './AppointmentForm.module.scss';

const initialState: AppointmentState = {
    success: false,
    message: '',
    errors: {}
};

interface Service {
    id: string;
    title: string;
}

interface Option {
    value: string;
    label: string;
}

export default function AppointmentForm({ services }: { services: Service[] }) {
    const t = useTranslations('AppointmentForm');
    const [state, formAction, isPending] = useActionState(createAppointmentRequest, initialState);

    // Controlled state for enhanced inputs
    const [phoneValue, setPhoneValue] = useState<string | undefined>();
    const [selectedService, setSelectedService] = useState<Option | null>(null);

    // Prepare options for React Select
    const serviceOptions: Option[] = [
        ...services.map(s => ({ value: s.title, label: s.title })),
        { value: 'Other', label: t('fields.service.other') }
    ];

    // React Select Custom Styles to match Bootstrap theme
    const customSelectStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: '#f8f9fa', // bg-light
            borderColor: state.isFocused ? '#86b7fe' : 'transparent', // Bootstrap focus color or transparent
            borderWidth: '1px',
            borderRadius: 'var(--bs-border-radius-lg)',
            padding: '0.375rem 0.2rem', // Adjust for lg height
            boxShadow: state.isFocused ? '0 0 0 0.25rem rgba(13, 110, 253, 0.25)' : 'none',
            '&:hover': {
                borderColor: state.isFocused ? '#86b7fe' : '#dee2e6'
            }
        }),
        menu: (provided: any) => ({
            ...provided,
            zIndex: 9999
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: '#6c757d'
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: '#212529'
        })
    };

    if (state.success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="alert alert-success p-5 text-center shadow-sm rounded-4"
            >
                <h3 className="fw-bold mb-3 text-success">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    {t('successHeading')}
                </h3>
                <p className="lead mb-0">{t('successMessage')}</p>
            </motion.div>
        );
    }

    return (
        <form action={formAction} className="bg-white p-4 p-md-5 rounded-4 shadow-sm border border-light">
            {state.message && state.success === false && (
                <div className="alert alert-danger mb-4">{state.message}</div>
            )}

            {/* Name */}
            <div className="mb-4">
                <label htmlFor="name" className="form-label fw-bold text-dark">{t('fields.name.label')}</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className={`form-control form-control-lg bg-light border-0 ${state.errors?.name ? 'is-invalid' : ''}`}
                    placeholder={t('fields.name.placeholder')}
                />
                {state.errors?.name && <div className="invalid-feedback">{state.errors.name.join(', ')}</div>}
            </div>

            {/* Phone */}
            <div className="mb-4">
                <label htmlFor="phone-input" className="form-label fw-bold text-dark">{t('fields.phone.label')}</label>
                <div dir="ltr"> {/* Force LTR for phone input to avoid alignment issues */}
                    <PhoneInput
                        country={'eg'}
                        value={phoneValue}
                        onChange={phone => setPhoneValue(phone)}
                        enableSearch={true}
                        disableSearchIcon={true}
                        searchPlaceholder="Search country"
                        inputProps={{
                            id: 'phone-input',
                            required: true,
                            name: 'phone-visual', // not used for submission
                            placeholder: t('fields.phone.placeholder')
                        }}
                        containerClass="w-100"
                        // Classes are now fully handled in SCSS for consistency
                        inputClass="form-control"
                        buttonClass=""
                        dropdownClass=""
                    />
                </div>
                {/* Hidden input to pass value to server action */}
                <input type="hidden" name="phone" value={phoneValue || ''} />

                {state.errors?.phone && <div className="text-danger small mt-1">{state.errors.phone.join(', ')}</div>}
            </div>

            {/* Service Type */}
            <div className="mb-4">
                <label htmlFor="service-select" className="form-label fw-bold text-dark">{t('fields.service.label')}</label>
                <Select
                    instanceId="service-select"
                    options={serviceOptions}
                    value={selectedService}
                    onChange={setSelectedService}
                    placeholder={t('fields.service.placeholder')}
                    styles={customSelectStyles}
                    isSearchable={false}
                    classNamePrefix="react-select"
                />
                {/* Hidden input to pass value to server action */}
                <input type="hidden" name="serviceType" value={selectedService?.value || ''} />

                {state.errors?.serviceType && <div className="text-danger small mt-1">{state.errors.serviceType.join(', ')}</div>}
            </div>

            {/* Notes */}
            <div className="mb-4">
                <label htmlFor="notes" className="form-label fw-bold text-dark">{t('fields.notes.label')} <span className="text-secondary fw-normal fs-6">({t('optional')})</span></label>
                <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    className="form-control form-control-lg bg-light border-0"
                    placeholder={t('fields.notes.placeholder')}
                ></textarea>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isPending}
                className={`btn btn-lg w-100 py-3 fw-bold rounded-3 shadow-sm transition-all ${styles.submitBtn}`}
            >
                {isPending ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                ) : null}
                {t('submitButton')}
            </button>
        </form>
    );
}

