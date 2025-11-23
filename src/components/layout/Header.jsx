import React from 'react';
import { NavLink, Link } from 'react-router-dom'; 
import { navLinks } from '../../constants';
import { logo } from '../../assets';

const Header = () => {
    return (
        <header className="border-b border-gray-200 sticky top-14 bg-white z-10 shadow-sm">
            <div className="container mr-26 ml-32 px-8 h-16 flex items-center justify-between">
                
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <img src={logo} alt="logo" className="w-12 h-12" />
                    <span className="text-xl font-bold text-indigo-600">FreeTime Spots</span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    {navLinks
                        .filter(item => item.path !== '/mypage') 
                        .map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => 
                                `transition-colors duration-200 ${
                                isActive 
                                ? 'text-indigo-600 font-bold' 
                                : 'text-gray-600 hover:text-indigo-600' 
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-6 ">
                    
                    <NavLink 
                        to="/"
                        className={({ isActive }) => 
                            `text-sm font-medium transition-colors duration-200 pr-6 ${
                            isActive 
                            ? 'text-indigo-600 font-bold' 
                            : 'text-gray-600 hover:text-indigo-600' 
                            }`
                        }
                    >
                        マイページ
                    </NavLink>

                    {/* Avatar */}
                    <Link to="/mypage" className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden border border-gray-200 hover:ring-2 hover:ring-indigo-400 transition">
                        <img src="avatar.png" alt="User" className="w-full h-full object-cover" />
                    </Link>

                </div>
            </div>
        </header>
    );
};

export default Header;