import React from 'react';
import { useSelector } from 'react-redux';

const MaintenancePage = () => {
    const { Settings } = useSelector((state) => state.generalSettings);

    return (
        <>

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#540A26] to-[#1F4F46]">
                <div className="text-center p-8 max-w-2xl mx-4 bg-white/90 rounded-xl shadow-xl">
                    <div className="animate-bounce mb-8">
                        <svg
                            className="mx-auto h-20 w-20 text-[#540A26]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-[#540A26] mb-4">
                        {`Site Maintenance -${Settings.siteTitle}`}
                    </h1>

                    <div className="prose prose-lg max-w-none mb-6">

                            <>
                                <p className="text-gray-700">
                                    We're currently upgrading our systems to serve you better.
                                </p>
                                <p className="text-gray-700">
                                    Please check back later. We appreciate your patience!
                                </p>
                            </>
                        
                    </div>

                    <div className="mt-8 text-xs text-gray-400">
                        <p>HEVSuite Club &copy; {new Date().getFullYear()}</p>
                    </div>
                </div>
            </div>
        </>
    );
};


export default MaintenancePage;