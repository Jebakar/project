import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import autoTable from 'jspdf-autotable';
const OrderTable = () => {
  const [orders, setOrders] = useState([]); 
  const [filteredOrders, setFilteredOrders] = useState([]);  
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [viewOrder, setViewOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState(''); 
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [loading, setLoading] = useState(false); 

  const limit = 10;

  const fetchOrders = async (pageNum) => { 
    setLoading(true); 
    try {
      const res = await axios.get(`http://localhost:9000/api/orders?page=${pageNum}&limit=${limit}`);
      const fetchedOrders = res.data.orders || [];
      setOrders(fetchedOrders);
      setFilteredOrders(fetchedOrders); 
      setTotalPages(res.data.totalPages || 1); 
    } catch (err) {
      console.error('Error fetching orders:', err); 
      setOrders([]);
      setFilteredOrders([]);   
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchOrders(page); 
  }, [page]);

  const handlePageChange = (newPage) => { 
    if (newPage > 0 && newPage <= totalPages) { 
      setPage(newPage);
    }
  };

  const toggleOrderSelection = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map((order) => order._id));
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearch(term);
    setFilteredOrders(
      orders.filter((order) => {
        const name = order.userInfo?.name?.toLowerCase() || '';
        const email = order.userEmail?.toLowerCase() || '';
        const total = order.total?.toString();
        const payment = order.paymentMethod?.toLowerCase() || '';
        const date = new Date(order.createdAt).toLocaleDateString().toLowerCase();
        const productNames = order.items?.map(item => item.name?.toLowerCase()).join(' ') || '';
        return (
          name.includes(term) ||
          email.includes(term) ||
          total.includes(term) ||
          payment.includes(term) ||
          date.includes(term) ||
          productNames.includes(term)
        );
      })
    );
  };

 const exportPDF = () => {
  const doc = new jsPDF();
  const tableData = filteredOrders.map(order => [
    order.userInfo?.name || 'N/A',
    order.userEmail,
    `₹${order.total}`,
    order.paymentMethod,
    new Date(order.createdAt).toLocaleDateString(),
    order.items?.map(i => i.name).join(', ')
  ]);

  autoTable(doc, {
    head: [['Name', 'Email', 'Total', 'Payment', 'Date', 'Products']],
    body: tableData
  });

  doc.save('orders.pdf');
};


  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredOrders.map((order) => ({
        Name: order.userInfo?.name || 'N/A', 
        Email: order.userEmail,
        Total: order.total,
        PaymentMethod: order.paymentMethod,
        Date: new Date(order.createdAt).toLocaleDateString(),
        Products: order.items?.map(item => item.name).join(', ')
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orders');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'orders.xlsx');
  };

  const exportCSV = () => {
    const csvContent = [
      ['Name', 'Email', 'Total', 'Payment', 'Date', 'Products'],
      ...filteredOrders.map(order => [
        order.userInfo?.name || 'N/A',
        order.userEmail,
        order.total,
        order.paymentMethod,
        new Date(order.createdAt).toLocaleDateString(),
        order.items?.map(item => item.name).join(', ')
      ])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'orders.csv');
  };

  return (
    <>
      {showModal && viewOrder && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header"> 
                <h5 className="modal-title">Order Details</h5> 
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {viewOrder.userInfo?.name || 'N/A'}</p>
                <p><strong>Email:</strong> {viewOrder.userEmail}</p>
                <p><strong>Total Amount:</strong> ₹{viewOrder.total}</p>
                <p><strong>Payment Method:</strong> {viewOrder.paymentMethod || 'N/A'}</p>
                <p><strong>Notes:</strong> {viewOrder.notes || 'None'}</p>
                <p><strong>Address:</strong> {viewOrder.addressInfo?.address || 'N/A'}</p>
                <p><strong>Date:</strong> {new Date(viewOrder.createdAt).toLocaleString()}</p>
                <hr />
                <h6>Items:</h6>
                {viewOrder.items?.length > 0 ? (
                  <ul>
                    {viewOrder.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} × {item.quantity} - ₹{item.price} 
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No items</p>
                )} 
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <h4 className="mb-3">Orders</h4> */}

      <div className="mb-2 d-flex justify-content-between align-items-center">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search orders..."
          value={search}
          onChange={handleSearch}
        />
        <div>
          <button className="btn btn-sm btn-danger me-2" onClick={exportPDF}>Export PDF</button>
          <button className="btn btn-sm btn-success me-2" onClick={exportExcel}>Export Excel</button>
          <button className="btn btn-sm btn-primary" onClick={exportCSV}>Export CSV</button>
        </div>
      </div>

      {loading ? (
        <div className="text-center p-3">Loading orders...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th><input type="checkbox" checked={selectedOrders.length === filteredOrders.length} onChange={toggleSelectAll} /></th>
                <th>Name</th>
                <th>Email</th>
                <th>Total Amount</th>
                <th>Payment Method</th>
                <th>Date</th>
                <th>Product name</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <tr key={order._id}>
                    <td><input type="checkbox" checked={selectedOrders.includes(order._id)} onChange={() => toggleOrderSelection(order._id)} /></td>
                    <td>{order.userInfo?.name || 'N/A'}</td>
                    <td>{order.userEmail}</td>
                    <td>₹{order.total}</td>
                    <td>{order.paymentMethod || 'N/A'}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>{order.items?.map((item, idx) => <div key={idx}>{item.name}</div>)}</td>
                    <td className="text-center">
                      <button className="btn btn-info btn-sm" onClick={() => { setViewOrder(order); setShowModal(true); }}>
                        <i className="fa fa-eye"></i> View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="8" className="text-center">No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="pagination-controls text-center mt-3">
        <button className="btn btn-secondary btn-sm" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
        <span style={{ margin: '0 10px' }}>Page {page} of {totalPages}</span>
        <button className="btn btn-secondary btn-sm" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Next</button>
      </div>
    </>
  );
};

export default OrderTable;