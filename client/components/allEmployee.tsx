import { useEffect, useState } from 'react';
import { useEmployeesManager } from './EmployeeComp';
import { Employee } from '@/types/interfaces';
import EditProfile from './editProfile';

const AllEmployee = () => {
   const {
      getAllEmployees,
      deleteEmployee,
      updateEmployeeByID,
   } = useEmployeesManager();
   const [employees, setEmployees] = useState<Employee[]>([]);
   const [showEditProfile, setShowEditProfile] = useState(false);
   const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
      null
   );

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
         setEmployees(
            employees.filter((employee) => employee.employee_id !== employeeId)
         );
      } catch (error) {
         console.error('Failed to delete employee:', error);
      }
   };

   const handleUpdate = async (
      employeeId: string,
      updatedData: Partial<Employee>
   ) => {
      try {
         const updatedEmployee = await updateEmployeeByID(
            employeeId,
            updatedData
         );
         console.log('Employee updated successfully:', updatedEmployee);
         // Optionally, refetch the employees list to ensure consistency
         const employeesData = await getAllEmployees();
         setEmployees(employeesData.data);
         setShowEditProfile(false); // Close the dialog after successful update
         // setSelectedEmployee(null); // Reset the selected employee
      } catch (error) {
         console.error('Failed to update employee:', error);
      }
   };

   // const closeModal = () => {
   //    setShowEditProfile(false);
   //    setSelectedEmployee(null);
   // };

   return (
      <div className="p-4 min-h-screen">
         <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">
               All Employees
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {employees.map((employee) => (
                  <div
                     key={employee.employee_id}
                     className="border p-2 rounded-md shadow-md"
                  >
                     <h2 className="text-xl font-semibold">{`${employee.firstname} ${employee.lastname}`}</h2>
                     <p className="text-gray-400">{employee.department}</p>
                     <div className="space-x-3">
                        <button
                           onClick={() => handleDelete(employee.employee_id)}
                           className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                           Delete
                        </button>
                        <EditProfile
                           employee={employee}
                           onUpdate={async (updatedData: Partial<Employee>) => {
                              await handleUpdate(
                                 employee.employee_id,
                                 updatedData
                              );
                           }}
                        />
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default AllEmployee;
