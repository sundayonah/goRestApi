// src/components/EmployeesManager.js

import axios from 'axios';

interface EmployeeData {
   firstName: string;
   lastName: string;
   department: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4444';

export const useEmployeesManager = () => {
   const createEmployee = async (employeeData: EmployeeData) => {
      try {
         const response = await axios.post(`${API_URL}/employee`, employeeData);
         return response.data;
      } catch (error) {
         console.error('Error creating employee:', error);
         throw error;
      }
   };

   const getAllEmployees = async () => {
      try {
         const response = await axios.get(`${API_URL}/employees`);
         // console.log(response.data)
         return response.data;
      } catch (error) {
         console.error('Error getting employees:', error);
         throw error;
      }
   };

   const deleteEmployee = async (employeeId: string) => {
      try {
         await axios.delete(`${API_URL}/employee/${employeeId}`);
         return true;
      } catch (error) {
         console.error('Error deleting employee:', error);
         throw error;
      }
   };

   const updateEmployeeByID = async (
      employeeId: string,
      updatedEmployeeData: Partial<EmployeeData>
   ) => {
      try {
         const response = await axios.put(
            `${API_URL}/employee/${employeeId}`,
            updatedEmployeeData
         );
         return response.data;
      } catch (error) {
         console.error('Error updating employee:', error);
         throw error;
      }
      // Add more functions as needed...
   };

   return {
      createEmployee,
      getAllEmployees,
      deleteEmployee,
      updateEmployeeByID,
   };
};
