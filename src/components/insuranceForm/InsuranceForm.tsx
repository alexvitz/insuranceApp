import React, { useState } from 'react';
import { InsuranceFormData } from './insuranceTypes';

interface InsuranceFormProps {
  onSubmit: (data: InsuranceFormData) => void;
}

const InsuranceForm: React.FC<InsuranceFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<InsuranceFormData>({
    lastName: '',
    firstName: '',
    dateOfBirth: '',
    insuranceType: 'casco',
    carManufacture: '',
    dateOfFabrication: '',
    registrationNumber: '',
    chassisSeries: '',
    carKilometers: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<InsuranceFormData>>({});
  const [isFormVisible, setFormVisible] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const validateForm = () => {
    const errors: Partial<InsuranceFormData> = {};

    if (!formData.lastName || formData.lastName.length < 3) {
      errors.lastName = 'Last Name must be at least 3 characters long';
    }

    if (formData.firstName && formData.firstName.length > 10) {
      errors.firstName = 'First Name must be at most 10 characters long';
    }

    if (
      !formData.dateOfBirth ||
      !/^\d{4}-\d{2}-\d{2}$/.test(formData.dateOfBirth)
    ) {
      errors.dateOfBirth = 'Invalid Date of Birth. Use yyyy-mm-dd format.';
    } else {
      const [year] = formData.dateOfBirth.split('-');
      const currentYear = new Date().getFullYear();
      if (+year < 1900 || +year > currentYear) {
        errors.dateOfBirth = 'Year must be between 1900 and the current year.';
      }
    }

    if (!formData.insuranceType) {
      errors.insuranceType = 'Insurance Type is required.';
    }

    if (formData.insuranceType === 'casco') {
      if (!formData.chassisSeries) {
        errors.chassisSeries =
          'Chassis Series is required for Casco insurance.';
      }
      if (!formData.carKilometers) {
        errors.carKilometers =
          'Car Kilometers is required for Casco insurance.';
      }
    } else if (formData.insuranceType === 'rca') {
      if (!formData.carManufacture) {
        errors.carManufacture =
          'Car Manufacture is required for RCA insurance.';
      }
      if (
        !formData.dateOfFabrication ||
        !/^\d{4}-\d{2}-\d{2}$/.test(formData.dateOfFabrication)
      ) {
        errors.dateOfFabrication =
          'Invalid Date of Fabrication. Use yyyy-mm-dd format.';
      }
      if (!formData.registrationNumber) {
        errors.registrationNumber =
          'Registration Number is required for RCA insurance.';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      onSubmit(formData);
      setFormVisible(false);
    }
  };

  const closeForm = () => {
    setFormVisible(false);
  };

  return (
    <>
      <div className="d-flex">
        <button onClick={() => setFormVisible(true)} className="button">
          Create Offer
        </button>
      </div>
      <div className="d-flex text-start my-3">
        {isFormVisible ? (
          <form onSubmit={handleSubmit} className="w-50">
            <div className="d-flex justify-content-between mb-1">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="input"
              />
              {formErrors.lastName && (
                <div className="text-danger">{formErrors.lastName}</div>
              )}
            </div>
            <div className="d-flex justify-content-between mb-1">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="input"
              />
              {formErrors.firstName && (
                <div className="text-danger">{formErrors.firstName}</div>
              )}
            </div>
            <div className="d-flex justify-content-between mb-1">
              <label>Date of Birth (yyyy-mm-dd):</label>
              <input
                type="text"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="input"
              />
              {formErrors.dateOfBirth && (
                <div className="text-danger">{formErrors.dateOfBirth}</div>
              )}
            </div>
            <div className="d-flex justify-content-between mb-1">
              <label>Insurance Type:</label>
              <select
                name="insuranceType"
                value={formData.insuranceType}
                onChange={handleChange}
                required
                className="custom-select"
              >
                <option value="">Select</option>
                <option value="casco">Casco</option>
                <option value="rca">RCA</option>
              </select>
              {formErrors.insuranceType && (
                <div className="text-danger">{formErrors.insuranceType}</div>
              )}
            </div>
            {formData.insuranceType === 'casco' && (
              <>
                <div className="d-flex justify-content-between mb-1">
                  <label>Chassis Series:</label>
                  <input
                    type="text"
                    name="chassisSeries"
                    value={formData.chassisSeries}
                    onChange={handleChange}
                    className="input"
                  />
                  {formErrors.chassisSeries && (
                    <div className="text-danger">
                      {formErrors.chassisSeries}
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <label>Car Kilometers:</label>
                  <input
                    type="text"
                    name="carKilometers"
                    value={formData.carKilometers}
                    onChange={handleChange}
                    className="input"
                  />
                  {formErrors.carKilometers && (
                    <div className="text-danger">
                      {formErrors.carKilometers}
                    </div>
                  )}
                </div>
              </>
            )}
            {formData.insuranceType === 'rca' && (
              <>
                <div className="d-flex justify-content-between mb-1">
                  <label>Car Manufacture:</label>
                  <input
                    type="text"
                    name="carManufacture"
                    value={formData.carManufacture}
                    onChange={handleChange}
                    className="input"
                  />
                  {formErrors.carManufacture && (
                    <div className="text-danger">
                      {formErrors.carManufacture}
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <label>Date of Fabrication (yyyy-mm-dd):</label>
                  <input
                    type="text"
                    name="dateOfFabrication"
                    value={formData.dateOfFabrication}
                    onChange={handleChange}
                    className="input"
                  />
                  {formErrors.dateOfFabrication && (
                    <div className="text-danger">
                      {formErrors.dateOfFabrication}
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <label>Registration Number:</label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    className="input"
                  />
                  {formErrors.registrationNumber && (
                    <div className="text-danger">
                      {formErrors.registrationNumber}
                    </div>
                  )}
                </div>
              </>
            )}
            <div className="d-flex align-items-center">
              <button type="submit" className="sendFormBtn">
                Send Form
              </button>
              <button type="submit" onClick={closeForm} className="closeBtn">
                Close
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </>
  );
};

export default InsuranceForm;
