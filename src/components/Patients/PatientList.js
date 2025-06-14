
import React, { useState } from 'react';
import { Search, Edit, Trash2, Eye, Filter } from 'lucide-react';

const PatientList = ({ patients, onEdit, onDelete, onView, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.mobile.includes(searchTerm) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterType === 'all' || patient.registrationType === filterType;

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPatients = filteredPatients.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-container__header">
        <h3>Patient Records</h3>
        <div className="actions">
          <div className="search">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="referral">Referral</option>
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Diabetes Type</th>
            <th>Registration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPatients.map((patient) => (
            <tr key={patient.id}>
              <td>#{patient.id}</td>
              <td>
                <div>
                  <strong>{patient.firstName} {patient.lastName}</strong>
                  <br />
                  <small>{patient.gender}, {new Date(patient.dateOfBirth).getFullYear()}</small>
                </div>
              </td>
              <td>
                <div>
                  <div>{patient.mobile}</div>
                  <small>{patient.email}</small>
                </div>
              </td>
              <td>
                <span className={`badge ${patient.diabetesType === 'Type 1' ? 'active' : 'pending'}`}>
                  {patient.diabetesType}
                </span>
              </td>
              <td>
                <span className={`badge ${patient.registrationType}`}>
                  {patient.registrationType}
                </span>
              </td>
              <td>{formatDate(patient.registrationDate)}</td>
              <td className="actions">
                <button
                  className="btn-icon view"
                  onClick={() => onView && onView(patient)}
                  title="View Details"
                >
                  <Eye size={16} />
                </button>
                <button
                  className="btn-icon edit"
                  onClick={() => onEdit && onEdit(patient)}
                  title="Edit Patient"
                >
                  <Edit size={16} />
                </button>
                <button
                  className="btn-icon delete"
                  onClick={() => onDelete && onDelete(patient.id)}
                  title="Delete Patient"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredPatients.length === 0 && (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
          No patients found matching your criteria.
        </div>
      )}

      {totalPages > 1 && (
        <div className="table-container__footer">
          <div>
            Showing {startIndex + 1} to {startIndex + paginatedPatients.length} of {filteredPatients.length} patients
          </div>
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? 'active' : ''}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientList;
