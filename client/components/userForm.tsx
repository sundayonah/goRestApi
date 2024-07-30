import React, { FormEvent, useState } from 'react';

type FormDataState = {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  address: string;
  email: string;
  socialSecurity: string;
  accountNumber: string;
  routingNumber: string;
  accountHolderName: string;
  bankName: string;
  fileUpload: File | null;
  [key: string]: string | File | null; // Index signature
};

const UserForm = () => {
const [formData, setFormData] = useState<FormDataState>({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    address: '',
    email: '',
    socialSecurity: '',
    accountNumber: '',
    routingNumber: '',
    accountHolderName: '',
    bankName: '',
    fileUpload: null
  });

  const handleChange = (e: { target: { name: any; value: any; files: any; }; }) => {
    const { name, value, files } = e.target;
    if (name === 'fileUpload') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: formDataToSubmit
      });

      if (response.ok) {
        alert('Form submitted successfully');
      } else {
        alert('Error submitting form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="firstname"
        placeholder="First Name"
        value={formData.firstname}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastname"
        placeholder="Last Name"
        value={formData.lastname}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="socialSecurity"
        placeholder="Social Security"
        value={formData.socialSecurity}
        onChange={handleChange}
      />
      <input
        type="text"
        name="accountNumber"
        placeholder="Account Number"
        value={formData.accountNumber}
        onChange={handleChange}
      />
      <input
        type="text"
        name="routingNumber"
        placeholder="Routing Number"
        value={formData.routingNumber}
        onChange={handleChange}
      />
      <input
        type="text"
        name="accountHolderName"
        placeholder="Account Holder Name"
        value={formData.accountHolderName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="bankName"
        placeholder="Bank Name"
        value={formData.bankName}
        onChange={handleChange}
      />
      <input
        type="file"
        name="fileUpload"
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
