import { FaChevronDown } from "react-icons/fa";

interface SidebarItemProps {
  label: string;
  Icon: React.ElementType;
  subLinks?: { label: string; href: string }[];
  isActive: boolean;
  onClick: () => void;
}

export function SidebarItem({
  label,
  Icon,
  subLinks,
  isActive,
  onClick,
}: SidebarItemProps) {
  return (
    <div className="flex flex-col">
      <button
        onClick={onClick}
        className={`group flex items-center py-3.5 pl-5 pr-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
          isActive ? "bg-[#1a4240]" : "hover:bg-[#153735]"
        }`}
      >
        <Icon
          className={`mr-3 text-lg w-[20px] h-[20px] items-center ${
            isActive ? "text-white" : "text-[#d8e8e8]"
          } group-hover:text-white`}
        />
        <span
          className={`group-hover:text-white ${
            isActive ? "text-white" : "text-[#d8e8e8]"
          }`}
        >
          {label}
        </span>
        {subLinks && (
          <FaChevronDown
            className={`ml-auto group-hover:text-white`}
            size={14}
          />
        )}
      </button>
    </div>
  );
}
