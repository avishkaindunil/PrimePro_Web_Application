import React, { useState } from "react";

const TechnicalSupport = () => {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      title: "System downtime issue",
      status: "Open",
      description: "The system is not accessible during peak hours.",
      date: "2024-11-10",
    },
    {
      id: 2,
      title: "Slow response from server",
      status: "Resolved",
      description: "The server response time is higher than usual.",
      date: "2024-11-11",
    },
    {
      id: 3,
      title: "User access issue",
      status: "Open",
      description: "Users are unable to log in to the system.",
      date: "2024-11-12",
    },
    {
      id: 4,
      title: "Data loss problem",
      status: "Open",
      description: "Data is getting lost intermittently.",
      date: "2024-11-13",
    },
  ]);

  const resolveTicket = (id) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status: "Resolved" } : ticket
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Technical Support & Troubleshooting</h1>

      <div>
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className={`border-l-4 p-4 mb-4 rounded-lg shadow-sm ${
              ticket.status === "Open"
                ? "border-yellow-500 bg-yellow-50"
                : "border-green-500 bg-green-50"
            }`}
          >
            <h2 className="text-lg font-semibold">{ticket.title}</h2>
            <p className="text-sm text-gray-500">Date: {ticket.date}</p>
            <p className="mt-2">{ticket.description}</p>
            <p
              className={`mt-4 font-medium ${
                ticket.status === "Open" ? "text-yellow-700" : "text-green-700"
              }`}
            >
              Status: {ticket.status}
            </p>
            {ticket.status === "Open" && (
              <button
                onClick={() => resolveTicket(ticket.id)}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Mark as Resolved
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicalSupport;
