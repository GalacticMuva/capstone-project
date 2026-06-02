import React, { useState, useEffect } from 'react';
import { inventoryAPI } from './api';
import './App.css';
import { ShieldCheck, Plus, Edit2, Check, X } from 'lucide-react';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState(''); // Added description state hook
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', price: '', quantity: '', description: '' }); // Added description to edit state tracker

  const API_URL = 'http://localhost:5000/api/products';


  useEffect(() => {
    inventoryAPI.fetchProducts()
      .then(data => setProducts(data))
      .catch(err => console.error("Error loading cloud inventory:", err));
  }, []);

  // Handle Create Submit Pipeline
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name || !price || !quantity) return;

    try {
      // 1. Send data directly to your environment-aware API module
      const savedProduct = await inventoryAPI.createProduct({
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        description: description
      });

      // 2. Append the newly saved database item directly to your UI state
      setProducts([...products, savedProduct]);

      // 3. Reset all your input form text fields
      setName('');
      setPrice('');
      setQuantity('');
      setDescription('');

    } catch (error) {
      console.error('Error inserting ledger asset:', error);
    }
  };

  // Start Inline Modification State
  const startEdit = (product) => {
    setEditingId(product.id);
    setEditData({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      description: product.description || ''
    });
  };

  // Save Inline Edit Updates to Database
  const handleUpdate = async (id) => {
    try {
    
      const updatedProduct = await inventoryAPI.updateProduct(id, {
        name: editData.name,
        price: parseFloat(editData.price),
        quantity: parseInt(editData.quantity),
        description: editData.description
      });
      setProducts(products.map(p => p.id === id ? updatedProduct : p));

      setEditingId(null);

    } catch (error) {
      console.error('Error modifying asset record:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header banner area */}
      <header className="mb-10 pb-4 border-b border-slate-800" role="banner">
        <h1 className="text-3xl font-bold flex items-center gap-3 text-sky-400">
          <ShieldCheck className="w-8 h-8 text-sky-400" aria-hidden="true" />
          IP & Compliance Asset Ledger
        </h1>
        <p className="text-slate-400 mt-2 text-sm md:text-base">
          A full-stack tracking interface for accessible software products and digital licensing frameworks.
        </p>
      </header>

      {/* Grid Dashboard Layout */}
      <main className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8">
        {/* Left Side: Create Form Card Component */}
        <section className="bg-slate-800 border border-slate-700 rounded-xl p-6 h-fit shadow-xl" aria-labelledby="form-heading">
          <h2 id="form-heading" className="text-lg font-semibold text-slate-100 mb-6">Register New Asset</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label htmlFor="asset-name" className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Asset Reference Name</label>
              <input type="text" id="asset-name" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:border-sky-400 focus:ring-0 transition-colors" placeholder="e.g. Shield ADA Checker" />
            </div>
            <div>
              <label htmlFor="asset-description" className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Asset Description</label>
              <textarea
                id="asset-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:border-sky-400 focus:ring-0 transition-colors resize-none"
                placeholder="e.g. Automated scanning tool that audits website themes for WCAG 2.1 compliance..."
              />
            </div>
            <div>
              <label htmlFor="asset-price" className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">License Cost ($)</label>
              <input type="number" step="0.01" id="asset-price" required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:border-sky-400 focus:ring-0 transition-colors" placeholder="0.00" />
            </div>
            <div>
              <label htmlFor="asset-quantity" className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Available Units</label>
              <input type="number" id="asset-quantity" required value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 focus:border-sky-400 focus:ring-0 transition-colors" placeholder="0" />
            </div>
            <button type="submit" className="w-full bg-sky-400 hover:bg-sky-500 text-slate-950 font-semibold p-3 rounded-lg flex items-center justify-center gap-2 transition-colors mt-6 shadow-md shadow-sky-400/10">
              <Plus className="w-5 h-5" aria-hidden="true" />
              Add Asset to Ledger
            </button>
          </form>
        </section>

        {/* Right Side: Data Output Table Card Component */}
        <section className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl" aria-labelledby="table-heading">
          <h2 id="table-heading" className="text-lg font-semibold text-slate-100 mb-6">Active Digital Inventory</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 text-xs font-medium uppercase tracking-wider">
                  <th scope="col" className="pb-3 pl-2">ID</th>
                  <th scope="col" className="pb-3">Product Asset Name</th>
                  <th scope="col" className="pb-3">Description</th>
                  <th scope="col" className="pb-3">Unit License Price</th>
                  <th scope="col" className="pb-3">Units Stocked</th>
                  <th scope="col" className="pb-3 pr-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700 text-sm">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 pl-2 font-mono text-slate-500">{product.id}</td>
                    <td className="py-4 font-medium text-slate-200">
                      {editingId === product.id ? (
                        <input type="text" className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-slate-100 focus:border-sky-400 focus:ring-0" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} aria-label="Edit name" />
                      ) : (
                        product.name
                      )}
                    </td>
                    <td className="py-4 text-slate-300">
                      {editingId === product.id ? (
                        <input
                          type="text"
                          className="bg-slate-900 border border-slate-600 rounded px-2 py-1 w-full text-slate-100 focus:border-sky-400 focus:ring-0"
                          value={editData.description || ''}
                          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                          aria-label="Edit description"
                        />
                      ) : (
                        product.description || 'No description available'
                      )}
                    </td>
                    <td className="py-4 text-slate-300">
                      {editingId === product.id ? (
                        <input type="number" step="0.01" className="bg-slate-900 border border-slate-600 rounded px-2 py-1 w-24 text-slate-100 focus:border-sky-400 focus:ring-0" value={editData.price} onChange={(e) => setEditData({ ...editData, price: e.target.value })} aria-label="Edit price" />
                      ) : (
                        `$${product.price.toFixed(2)}`
                      )}
                    </td>
                    <td className="py-4 text-slate-300">
                      {editingId === product.id ? (
                        <input type="number" className="bg-slate-900 border border-slate-600 rounded px-2 py-1 w-20 text-slate-100 focus:border-sky-400 focus:ring-0" value={editData.quantity} onChange={(e) => setEditData({ ...editData, quantity: e.target.value })} aria-label="Edit quantity" />
                      ) : (
                        product.quantity
                      )}
                    </td>
                    <td className="py-4 pr-2 text-right">
                      {editingId === product.id ? (
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleUpdate(product.id)} className="text-emerald-400 hover:text-emerald-300 p-1 transition-colors" aria-label={`Save edits for ${product.name}`}>
                            <Check className="w-5 h-5" />
                          </button>
                          <button onClick={() => setEditingId(null)} className="text-rose-400 hover:text-rose-300 p-1 transition-colors" aria-label="Cancel editing">
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => startEdit(product)} className="text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 font-medium transition-colors" aria-label={`Edit ${product.name}`}>
                          <Edit2 className="w-4 h-4" />
                          Modify
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-500 italic">
                      No digital assets currently logged in database system.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;