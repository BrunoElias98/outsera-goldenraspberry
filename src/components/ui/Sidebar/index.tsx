import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaVideo } from "react-icons/fa";
import { SidebarItem } from "@/components/ui/Sidebar/SidebarItem";

interface MainLink {
  label: string;
  icon: any;
  href?: string;
}

const mainLinks: MainLink[] = [
  {
    label: "Dashboard",
    icon: FaHome,
    href: "/",
  },
  {
    label: "Filmes",
    icon: FaVideo,
    href: "/lista-filmes",
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRedirect = (item: any) => {
    navigate(item.href);
    onClose();
  };

  return (
    <nav
      className={`fixed lg:relative z-20 flex flex-col w-[290px] p-4 bg-[#0e2524] text-white min-h-screen transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
    >
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-xl font-bold">Outsera</h1>
        <button
          onClick={onClose}
          className="lg:hidden text-white text-2xl focus:outline-none"
        >
          &times;
        </button>
      </div>
      <div className="flex flex-col space-y-2">
        {mainLinks.map((link) => (
          <SidebarItem
            key={link.label}
            label={link.label}
            Icon={link.icon}
            isActive={location.pathname === link.href!}
            onClick={() => handleRedirect(link)}
          />
        ))}
      </div>
    </nav>
  );
}
