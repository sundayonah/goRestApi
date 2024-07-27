// src/components/EmployeesManager.js

import axios from 'axios';

interface EmployeeData {
  firstName: string;
  lastName: string;
  department: string;
}


export const useEmployeesManager = () => {
  const createEmployee = async (employeeData: EmployeeData) => {
    try {
      const response = await axios.post('http://localhost:4444/employee', employeeData);
      return response.data;
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  };

  const getAllEmployees = async () => {
    try {
        const response = await axios.get('http://localhost:4444/employees');
        console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error getting employees:', error);
      throw error;
    }
  };

  const deleteEmployee = async (employeeId: string) => {
    try {
      await axios.delete(`http://localhost:4444/employee/${employeeId}`);
      return true;
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  };

  // Add more functions as needed...

  return { createEmployee, getAllEmployees, deleteEmployee };
};
