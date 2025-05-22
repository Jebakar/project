import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCategories = async (currentPage) => {
    try {
      const res = await axios.get(`http://localhost:9000/api/categories?page=${currentPage}&limit=10`);
      setCategories(res.data.categories); // ✅ Access only the array
      setTotalPages(res.data.totalPages); // ✅ For pagination
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories?.map((cat) => (
          <li key={cat._id}>{cat.name}</li>
        ))}
      </ul>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous 
        </button> 

        <span style={{ margin: '0 10px' }}>Page {page} of {totalPages}</span>

        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          Next
        </button> 
      </div>
    </div>
  );
};

export default CategoryList;
