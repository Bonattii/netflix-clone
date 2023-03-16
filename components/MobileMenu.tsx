import React from 'react';

interface MobileMenuProps {
  visible?: boolean;
}

const navItems = [
  { name: 'Home' },
  { name: 'Series' },
  { name: 'Movies' },
  { name: 'New & Popular' },
  { name: 'My List' },
  { name: 'Browse by languages' }
];

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex flex-col border-2 border-gray-800">
      <div className="flex flex-col gap-4">
        {navItems.map(item => (
          <div
            key={item.name}
            className="px-3 text-center text-white hover:underline"
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
