import React, { useMemo, useState } from 'react';
import { NavLink, Link } from 'react-router-dom'; 
import { Menu, X } from 'lucide-react';
import { navLinks } from '../../constants';
import { default_avatar, logo } from '../../assets';
import { useLang } from '../../context/LanguageContext';

const Header = () => {
    const {t, lang, setLang} = useLang();
    const [isOpen, setIsOpen] = useState(false);
    const isAuthed = useMemo(() => Boolean(sessionStorage.getItem("authToken")), []);

    const filteredLinks = navLinks.filter(item => item.path !== '/mypage');

    const renderLinks = (onNavigate) => (
        filteredLinks.map((item) => (
            <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                    `transition-colors duration-200 ${
                    isActive 
                    ? 'text-indigo-600 font-bold' 
                    : 'text-gray-700 hover:text-indigo-600' 
                    }`
                }
                onClick={onNavigate}
            >
                {t(item.label)}
            </NavLink>
        ))
    );

    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    {isAuthed && (
                        <button
                            type="button"
                            className="lg:hidden p-2 rounded-md border border-gray-200 hover:bg-gray-50 transition"
                            onClick={() => setIsOpen((prev) => !prev)}
                            aria-label="Toggle navigation"
                        >
                            {isOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    )}

                {/* Logo */}
                    <Link to="/map" className="flex items-center gap-2 group">
                        <img src={logo} alt="logo" className="w-10 h-10 sm:w-12 sm:h-12" />
                        <span className="text-lg sm:text-xl font-bold text-indigo-600 whitespace-nowrap">FreeTime Spots</span>
                    </Link>
                </div>

                {isAuthed && (
                    <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
                        {renderLinks()}
                    </nav>
                )}

                <div className="flex items-center gap-3 sm:gap-4">
                    <label className="text-xs text-gray-600 hidden sm:inline" htmlFor="lang-select">
                        {t('language')}
                    </label>
                    <select
                        id="lang-select"
                        value={lang}
                        onChange={(e) => setLang(e.target.value)}
                        className="border border-gray-200 rounded-md px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                    >
                        <option value="vi">VI</option>
                        <option value="en">EN</option>
                        <option value="jp">JP</option>
                    </select>

                    {isAuthed && (
                        <Link to="/settings" className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden border border-gray-200 hover:ring-2 hover:ring-indigo-400 transition">
                            <img src={default_avatar} alt="User" className="w-full h-full object-cover" />
                        </Link>
                    )}
                </div>
            </div>

            {isAuthed && isOpen && (
                <div className="lg:hidden border-t border-gray-200 bg-white shadow-sm animate-slideDown">
                    <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-3 text-sm font-medium">
                        {renderLinks(() => setIsOpen(false))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;