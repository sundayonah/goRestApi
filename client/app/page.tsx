'use client';

// Import useState from React
import React, { useEffect, useState } from 'react';
import { useEmployeesManager } from '@/components/EmployeeComp';
import AllEmployee from '@/components/allEmployee';
import CreateProfile from '@/components/createProfile';

interface Employee {
   employee_id: string;
   firstname: string;
   lastname: string;
   department: string;
   // Other properties...
}

export default function Home() {
   const {
      createEmployee,
      getAllEmployees,
      deleteEmployee,
   } = useEmployeesManager();
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [department, setDepartment] = useState('');
   const [employees, setEmployees] = useState<Employee[]>([]);

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
         const employeeData = { firstName, lastName, department };
         console.log(employeeData);
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
      const fetchEmployees = async () => {
         const employeesData = await getAllEmployees();
         setEmployees(employeesData.data);
      };

      fetchEmployees();
   }, []);

   const handleDelete = async (employeeId: string) => {
      try {
         await deleteEmployee(employeeId);
         // Optionally refetch employees or remove the deleted employee from state
         setEmployees(
            employees.filter((employee) => employee.employee_id !== employeeId)
         );
         console.log('');
      } catch (error) {
         console.error('Failed to delete employee:', error);
      }
   };

   return (
      <div className="max-w-6xl mx-auto px-4 mt-32">
         <h1 className="text-2xl text-center font-bold mb-4 text-blue-600">
            Golang CRUD for Creating Employee
         </h1>
         <div className="flex justify-end items-center">
            <CreateProfile />
         </div>
         <div>
            <AllEmployee />
         </div>
      </div>
   );
}
