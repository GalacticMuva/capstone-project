
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const inventoryAPI = {
  // GET: Fetch all from Flask
  fetchProducts: async () => {
    const response = await fetch(`${BASE_URL}/api/products`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },

  // POST: Send new product w/descriptions
  createProduct: async (productData) => {
    const response = await fetch(`${BASE_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    return response.json();
  },

  // PUT: Update 
  updateProduct: async (id, updatedData) => {
    const response = await fetch(`${BASE_URL}/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    return response.json();
  }
};