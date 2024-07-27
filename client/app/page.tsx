"use client"

// Import useState from React
import React, { useEffect, useState } from 'react';
import { useEmployeesManager } from '@/component/EmployeeComp';

export default function Home() {
  const { createEmployee, getAllEmployees, deleteEmployee } = useEmployeesManager();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        const employeeData = { firstName, lastName, department };
        console.log(employeeData)
      await createEmployee(employeeData);
      // Clear the form after submission
      setFirstName('');
      setLastName('');
      setDepartment('');
    } catch (error) {
      console.error('Failed to create employee:', error);
    }
  };

  useEffect(() => {
    // get all employees
    const getAllEmployeesData = async () => {
      try {
        const employees = await getAllEmployees();
        console.log('Employees:', employees);
      } catch (error) {
        console.error('Failed to get employees:', error);
      }
    };
    getAllEmployeesData()
  },[])

  // delete an employee
  const deleteEmployeeData = async (id: string) => {
    try {
      await deleteEmployee(id);
      console.log(`Employee with ID ${id} deleted.`);
    } catch (error) {
      console.error(`Failed to delete employee with ID ${id}:`, error);
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 mt-32">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Create Employee</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="department" className="block text-sm font-medium">Department</label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button type="submit" className="w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Create Employee
        </button>
      </form>
    </div>
  );
};

