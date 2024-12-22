import React, { useState } from "react";

const ScheduleService = () => {
  const [services, setServices] = useState([
    { id: 1, customer: "John Doe", service: "Basic Wash", date: "2024-12-05", status: "Scheduled" },
    { id: 2, customer: "Jane Smith", service: "Full Detailing", date: "2024-12-06", status: "Pending" },
  ]);

  const [newService, setNewService] = useState({
    customer: "",
    service: "",
    date: "",
  });

  const handleAddService = () => {
    if (newService.customer && newService.service && newService.date) {
      setServices([
        ...services,
        { id: services.length + 1, ...newService, status: "Scheduled" },
      ]);
      setNewService({ customer: "", service: "", date: "" });
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#f8f9fa" }}>
      <h2 className="mb-1 text-2xl font-bold">Schedule Service</h2>

      {/* Add New Service Form */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #dee2e6",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 >Add New Service</h3>
        <input
          type="text"
          placeholder="Customer Name"
          value={newService.customer}
          onChange={(e) => setNewService({ ...newService, customer: e.target.value })}
          style={{
            marginRight: "10px",
            padding: "8px",
            border: "1px solid #ced4da",
            borderRadius: "4px",
            width: "200px",
          }}
        />
        <select
          value={newService.service}
          onChange={(e) => setNewService({ ...newService, service: e.target.value })}
          style={{
            marginRight: "10px",
            padding: "8px",
            border: "1px solid #ced4da",
            borderRadius: "4px",
            backgroundColor: "#e9ecef",
          }}
        >
          <option value="">Select Service</option>
          <option value="Basic Wash">Basic Wash</option>
          <option value="Full Detailing">Full Detailing</option>
        </select>
        <input
          type="date"
          value={newService.date}
          onChange={(e) => setNewService({ ...newService, date: e.target.value })}
          style={{
            marginRight: "10px",
            padding: "8px",
            border: "1px solid #ced4da",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={handleAddService}
          style={{
            padding: "8px 12px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Service
        </button>
      </div>

      {/* Upcoming Services Table */}
      <div>
        <h3 >Upcoming Services</h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>Customer</th>
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>Service</th>
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>Date</th>
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr
                key={service.id}
                style={{
                  backgroundColor: service.status === "Pending" ? "#f8d7da" : "#d4edda",
                  color: service.status === "Pending" ? "#721c24" : "#155724",
                }}
              >
                <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{service.customer}</td>
                <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{service.service}</td>
                <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{service.date}</td>
                <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{service.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleService;
