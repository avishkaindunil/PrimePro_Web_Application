import React, { useState } from 'react';

const PolicyDevelopmentPage = () => {
  const [policies, setPolicies] = useState([
    {
      id: 1,
      title: 'Safety Guidelines for Car Wash',
      description: 'Ensure proper safety measures during car washes.',
      category: 'Safety and Compliance',
      effectiveDate: '2024-01-01',
    },
    {
      id: 2,
      title: 'Customer Service Standards',
      description: 'Maintain professional behavior while interacting with customers.',
      category: 'Customer Guidelines',
      effectiveDate: '2023-12-01',
    },
    {
      id: 3,
      title: 'Employee Training Policy',
      description: 'All employees must undergo bi-annual training sessions.',
      category: 'Employee Guidelines',
      effectiveDate: '2024-02-01',
    },
  ]);

  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handlePolicyClick = (policy) => {
    setSelectedPolicy(policy);
    setIsCreating(false);
  };

  const handleCreatePolicy = () => {
    setIsCreating(true);
    setSelectedPolicy(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newPolicy = {
      id: policies.length + 1,
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      effectiveDate: formData.get('effectiveDate'),
    };

    setPolicies([...policies, newPolicy]);
    setIsCreating(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Policy Development</h1>

      {/* Policies List */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Existing Policies</h2>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
          onClick={handleCreatePolicy}
        >
          Create New Policy
        </button>
        <ul className="divide-y">
          {policies.map((policy) => (
            <li
              key={policy.id}
              className="py-4 cursor-pointer hover:bg-gray-50"
              onClick={() => handlePolicyClick(policy)}
            >
              <h3 className="text-lg font-semibold">{policy.title}</h3>
              <p className="text-sm text-gray-500">{policy.category}</p>
              <span className="text-xs text-gray-400">
                Effective from: {new Date(policy.effectiveDate).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Policy Details */}
      {selectedPolicy && (
        <div className="bg-white shadow rounded p-4 mb-6">
          <h2 className="text-xl font-bold">{selectedPolicy.title}</h2>
          <p className="mt-2">{selectedPolicy.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            Category: {selectedPolicy.category}
          </p>
          <p className="text-sm text-gray-500">
            Effective Date: {new Date(selectedPolicy.effectiveDate).toLocaleDateString()}
          </p>
        </div>
      )}

      {/* Create New Policy */}
      {isCreating && (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-bold mb-4">Create New Policy</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="description">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                className="w-full border rounded p-2"
                rows="3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="category">
                Category
              </label>
              <select
                name="category"
                id="category"
                className="w-full border rounded p-2"
                required
              >
                <option value="Service Guidelines">Service Guidelines</option>
                <option value="Customer Guidelines">Customer Guidelines</option>
                <option value="Employee Guidelines">Employee Guidelines</option>
                <option value="Safety and Compliance">Safety and Compliance</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="effectiveDate">
                Effective Date
              </label>
              <input
                type="date"
                name="effectiveDate"
                id="effectiveDate"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Save Policy
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PolicyDevelopmentPage;
