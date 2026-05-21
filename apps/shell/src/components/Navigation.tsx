import { useLocation, useNavigate } from "react-router-dom";
import { FrameworkBadge } from "@my-portal/ui";
import { NAV_ITEMS } from "../utils/navigation";

interface NavigationProps {
  setLoading: (loading: boolean) => void;
  setErrorMessage: (error: string) => void;
}

export function Navigation({ setLoading, setErrorMessage }: NavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (item: typeof NAV_ITEMS[0]) => {
    if (location.pathname === item.href) return;

    if (item.hasApp) {
      performance.mark("route-change-start");
      setLoading(true);
    } else {
      setLoading(false);
    }
    setErrorMessage("");
    navigate(item.href);
  };

  return (
    <nav className="nav-scroll-container" aria-label="Application sections">
      <div className="flex items-center gap-1.5 py-1" role="list">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.href}
            role="listitem"
            onClick={() => handleNavClick(item)}
            className={`nav-pill ${location.pathname.startsWith(item.href) ? "nav-pill-active" : ""}`}
            aria-current={location.pathname.startsWith(item.href) ? "page" : undefined}
          >
            <span>{item.label}</span>
            <FrameworkBadge name={item.framework} />
          </button>
        ))}
      </div>
    </nav>
  );
}
