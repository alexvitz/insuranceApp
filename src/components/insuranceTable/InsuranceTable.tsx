import React, { useState } from 'react';
import { InsuranceData } from './InsuranceData';
import InsuranceOffersModal from '../insuranceOffersModal/InsuranceOffersModal';
import '../../styles/styles.scss';

const insuranceCompanies = [
  'Omniasig VIG (Vienna Insurance Group)',
  'Groupama',
  'Allianz-Țiriac',
  'Generali România',
  'Asirom Vig',
  'Uniqa',
  'Allianz-Țiriac Unit',
  'Euroins România',
  'Garanta',
  'Ergo',
];

interface InsuranceTableProps {
  data: InsuranceData[];
}

const InsuranceTable: React.FC<InsuranceTableProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedOffers, setSelectedOffers] = useState<
    { company: string; offer: string }[]
  >([]);

  const generateRandomNumber = (index: number): string => {
    const integerPart = Math.floor(Math.random() * 1000);
    const decimalPart = (Math.random() * 100).toFixed(2);
    return `${integerPart}.${decimalPart.slice(0, 2)}`;
  };

  const generateOffers = () => {
    return insuranceCompanies.map((company, index) => ({
      company,
      offer: `${generateRandomNumber(index)} RON`,
    }));
  };

  const openModal = (offers: { company: string; offer: string }[]) => {
    setSelectedOffers(offers);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="border-dark border-top p-2">
      <table>
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Date of Birth</th>
            <th>Insurance Type</th>
            <th>Chassis Series</th>
            <th>Car Kilometers</th>
            <th>Car Manufacturer</th>
            <th>Date of Fabrication</th>
            <th>Registration Number</th>
            <th>Offers</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.lastName}</td>
              <td>{item.firstName || ' - '}</td>
              <td>{item.dateOfBirth}</td>
              <td>{item.insuranceType}</td>
              <td>{item.chassisSeries || ' - '}</td>
              <td>{item.carKilometers || ' - '}</td>
              <td>{item.carManufacturer || ' - '}</td>
              <td>{item.dateOfFabrication || ' - '}</td>
              <td>{item.registrationNumber || ' - '}</td>
              <td className="d-flex align-items-center p-1">
                <button
                  onClick={() => openModal(generateOffers())}
                  className="viewOffersBtn"
                >
                  View Offers
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <InsuranceOffersModal
          isOpen={isModalOpen}
          onClose={closeModal}
          offers={selectedOffers}
        />
      </div>
    </div>
  );
};

export default InsuranceTable;
