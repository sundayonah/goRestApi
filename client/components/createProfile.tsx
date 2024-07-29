import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { useEmployeesManager } from './EmployeeComp';
import { useState } from 'react';

interface Employee {
   employee_id: string;
   firstname: string;
   lastname: string;
   department: string;
   // Other properties...
}

const CreateProfile = () => {
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

   return (
      <Dialog>
         <DialogTrigger className="font-bold justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Create Profile
         </DialogTrigger>
         <DialogContent className="bg-white">
            <DialogHeader>
               <DialogTitle>Create Profile</DialogTitle>
               <DialogDescription>
                  <div className="max-w-6xl mx-auto px-4 mt-8">
                     <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                           <label
                              htmlFor="firstName"
                              className="block text-sm font-medium"
                           >
                              First Name
                           </label>
                           <input
                              type="text"
                              id="firstName"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                           />
                        </div>
                        <div>
                           <label
                              htmlFor="lastName"
                              className="block text-sm font-medium"
                           >
                              Last Name
                           </label>
                           <input
                              type="text"
                              id="lastName"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                           />
                        </div>
                        <div>
                           <label
                              htmlFor="department"
                              className="block text-sm font-medium"
                           >
                              Department
                           </label>
                           <input
                              type="text"
                              id="department"
                              value={department}
                              onChange={(e) => setDepartment(e.target.value)}
                              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                           />
                        </div>
                        <button
                           type="submit"
                           className="w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                           Create Employee
                        </button>
                     </form>

                     <div></div>
                  </div>
               </DialogDescription>
            </DialogHeader>
         </DialogContent>
      </Dialog>
   );
};
export default CreateProfile;
