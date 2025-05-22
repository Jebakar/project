import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function BannerTable() {
  const [banners, setBanners] = useState([]);
  const [selected, setSelected] = useState([]);
  const [viewBanner, setViewBanner] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const bannersPerPage = 5;

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/banners");
      setBanners(res.data);
    } catch (err) {
      console.error("Failed to fetch banners:", err);
      setBanners([]);
    }
  };

  const toggleStatus = async (id) => { 
    try {
      const banner = banners.find((b) => b._id === id);
      const newStatus = !banner.status;

      await axios.put(`http://localhost:9000/api/banners/${id}/status`, {
        status: newStatus,
      });

      fetchBanners();
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to update banner status"
      );
    }
  };

  const deleteBanner = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this banner?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:9000/api/banners/${id}`);
      fetchBanners();
      alert("Banner deleted successfully.");
    } catch (err) {
      console.error("Failed to delete banner:", err);
    }
  };

  const toggleSelectAll = () => {
    if (selected.length === currentBanners.length) {
      setSelected([]);
    } else {
      setSelected(currentBanners.map((b) => b._id));
    }
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const exportData = (type) => {
    const selectedBanners = banners.filter((b) => selected.includes(b._id));
    if (selectedBanners.length === 0) {
      alert("Please select at least one banner to export.");
      return;
    }

    const data = selectedBanners.map((b) => ({
      Title: b.title,
      Text: b.text,
      Description: b.description,
      Status: b.status ? "Enabled" : "Disabled",
    }));

    if (type === "pdf") {
      const doc = new jsPDF();
      doc.text("Selected Banners", 14, 10);
      autoTable(doc, {
        head: [["Title", "Text", "Description", "Status"]],
        body: data.map((item) => Object.values(item)),
        startY: 20,
      });
      doc.save("banners.pdf");
    } else if (type === "excel") {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Banners");
      const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      saveAs(blob, "banners.xlsx");
    } else if (type === "csv") {
      const header = Object.keys(data[0]);
      const rows = data.map((obj) => header.map((h) => obj[h]));
      const csvContent = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "banners.csv");
    }
  };

  // Filter banners by search term
  const filteredBanners = banners.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLast = currentPage * bannersPerPage;
  const indexOfFirst = indexOfLast - bannersPerPage;
  const currentBanners = filteredBanners.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBanners.length / bannersPerPage);

  return (
    <div className="container mt-4">
      <h2>Banner Table</h2>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <div className="d-flex gap-2">
          <button className="btn btn-danger btn-sm" onClick={() => exportData("pdf")}>
            Export PDF
          </button>
          <button className="btn btn-success btn-sm" onClick={() => exportData("excel")}>
            Export Excel
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => exportData("csv")}>
            Export CSV
          </button>
        </div>
      </div>

      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selected.length === currentBanners.length && currentBanners.length > 0}
                onChange={toggleSelectAll}
              />
            </th>
            <th>No</th>
            <th>Title</th>
            <th>Text</th>
            <th>Description</th>
            <th>Background</th>
            <th>Shoe</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentBanners.length > 0 ? (
            currentBanners.map((banner, index) => (
              <tr key={banner._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.includes(banner._id)}
                    onChange={() => toggleSelect(banner._id)}
                  />
                </td>
                <td>{indexOfFirst + index + 1}</td>
                <td>{banner.title}</td>
                <td>{banner.text}</td>
                <td>{banner.description}</td>
                <td>
                  <img
                    src={`http://localhost:9000/uploads/${banner.backgroundImage}`}
                    alt="Background"
                    width="100"
                    height="60"
                    style={{ objectFit: "cover" }}
                  />
                </td>
                <td>
                  <img
                    src={`http://localhost:9000/uploads/${banner.shoeImage}`}
                    alt="Shoe"
                    width="100"
                    height="60"
                    style={{ objectFit: "contain" }}
                  />
                </td>
                <td>
                  <span
                    onClick={() => toggleStatus(banner._id)}
                    style={{
                      cursor: "pointer",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      color: "white",
                      backgroundColor: banner.status ? "green" : "gray",
                      display: "inline-block",
                      fontWeight: "bold",
                    }}
                  >
                    {banner.status ? "Click to Disable" : "Click to Enable"}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => setViewBanner(banner)}
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteBanner(banner._id)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No banners found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({ length: totalPages }).map((_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Modal */}
      {viewBanner && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View Banner</h5>
                <button type="button" className="btn-close" onClick={() => setViewBanner(null)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Title:</strong> {viewBanner.title}</p>
                <p><strong>Text:</strong> {viewBanner.text}</p>
                <p><strong>Description:</strong> {viewBanner.description}</p>
                <p><strong>Status:</strong> {viewBanner.status ? "Enabled" : "Disabled"}</p>
                <p><strong>Background Image:</strong></p>
                <img src={`http://localhost:9000/uploads/${viewBanner.backgroundImage}`} alt="Background" className="img-fluid mb-3" />
                <p><strong>Shoe Image:</strong></p>
                <img src={`http://localhost:9000/uploads/${viewBanner.shoeImage}`} alt="Shoe" className="img-fluid" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setViewBanner(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BannerTable;
