import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const CategoryTable = ({ onSelectionChange }) => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const limit = 10;

  const fetchCategories = async (pageNum) => {
    try {
      const res = await axios.get(`http://localhost:9000/api/categories?page=${pageNum}&limit=${limit}`);
      const sorted = res.data.categories?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) || [];
      setCategories(sorted);
      setTotalPages(res.data.totalPages || 1);
      setSelected([]);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories(page);
  }, [page]);

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selected);
    }
  }, [selected, onSelectionChange]);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allSelected = selected.length === filteredCategories.length && filteredCategories.length > 0;

  const toggleSelectAll = () => {
    const visibleIds = filteredCategories.map(cat => cat._id);
    const newSelected = allSelected
      ? selected.filter(id => !visibleIds.includes(id))
      : [...selected, ...visibleIds.filter(id => !selected.includes(id))];
    setSelected(newSelected);
  };

  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id) => {
    if (!selected.includes(id)) {
      alert("Please select the checkbox before deleting.");
      return;
    }

    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await axios.delete(`http://localhost:9000/api/categories/${id}`);
      alert('Category deleted successfully');
      setCategories(prev => prev.filter(cat => cat._id !== id));
      setSelected(prev => prev.filter(sel => sel !== id));
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete category');
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const exportSelectedToPDF = () => {
    const doc = new jsPDF();
    doc.text('Selected Categories', 14, 10);

    const selectedCategories = filteredCategories.filter(cat => selected.includes(cat._id));

    if (selectedCategories.length === 0) {
      alert("Please select at least one category to export.");
      return;
    }

    const tableData = selectedCategories.map(cat => [cat.name]);

    autoTable(doc, {
      head: [['Category Name']],
      body: tableData,
      startY: 20,
    });

    doc.save('selected-categories.pdf');
  };

  const exportSelectedToExcel = () => {
    const selectedCategories = filteredCategories.filter(cat => selected.includes(cat._id));
    if (selectedCategories.length === 0) {
      alert("Please select at least one category to export.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(selectedCategories.map(cat => ({ Name: cat.name })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Categories');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'selected-categories.xlsx');
  };

  const exportSelectedToCSV = () => {
    const selectedCategories = filteredCategories.filter(cat => selected.includes(cat._id));
    if (selectedCategories.length === 0) {
      alert("Please select at least one category to export.");
      return;
    }

    const csvContent = "data:text/csv;charset=utf-8," +
      ['Category Name', ...selectedCategories.map(cat => cat.name)].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "selected-categories.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  return (
    <>
      <div className="mb-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <button onClick={exportSelectedToPDF} className="btn btn-danger btn-sm mx-1">Export PDF</button>
          <button onClick={exportSelectedToExcel} className="btn btn-success btn-sm mx-1">Export Excel</button>
          <button onClick={exportSelectedToCSV} className="btn btn-primary btn-sm mx-1">Export CSV</button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-center">
                <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} />
              </th>
              <th className="text-left" style={{ color: "#14628c" }}>Category Name</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <tr key={category._id}>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(category._id)}
                      onChange={() => toggleSelect(category._id)}
                    />
                  </td>
                  <td className="text-left" dangerouslySetInnerHTML={{ __html: category.name }} />
                  <td className="text-center">
                    <button
                      className="btn btn-info btn-sm mx-1"
                      title="View"
                      onClick={() => handleView(category)}
                    >
                      <i className="fa fa-eye"></i>
                    </button>
                    <Link
                      to={`/add-category/${category._id}`}
                      className="btn btn-primary btn-sm mx-1"
                      title="Edit"
                    >
                      <i className="fa fa-pencil"></i>
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm mx-1"
                      title="Delete"
                      onClick={() => handleDelete(category._id)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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

      {/* Modal for Viewing Category */}
      {showModal && selectedCategory && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Category Details</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Category Name:</strong></p>
                <div dangerouslySetInnerHTML={{ __html: selectedCategory.name }} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryTable;
