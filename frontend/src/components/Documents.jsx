import React from 'react'

const Documents = ({files}) => {
    return (
        <div className="bg-gray-50 p-6 col-span-2">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Uploaded Documents</h3>
            {files.length === 0 ? (
                <p className="text-gray-500">No documents uploaded.</p>
            ) : (
                <ul className="list-disc list-inside text-gray-700 space-y-1 max-h-96">
                    {files.map((file, index) => (
                        <li key={index} className='truncate'>{file.name}</li>
                    ))}
                </ul>
            )}
            {files.length > 0 && (
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    View All
                </button>
            )}
        </div>
    )
}

export default Documents
