import React from "react";

const Header: React.FC = () => {
  return (
    <header 
      className="bg-indigo-600 text-white p-5 flex justify-between items-center shadow-lg"
      role="banner"
      aria-label="Movie Explorer Header"
    >
      <h1 className="text-3xl font-bold tracking-wide">🎬 Movie Explorer</h1>
    </header>
  );
};

export default Header;
