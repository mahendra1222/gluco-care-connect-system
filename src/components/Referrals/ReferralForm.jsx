
import React, { useState } from 'react';
import { usePatients } from '../../hooks/usePatients';
import { useDoctors } from '../../hooks/useDoctors';
import { useBranches } from '../../hooks/useBranches';

const ReferralForm = ({ onSubmit, loading = false }) => {
  const { patients } = usePatients();
  const { doctors } = useDoctors();
  const { branches } = useBranches();

  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    branchId: '',
    reason: '',
    notes: '',
    urgency: 'normal',
    preferredDate: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientId) newErrors.patientId = 'Patient selection is required';
    if (!formData.doctorId) newErrors.doctorId = 'Referring doctor is required';
    if (!formData.branchId) newErrors.branchId = 'Branch selection is required';
    if (!formData.reason.trim()) newErrors.reason = 'Referral reason is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__header">
        <h2>Create Patient Referral</h2>
        <p>Register a patient referral from an external doctor</p>
      </div>

      <div className="form__grid">
        <div className="form__group">
          <label htmlFor="patientId">Patient *</label>
          <select
            id="patientId"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            className={errors.patientId ? 'error' : ''}
          >
            <option value="">Select Patient</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>
                {patient.firstName} {patient.lastName} - {patient.mobile}
              </option>
            ))}
          </select>
          {errors.patientId && <span className="error-message">{errors.patientId}</span>}
        </div>

        <div className="form__group">
          <label htmlFor="doctorId">Referring Doctor *</label>
          <select
            id="doctorId"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            className={errors.doctorId ? 'error' : ''}
          >
            <option value="">Select Doctor</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>
          {errors.doctorId && <span className="error-message">{errors.doctorId}</span>}
        </div>

        <div className="form__group">
          <label htmlFor="branchId">Target Branch *</label>
          <select
            id="branchId"
            name="branchId"
            value={formData.branchId}
            onChange={handleChange}
            className={errors.branchId ? 'error' : ''}
          >
            <option value="">Select Branch</option>
            {branches.map(branch => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
          {errors.branchId && <span className="error-message">{errors.branchId}</span>}
        </div>

        <div className="form__group">
          <label htmlFor="urgency">Urgency Level</label>
          <select
            id="urgency"
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <div className="form__group">
          <label htmlFor="preferredDate">Preferred Date</label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <div className="form__group">
        <label htmlFor="reason">Referral Reason *</label>
        <textarea
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className={errors.reason ? 'error' : ''}
          placeholder="Enter the reason for referral"
          rows="4"
        />
        {errors.reason && <span className="error-message">{errors.reason}</span>}
      </div>

      <div className="form__group">
        <label htmlFor="notes">Additional Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any additional notes or special instructions"
          rows="4"
        />
      </div>

      <div className="form__actions">
        <button type="button" className="btn secondary">
          Cancel
        </button>
        <button type="submit" className="btn primary" disabled={loading}>
          {loading ? 'Creating Referral...' : 'Create Referral'}
        </button>
      </div>
    </form>
  );
};

export default ReferralForm;
