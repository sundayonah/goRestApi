import { useEffect, useState } from 'react';
import { useEmployeesManager } from './EmployeeComp';

interface Employee {
   employee_id: string;
   firstname: string;
   lastname: string;
   department: string;
   // Other properties...
}

const AllEmployee = () => {
   const { getAllEmployees, deleteEmployee } = useEmployeesManager();
   const [employees, setEmployees] = useState<Employee[]>([]);

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

   return (
      <div className="p-4 min-h-screen">
         <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">
               All Employees
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {employees.map((employee) => (
                  <div key={employee.employee_id} className="">
                     <h2 className="text-xl font-semibold">{`${employee.firstname} ${employee.lastname}`}</h2>
                     <p className="text-gray-400">{employee.department}</p>
                     <button
                        onClick={() => handleDelete(employee.employee_id)}
                        className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                     >
                        Delete
                     </button>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default AllEmployee;
