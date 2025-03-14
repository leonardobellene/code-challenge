import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      className="absolute bottom-0 w-full bg-indigo-600 text-white text-center p-4 mt-6 shadow-lg"
      role="contentinfo"
      aria-label="Movie Explorer Footer"
    >
      <p>© 2025 Movie Explorer. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
