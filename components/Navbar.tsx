import { useCallback, useEffect, useState } from 'react';
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs';

import NavbarItem from './NavbarItem';
import MobileMenu from './MobileMenu';
import AccountMenu from './AccountMenu';

const TOP_OFFSET = 66;

const navItems = [
  { name: 'Home' },
  { name: 'Series' },
  { name: 'Movies' },
  { name: 'New & Popular' },
  { name: 'My List' },
  { name: 'Browse by languages' }
];

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY >= TOP_OFFSET
        ? setShowBackground(true)
        : setShowBackground(false);
    };

    window.addEventListener('scroll', handleScroll);

    // Remove the scroll listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle the mobile menu toggle
  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu(current => !current);
  }, []);

  // Handle the account menu toggle
  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu(current => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 lg:px-16 py-6 flex items-center transition duration-500 ${
          showBackground ? 'bg-zinc-900 bg-opacity-90 ' : ''
        }`}
      >
        <img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo" />

        <div className="ml-8 gap-7 hidden lg:flex">
          {navItems.map(item => (
            <NavbarItem key={item.name} label={item.name} />
          ))}
        </div>

        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>

          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? 'rotate-180' : 'rotate-0'
            }`}
          />

          <MobileMenu visible={showMobileMenu} />
        </div>

        <div className="flex ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>

          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>

          <div
            onClick={toggleAccountMenu}
            className="flex items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-green.png" alt="Profile" />
            </div>

            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? 'rotate-180' : 'rotate-0'
              }`}
            />

            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
