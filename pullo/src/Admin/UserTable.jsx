import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const limit = 10;

  const allSelected = selected.length === users.length && users.length > 0;

  const fetchUsers = async (pageNum) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:9000/api/users?page=${pageNum}&limit=10`);
      setUsers(res.data.users || []);
      setTotalPages(res.data.totalPages || 1);
      setSelected([]);
    } catch (err) {
      console.error('Error fetching users:', err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const toggleSelectAll = () => {
    setSelected(allSelected ? [] : filteredUsers.map(user => user._id));
  };

  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`http://localhost:9000/api/users/${id}`);
      alert('User deleted successfully');
      fetchUsers(page);
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete user');
    }
  };

  const selectedUsers = useMemo(() =>
    users.filter(user => selected.includes(user._id)),
    [users, selected]
  );

  const filteredUsers = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return users.filter(user =>
      user.firstName?.toLowerCase().includes(lowerSearch) ||
      user.email?.toLowerCase().includes(lowerSearch) ||
      user.number?.toLowerCase().includes(lowerSearch)
    );
  }, [users, searchTerm]);

  const exportToPDF = () => {
    if (selectedUsers.length === 0) return alert('Select users to export.');
    const doc = new jsPDF();
    doc.text('Selected Users', 14, 10);
    autoTable(doc, {
      head: [['Name', 'Email', 'Phone Number']],
      body: selectedUsers.map(user => [user.firstName, user.email, user.number]),
      startY: 20,
    });
    doc.save('selected-users.pdf');
  };

  const exportToExcel = () => {
    if (selectedUsers.length === 0) return alert('Select users to export.');
    const worksheet = XLSX.utils.json_to_sheet(selectedUsers.map(user => ({
      Name: user.firstName,
      Email: user.email,
      Phone: user.number
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'selected-users.xlsx');
  };

  const exportToCSV = () => {
    if (selectedUsers.length === 0) return alert('Select users to export.');
    const header = 'Name,Email,Phone\n';
    const rows = selectedUsers.map(user => `${user.firstName},${user.email},${user.number}`).join('\n');
    const csvContent = 'data:text/csv;charset=utf-8,' + header + rows;
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = 'selected-users.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      {/* User Detail Modal */}
      {showModal && viewUser && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {viewUser.firstName}</p>
                <p><strong>Email:</strong> {viewUser.email}</p>
                <p><strong>Phone Number:</strong> {viewUser.number}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Export Controls */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by name, email, phone"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div>
          <button onClick={exportToPDF} className="btn btn-danger btn-sm mx-1">Export PDF</button>
          <button onClick={exportToExcel} className="btn btn-success btn-sm mx-1">Export Excel</button>
          <button onClick={exportToCSV} className="btn btn-primary btn-sm mx-1">Export CSV</button>
        </div>
      </div>

      {loading ? (
        <div className="text-center p-3">Loading users...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th style={{ width: '1px' }} className="text-center">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={selected.includes(user._id)}
                        onChange={() => toggleSelect(user._id)}
                      />
                    </td>
                    <td>{user.firstName}</td>
                    <td>{user.email}</td>
                    <td>{user.number}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-info btn-sm mx-1"
                        title="View"
                        onClick={() => {
                          setViewUser(user);
                          setShowModal(true);
                        }}
                      >
                        <i className="fa fa-eye"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn btn-danger btn-sm mx-1"
                        title="Delete"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="pagination-controls text-center mt-3">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>Page {page} of {totalPages}</span>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default UserTable;
