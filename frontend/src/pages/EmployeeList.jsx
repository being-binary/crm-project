import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstace';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get('/employee/get');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <div className="text-center p-6">Loading employees...</div>;
  if (employees.length === 0) return <div className="text-center p-6 text-gray-500">No employees found.</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Employee List</h2>
      <div className="space-y-6">
        {employees.map((employee, idx) => (
          <div key={idx} className="border-b pb-4">
            <h3 className="text-lg font-semibold">{employee.name}</h3>
            <p className="text-gray-600">📧 {employee.email}</p>
            <p className="text-gray-600">📞 {employee.phone}</p>
            <p className="text-gray-600">🏢 {employee.department} — {employee.position}</p>
            <p className="text-gray-600">💰 ${employee.salary.toLocaleString()}</p>
            <p className="text-gray-600">🗓️ {new Date(employee.startDate).toLocaleDateString()}</p>
            <div className="mt-2">
              <span className="font-medium">📎 Documents:</span>
              <ul className="list-disc list-inside text-blue-600">
                {employee.documents.map((doc, docIdx) => (
                  <li key={docIdx}>
                    <a href={`/documents/${doc}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {doc}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
