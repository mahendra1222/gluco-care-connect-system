
export const dummyPatients = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    mobile: '9876543210',
    dateOfBirth: '1985-05-15',
    gender: 'Male',
    address: '123 Main St, City',
    diabetesType: 'Type 2',
    branchId: 1,
    registrationType: 'online',
    registrationDate: '2024-01-15'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@email.com',
    mobile: '9876543211',
    dateOfBirth: '1990-08-22',
    gender: 'Female',
    address: '456 Oak Ave, City',
    diabetesType: 'Type 1',
    branchId: 2,
    registrationType: 'offline',
    registrationDate: '2024-01-16'
  },
  {
    id: 3,
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@email.com',
    mobile: '9876543212',
    dateOfBirth: '1978-12-03',
    gender: 'Male',
    address: '789 Pine St, City',
    diabetesType: 'Type 2',
    branchId: 1,
    registrationType: 'referral',
    registrationDate: '2024-01-17'
  }
];

export const dummyBranches = [
  {
    id: 1,
    name: 'NDC Main Hospital',
    address: '100 Healthcare Blvd, Medical District',
    phone: '555-0101',
    email: 'main@ndc.com',
    manager: 'Dr. Sarah Wilson'
  },
  {
    id: 2,
    name: 'NDC East Branch',
    address: '200 East Ave, East District',
    phone: '555-0102',
    email: 'east@ndc.com',
    manager: 'Dr. Robert Chen'
  },
  {
    id: 3,
    name: 'NDC West Branch',
    address: '300 West St, West District',
    phone: '555-0103',
    email: 'west@ndc.com',
    manager: 'Dr. Maria Garcia'
  }
];

export const dummyDoctors = [
  {
    id: 1,
    name: 'Dr. Emily Rodriguez',
    specialization: 'Endocrinology',
    phone: '555-0201',
    email: 'emily.rodriguez@external.com',
    hospital: 'City General Hospital',
    licenseNumber: 'MD12345'
  },
  {
    id: 2,
    name: 'Dr. David Kim',
    specialization: 'Internal Medicine',
    phone: '555-0202',
    email: 'david.kim@external.com',
    hospital: 'Metropolitan Medical Center',
    licenseNumber: 'MD12346'
  },
  {
    id: 3,
    name: 'Dr. Lisa Thompson',
    specialization: 'Family Medicine',
    phone: '555-0203',
    email: 'lisa.thompson@external.com',
    hospital: 'Community Health Center',
    licenseNumber: 'MD12347'
  }
];

export const dummyReferrals = [
  {
    id: 1,
    patientId: 3,
    doctorId: 1,
    referralDate: '2024-01-17',
    reason: 'Diabetes management consultation',
    notes: 'Patient requires specialized diabetes care',
    status: 'active',
    branchId: 1
  },
  {
    id: 2,
    patientId: 2,
    doctorId: 2,
    referralDate: '2024-01-16',
    reason: 'Blood sugar monitoring',
    notes: 'Regular monitoring required for Type 1 diabetes',
    status: 'completed',
    branchId: 2
  }
];
