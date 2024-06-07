import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationSideBar from './ReuseableComponents/NavigationSideBar';
import CourseImage from "./Image/Mobile.jpg";

function AccountView() {
    const [users, setUsers] = useState([]);
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const axiosInstance = axios.create({
                    baseURL: 'http://localhost:3001',
                    withCredentials: true 
                });
                const response = await axiosInstance.post('/AccountView');
                if (response.status === 200) {
                    setUsers(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();

        return () => {
            setUsers([]); // Reset users array on unmount
        };
    }, []);

    const handleEdit = () => {
        setEditable(true);
    };

    const handleSave = async () => {
        try {
            const axiosInstance = axios.create({
                baseURL: 'http://localhost:3001',
                withCredentials: true 
            });
            await axiosInstance.post('/AccountEdit', { userId: users[0].userID, newData: users[0] });
            setEditable(false);
            alert("Account details updated !")
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    const handleCancel = () => {
        setEditable(false);
    };

    const handleChange = (index, field, value) => {
        const updatedUsers = [...users];
        updatedUsers[index][field] = value;
        setUsers(updatedUsers);
    };

    return (
        <div className='flex flex-col items-center m-5 overflow-y-auto'>
            <NavigationSideBar />
            <h2 className='text-2xl font-bold mb-4 mt-10'>Account Information</h2>
            {users.map((user, index) => (
                <div key={index} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96'>
                    <div className='mb-4 flex items-center justify-center'>
                        <img
                            src={user.ProfileImage || CourseImage} // Use user's profile image if available, otherwise fallback to default image
                            alt='Profile'
                            className='rounded-full w-32 h-32 mr-4'
                        /></div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                            Name:
                        </label>
                        <input
                            type='text'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            value={user.Name}
                            readOnly={!editable}
                            onChange={(e) => handleChange(index, 'Name', e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                            Username:
                        </label>
                        <input
                            type='text'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            value={user.Username}
                            readOnly={!editable}
                            onChange={(e) => handleChange(index, 'Username', e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                            Email:
                        </label>
                        <input
                            type='email'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            value={user.Email}
                            readOnly={!editable}
                            onChange={(e) => handleChange(index, 'Email', e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                            Role:
                        </label>
                        <input
                            type='text'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            value={user.Role}
                            readOnly={!editable}
                            onChange={(e) => handleChange(index, 'Role', e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                            Password:
                        </label>
                        <input
                            type='password'
                            placeholder='*****'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            readOnly={!editable}
                            // No onChange handler for password field as it's not editable
                        />
                    </div>
                </div>
            ))}
            {editable ? (
                <div>
                    <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2' onClick={handleSave}>
                        Save
                    </button>
                    <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            ) : (
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5' onClick={handleEdit}>
                    Edit Account
                </button>
            )}
        </div>
    );
}

export default AccountView;
