import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';

const ProductTable = forwardRef(({ onSelectionChange }, ref) => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);  
  const [viewProduct, setViewProduct] = useState(null); 
  const [search, setSearch] = useState('');
  const limit = 10; 

  const fetchProducts = async (pageNum) => { 
    try { 
      const res = await axios.get(`http://localhost:9000/api/products?page=${pageNum}&limit=${limit}`);
      setProducts(res.data.products || []);
      setTotalPages(res.data.totalPages || 1); 
      setSelected([]); 
    } catch (error) { 
      console.error('Error fetching products:', error);
      setProducts([]); 
    } 
  }; 

  useEffect(() => { 
    fetchProducts(page); 
  }, [page]); 

  useEffect(() => { 
    if (onSelectionChange) onSelectionChange(selected);
  }, [selected, onSelectionChange]); 

  const toggleSelectAll = () => {
    setSelected(prev => (prev.length === filteredProducts.length ? [] : filteredProducts.map(p => p._id)));
  };

  const toggleSelect = (id) => { 
    setSelected(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
  }; 

  const handleDelete = async (id) => { 
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`http://localhost:9000/api/products/${id}`);
      fetchProducts(page);
    } catch (err) {
      console.error('Delete failed', err); 
    }
  };

  const handleBulkDelete = async () => {  
    if (selected.length === 0) return alert("Select products to delete.");
    if (!window.confirm("Delete selected products?")) return; 

    try { 
      await Promise.all(selected.map(id => axios.delete(`http://localhost:9000/api/products/${id}`)));
      fetchProducts(page); 
    } catch (error) {   
      console.error("Error deleting:", error);  
    }  
  }; 

  useImperativeHandle(ref, () => ({ handleBulkDelete }));  

  const handlePageChange = (newPage) => {  
    if (newPage > 0 && newPage <= totalPages) setPage(newPage);  
  }; 

  const exportData = (type) => { 
    const selectedProducts = products.filter(p => selected.includes(p._id)); 
    if (selectedProducts.length === 0) return alert("Select products to export."); 

    const data = selectedProducts.map(p => ({ 
      'Product Name': p.productName,
      Category: p.category, 
      Price: p.price,
      Rating: p.rating, 
    })); 

    if (type === 'pdf') { 
      const doc = new jsPDF(); 
      doc.text('Selected Products', 14, 10);
      autoTable(doc, {
        head: [['Product Name', 'Category', 'Price', 'Rating']], 
        body: data.map(d => Object.values(d)),
        startY: 20,
      });
      doc.save('selected-products.pdf'); 
    } else if (type === 'excel') {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
      const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      saveAs(new Blob([buffer]), 'selected-products.xlsx');
    } else if (type === 'csv') {
      const header = Object.keys(data[0]);
      const rows = data.map(d => header.map(key => d[key]));
      const csv = [header.join(','), ...rows.map(r => r.join(','))].join('\n');
      saveAs(new Blob([csv], { type: 'text/csv' }), 'selected-products.csv');
    } 
  }; 

  const handleView = (product) => {  
    setViewProduct(product); 
  }; 

  const closeModal = () => setViewProduct(null); 

  const filteredProducts = products.filter(p =>
    p.productName?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase()) ||
    String(p.price).includes(search) ||
    String(p.rating).includes(search) 
  );

  return (
    <div> 
      <div className="mb-2 d-flex justify-content-between align-items-center">
        <input
          type="text" 
          className="form-control w-50"
          placeholder="Search by name, category, price or rating..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div>
          <button onClick={() => exportData('pdf')} className="btn btn-danger btn-sm mx-1">Export PDF</button>
          <button onClick={() => exportData('excel')} className="btn btn-success btn-sm mx-1">Export Excel</button>
          <button onClick={() => exportData('csv')} className="btn btn-primary btn-sm mx-1">Export CSV</button>
        </div>
      </div>

      <div className="table-responsive"> 
        <table className="table table-bordered table-hover">
          <thead> 
            <tr>
              <th><input type="checkbox" onChange={toggleSelectAll} checked={selected.length === filteredProducts.length && filteredProducts.length > 0} /></th>
              <th>Image</th> 
              <th>Product Name</th> 
              <th>Category</th> 
              <th>Price</th> 
              <th>Rating</th> 
              <th>Actions</th> 
            </tr> 
          </thead>  
          <tbody> 
            {filteredProducts.length === 0 ? (  
              <tr><td colSpan="7">No products found.</td></tr> 
            ) : (
              filteredProducts.map(product => (  
                <tr key={product._id}>  
                  <td> 
                    <input 
                      type="checkbox" 
                      checked={selected.includes(product._id)} 
                      onChange={() => toggleSelect(product._id)} 
                    /> 
                  </td> 
                  <td>  
                    {product.image ? (  
                      <img 
                        src={`http://localhost:9000/${product.image}`} 
                        alt="Product" 
                        style={{ width: 50, height: 50, objectFit: 'cover' }} 
                      /> 
                    ) : "No image"}  
                  </td> 
                  <td>{product.productName}</td>  
                  <td>{product.category}</td>  
                  <td>{product.price}</td>  
                  <td>{product.rating || 0}</td>  
                  <td>  
                    <button onClick={() => handleView(product)} className="btn btn-info btn-sm mx-1">
                      <i className="fa fa-eye"></i>
                    </button>  
                    <Link to={`/add-product/${product._id}`} className="btn btn-primary btn-sm mx-1">
                      <i className="fa fa-pencil"></i>
                    </Link>    
                    <button onClick={() => handleDelete(product._id)} className="btn btn-danger btn-sm mx-1">
                      <i className="fa fa-trash"></i>
                    </button>  
                  </td> 
                </tr> 
              )) 
            )} 
          </tbody> 
        </table> 
      </div> 

      <div className="d-flex justify-content-between mt-2"> 
        <button disabled={page <= 1} onClick={() => handlePageChange(page - 1)} className="btn btn-outline-secondary btn-sm">Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => handlePageChange(page + 1)} className="btn btn-outline-secondary btn-sm">Next</button>
      </div>

      {viewProduct && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Product Details</h5>
                <button onClick={closeModal} className="btn-close"></button>
              </div>
              <div className="modal-body"> 
                <p><strong>Name:</strong> {viewProduct.productName}</p>
                <p><strong>Category:</strong> {viewProduct.category}</p>
                <p><strong>Price:</strong> ${viewProduct.price}</p>
                <p><strong>Quantity:</strong> {viewProduct.quantity}</p>
                <p><strong>Status:</strong> {viewProduct.status}</p>
                <p><strong>Rating:</strong> {viewProduct.rating}</p>
                {viewProduct.image && ( 
                  <img
                    src={`http://localhost:9000/${viewProduct.image}`}
                    alt="Product"
                    className="img-fluid"
                    style={{ maxHeight: '300px', objectFit: 'cover' }}
                  />
                )}
              </div>
              <div className="modal-footer">
                <button onClick={closeModal} className="btn btn-secondary">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default ProductTable;
