
import React, { useState } from 'react';
import { useBranches } from '../../hooks/useBranches';

const PatientRegistration = ({ onSubmit, isOnline = true, loading = false }) => {
  const { branches } = useBranches();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    diabetesType: '',
    branchId: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalHistory: '',
    currentMedications: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.diabetesType) newErrors.diabetesType = 'Diabetes type is required';
    if (!formData.branchId) newErrors.branchId = 'Branch selection is required';

    if (isOnline && !formData.email.trim()) {
      newErrors.email = 'Email is required for online registration';
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

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
        <h2>{isOnline ? 'Online Patient Registration' : 'Offline Patient Registration'}</h2>
        <p>
          {isOnline 
            ? 'Patient self-registration form for online appointments' 
            : 'Staff registration form for walk-in patients'
          }
        </p>
      </div>

      <div className="form__grid">
        <div className="form__group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'error' : ''}
            placeholder="Enter first name"
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>

        <div className="form__group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'error' : ''}
            placeholder="Enter last name"
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>

        <div className="form__group">
          <label htmlFor="email">Email {isOnline && '*'}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            placeholder="Enter email address"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form__group">
          <label htmlFor="mobile">Mobile Number *</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className={errors.mobile ? 'error' : ''}
            placeholder="Enter 10-digit mobile number"
          />
          {errors.mobile && <span className="error-message">{errors.mobile}</span>}
        </div>

        <div className="form__group">
          <label htmlFor="dateOfBirth">Date of Birth *</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={errors.dateOfBirth ? 'error' : ''}
          />
          {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
        </div>

        <div className="form__group">
          <label htmlFor="gender">Gender *</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={errors.gender ? 'error' : ''}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <span className="error-message">{errors.gender}</span>}
        </div>

        <div className="form__group">
          <label htmlFor="diabetesType">Diabetes Type *</label>
          <select
            id="diabetesType"
            name="diabetesType"
            value={formData.diabetesType}
            onChange={handleChange}
            className={errors.diabetesType ? 'error' : ''}
          >
            <option value="">Select Diabetes Type</option>
            <option value="Type 1">Type 1</option>
            <option value="Type 2">Type 2</option>
            <option value="Gestational">Gestational</option>
            <option value="Pre-diabetes">Pre-diabetes</option>
          </select>
          {errors.diabetesType && <span className="error-message">{errors.diabetesType}</span>}
        </div>

        <div className="form__group">
          <label htmlFor="branchId">Preferred Branch *</label>
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
      </div>

      <div className="form__grid">
        <div className="form__group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter complete address"
            rows="3"
          />
        </div>

        <div className="form__group">
          <label htmlFor="emergencyContact">Emergency Contact Name</label>
          <input
            type="text"
            id="emergencyContact"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            placeholder="Enter emergency contact name"
          />
        </div>

        <div className="form__group">
          <label htmlFor="emergencyPhone">Emergency Contact Phone</label>
          <input
            type="tel"
            id="emergencyPhone"
            name="emergencyPhone"
            value={formData.emergencyPhone}
            onChange={handleChange}
            placeholder="Enter emergency contact phone"
          />
        </div>

        <div className="form__group">
          <label htmlFor="medicalHistory">Medical History</label>
          <textarea
            id="medicalHistory"
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
            placeholder="Enter relevant medical history"
            rows="3"
          />
        </div>

        <div className="form__group">
          <label htmlFor="currentMedications">Current Medications</label>
          <textarea
            id="currentMedications"
            name="currentMedications"
            value={formData.currentMedications}
            onChange={handleChange}
            placeholder="List current medications"
            rows="3"
          />
        </div>
      </div>

      <div className="form__actions">
        <button type="button" className="btn secondary">
          Cancel
        </button>
        <button type="submit" className="btn primary" disabled={loading}>
          {loading ? 'Registering...' : 'Register Patient'}
        </button>
      </div>
    </form>
  );
};

export default PatientRegistration;
