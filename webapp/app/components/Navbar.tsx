import { useState, useRef } from 'react';
import { Link } from "react-router";

export default function Navbar() {
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const accountButtonRef = useRef(null);
    const menuButtonRef = useRef(null);

    return (
        <>
            <nav className="top-0 fixed z-50 flex w-full items-center justify-between p-4 bg-[#9D5FC2] shadow-md">
                <div className="relative">
                    <button 
                        ref={menuButtonRef}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-2xl font-arial-medium text-ccbrown cursor-pointer hover:opacity-70 transition-opacity"
                    >
                        Reselling Tracker
                    </button>

                    {isMenuOpen && (
                        <div 
                            className="absolute top-full left-0 mt-2 bg-white rounded-lg p-4 w-48 shadow-xl z-50"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col gap-2">

                                <Link to="/home" className="w-full" onClick={(e) => e.stopPropagation()}>
                                    <button className="w-full bg-ccbrown text-white py-2 px-4 rounded hover:opacity-80 transition-opacity font-arial-medium text-left" onClick={(e) => e.stopPropagation()}>
                                        Dashboard
                                    </button>
                                </Link>
                                
                                <Link to="/itemcreate" className="w-full" onClick={(e) => e.stopPropagation()}>
                                    <button className="w-full bg-ccbrown text-white py-2 px-4 rounded hover:opacity-80 transition-opacity font-arial-medium text-left" onClick={(e) => e.stopPropagation()}>
                                        Create Item
                                    </button>
                                </Link>
                                <button className="w-full bg-ccbrown text-white py-2 px-4 rounded hover:opacity-80 transition-opacity font-arial-medium text-left" onClick={(e) => e.stopPropagation()}>
                                    Finances
                                </button>
                                <button className="w-full bg-ccbrown text-white py-2 px-4 rounded hover:opacity-80 transition-opacity font-arial-medium text-left" onClick={(e) => e.stopPropagation()}>
                                    Placeholder
                                </button>
                                <button className="w-full bg-ccbrown text-white py-2 px-4 rounded hover:opacity-80 transition-opacity font-arial-medium text-left" onClick={(e) => e.stopPropagation()}>
                                    Placeholder
                                </button>
                            

                            
                                
                                

                            </div>
                        </div>
                    )}
                </div>

                <div className="relative">
                    <button 
                        ref={accountButtonRef}
                        onClick={() => setIsAccountOpen(!isAccountOpen)}
                        className="text-2xl font-arial-medium text-ccbrown cursor-pointer hover:opacity-70 transition-opacity"
                    >
                        Account
                    </button>

                    {isAccountOpen && (
                        <div 
                            className="absolute top-full right-0 mt-2 bg-white rounded-lg p-6 w-96 shadow-xl z-50"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="mb-6">
                                <h2 className="text-xl font-arial-arial text-gray-800 mb-4">Account Settings</h2>
                                <div className="flex gap-3">
                                    <button className="flex-1 bg-ccbrown text-white py-2 px-4 rounded hover:opacity-80 transition-opacity font-arial-medium">
                                        Profile
                                    </button>
                                    <button className="flex-1 bg-gray-600 text-white py-2 px-4 rounded hover:opacity-80 transition-opacity font-arial-medium">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {(isAccountOpen || isMenuOpen) && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => {
                        setIsAccountOpen(false);
                        setIsMenuOpen(false);
                    }}
                />
            )}
        </>
    )
}