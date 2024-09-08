import React from 'react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
      <div className="flex items-center">
        <button
          onClick={onToggleSidebar}
          className="text-gray-500 focus:outline-none lg:hidden"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H11"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
        <div className="relative mx-4 lg:mx-0">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </span>
          <input
            className="w-32 pl-10 pr-4 rounded-md form-input sm:w-64 focus:border-indigo-600"
            placeholder="Search"
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <button className="relative text-gray-500 focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 17H20L18.595 15.595C18.214 15.214 18 14.697 18 14.158V11C18 8.388 16.33 6.165 14 5.341V5C14 3.895 13.105 3 12 3C10.895 3 10 3.895 10 5V5.341C7.67 6.165 6 8.388 6 11V14.158C6 14.697 5.786 15.214 5.405 15.595L4 17H9M15 17V18C15 19.657 13.657 21 12 21C10.343 21 9 19.657 9 18V17M15 17H9"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
        </button>

        {/* User Icon */}
        <div className="relative">
          <button className="relative block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none">
            <img
              className="object-cover w-full h-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
              alt="User avatar"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;