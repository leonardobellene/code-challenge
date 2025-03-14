import React, { useRef, useState, useEffect } from "react";
import { SORT_OPTIONS } from "../../constants";
import ChevronDown from "../../icons/chevron-down";
import ChevronUp from "../../icons/chevron-up";

interface SortDropdownProps {
  sort: string;
  setSort: (value: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  sort,
  setSort,
}) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Get a reference to the dropdown element
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSortDropdown(false);
      }
    };

    if (showSortDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSortDropdown]);

  return (
    <div className="relative h-[42px]" ref={sortDropdownRef}>
      <button
        className="border border-gray-300 h-[42px] px-4 py-2 pr-1 flex items-center justify-between w-48 rounded-lg bg-white hover:bg-gray-100 transition"
        onClick={() => setShowSortDropdown(!showSortDropdown)}
        aria-haspopup="listbox"
        aria-expanded={showSortDropdown}
        aria-label="Sort movies"
      >
        {SORT_OPTIONS.find((option) => option.value === sort)?.label || "Sort"}
        {showSortDropdown ? <ChevronUp /> : <ChevronDown />}
      </button>

      {showSortDropdown && (
        <ul
          className="absolute mt-1 w-48 bg-white border rounded-lg shadow-md z-10"
          role="listbox"
        >
          {SORT_OPTIONS.map((option) => (
            <li
              key={option.value}
              className="p-2 cursor-pointer hover:bg-gray-200 transition"
              onClick={() => {
                setSort(option.value);
                setShowSortDropdown(false);
              }}
              role="option"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSort(option.value);
                  setShowSortDropdown(false);
                }
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;
