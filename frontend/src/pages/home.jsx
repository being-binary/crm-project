import React, { useState } from 'react';

import Block from '../components/Block';
import Sidebar from '../components/Sidebar';
import Form from '../components/form';
import Documents from '../components/Documents';
const Home = () => {
    const [files, setFiles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    };
    const [activeView, setActiveView] = useState('form'); // default view
    const [slideIn, setSlideIn] = useState(false);

    const handleNavigate = (view) => {
        setSlideIn(true);
        setTimeout(() => {
            setActiveView(view);
            setSlideIn(false);
        }, 300); // sync with animation duration
    };
    return (
        <div className="md:h-[calc(100vh-65px)] min-h-screen bg-white flex items-center justify-center py-8">
            <div className="bg-white rounded shadow-md w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 h-full overflow-hidden">

                {/* Sidebar Panel — no scroll */}
                <div className="bg-gray-50 p-6 overflow-hidden ">
                    <Sidebar handleFileChange={handleFileChange} onNavigate={handleNavigate} />
                </div>

                {/* Form Panel (scrollable) */}
                {activeView === 'form' && (
                    <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-200 lg:col-span-2 overflow-y-auto">
                        <Form handleFileChange={handleFileChange} />
                    </div>
                )}

                {/* Documents Panel (scrollable) */}
                {activeView === 'documents' && (
                    <div className="bg-gray-50 p-6 overflow-y-auto lg:col-span-2">
                        <Documents files={files} />
                    </div>
                )}

            </div>

            {/* Modal Block */}
            <Block
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                files={files}
            />
        </div>


    );
};

export default Home;
