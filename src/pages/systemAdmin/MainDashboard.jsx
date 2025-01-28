

import React, { useState, useEffect } from "react";
import Card from "../../components/CarWashCenter/Card";
import ComplaintHandling from "../../components/SystemAdmin/ComplaintHandling"; // Placeholder component
import WorkloadProgress from "../../components/SystemAdmin/workloadProgress";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MainDashboard() {
  const [carCenterCount, setCarCenterCount] = useState(0);
  const [activeUserCount, setActiveUserCount] = useState(0);

  const navigate = useNavigate();

  // Fetch counts from backend
  useEffect(() => {
    // Fetch car center count
    axios
      .get("http://localhost:8080/reports/get-all-centers")
      .then((response) => setCarCenterCount(response.data.length))
      .catch((error) =>
        console.error("Error fetching car center count:", error)
      );

    // Fetch active user count
    axios
      .get("http://localhost:8080/admin/active-count")
      .then((response) => setActiveUserCount(response.data))
      .catch((error) =>
        console.error("Error fetching active user count:", error)
      );
  }, []);

  const goToReportsPage = () => {
    navigate("/systemAdmin/reports"); // Navigate to the reports page
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">System Admin Dashboard</h1>

      {/* Active Users and Complaint Handling Row */}
      <div className="flex gap-6 mt-10">
        {/* Active Users Card */}
        <div className="flex-1 h-24">
          <Card
            title="Active Users"
            value={activeUserCount}
            icon={<i className="fas fa-users"></i>}
          />
        </div>

        {/* Complaint Handling Component */}
        <div className="flex-1 h-full">
          <ComplaintHandling />
        </div>
      </div>

      {/* Workload Progress Section */}
      <div className="w-full mt-10">
        <WorkloadProgress />
      </div>
    </div>
  );
}
