import React from 'react';

const Block = ({ isOpen, onClose, files }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-lg rounded-lg p-6 shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                >
                    &#10005;
                </button>

                <h2 className="text-xl font-semibold mb-4">Uploaded Documents</h2>

                {files?.length === 0 ? (
                    <p className="text-gray-500">No files to display.</p>
                ) : (
                    <ul className="space-y-2 max-h-80 overflow-auto">
                        {files.map((file, index) => (
                            <li key={index} className="border p-2 rounded text-sm text-gray-700">
                                {file.type.startsWith("image/") ? (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`preview-${index}`}
                                        className="w-full h-40 object-contain mb-1 rounded"
                                    />
                                ) : (
                                    <div>{file.name}</div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Block;
