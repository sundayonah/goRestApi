// EditProfile.js
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
import { Employee } from '@/types/interfaces';

// Add onUpdate to the props type definition
interface EditProfileProps {
   employee: Employee | null; // Allow employee to be null
   onUpdate?: (updatedData: Partial<Employee>) => void;
   closeModal: () => void;
}

const EditProfile = ({ employee, onUpdate, closeModal }: EditProfileProps) => {
   const { updateEmployeeByID } = useEmployeesManager();
   const [firstName, setFirstName] = useState(
      employee ? employee.firstname : ''
   );
   const [lastName, setLastName] = useState(employee ? employee.lastname : '');
   const [department, setDepartment] = useState(
      employee ? employee.department : ''
   );
   const [isOpen, setIsOpen] = useState(!!employee);
   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
         const updatedEmployee = { firstName, lastName, department };
         const success = await updateEmployeeByID(
            employee?.employee_id,
            updatedEmployee
         );
         // Call onUpdate if it's provided
         onUpdate?.(updatedEmployee);
         // Close the dialog or refresh the list of employees here
         closeModal();
      } catch (error) {
         console.error('Failed to update employee:', error);
      }
   };

   console.log(employee);
   return (
      <Dialog>
         <DialogTrigger className="font-bold justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Edit
         </DialogTrigger>
         <DialogContent className="bg-white">
            <DialogHeader>
               <DialogTitle>Edit Profile</DialogTitle>
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
                           Update
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

export default EditProfile;
