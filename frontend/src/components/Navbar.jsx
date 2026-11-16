import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-amber-900 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold tracking-wide">☕ Brew & Co. Admin</Link>
                <div className="space-x-4">
                    <Link to="/" className="hover:text-amber-200 transition">Products</Link>
                    <Link to="/products/new" className="bg-amber-700 hover:bg-amber-600 px-4 py-2 rounded-lg transition">Add Product</Link>
                </div>
            </div>
        </nav>
    );
}