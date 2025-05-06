import React, { useState } from 'react';
import { FaUser, FaFileAlt, FaCog, FaCamera } from 'react-icons/fa';

const Sidebar = ({onNavigate}) => {
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="h-full w-full flex flex-col space-y-6 border-r-1 border-gray-200 pr-2">
      <h1 className="text-2xl font-bold mb-4">Employee</h1>

      {/* Profile Photo Upload
      <div className="relative">
        <img
          src={image || 'https://as2.ftcdn.net/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg'}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-1 m-auto "
        />
        <label htmlFor="avatarUpload" className="absolute bottom-0 right-0 p-1 rounded-full cursor-pointer hover:bg-blue-300">
          <FaCamera />
        </label>
        <input
          type="file"
          id="avatarUpload"
          accept="image/*"
          onChange={handleImageChange}
          hidden
        />
      </div> */}

      {/* Navigation */}
      <nav className="flex flex-col gap-4 w-full mt-6">
        <a onClick={()=>onNavigate('form')} className="flex items-center gap-3 hover:bg-blue-300 px-3 py-2 rounded transition">
          <FaUser />
          Details
        </a>
        <a onClick={()=>onNavigate('documents')} className="flex items-center gap-3 hover:bg-blue-300 px-3 py-2 rounded transition">
          <FaFileAlt />
          Documents
        </a>
        {/* <a onClick={()=>onNavigate('settings')} className="flex items-center gap-3 hover:bg-blue-300 px-3 py-2 rounded transition">
          <FaCog />
          Settings
        </a> */}
      </nav>
    </div>
  );
};

export default Sidebar;
