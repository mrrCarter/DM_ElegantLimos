import { menuItems } from "@/data/menu";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function MobileNav() {
  const { pathname } = useLocation();

  return (
    <>
      {menuItems.map((elm, i) => (
        <li key={i}>
          {/* Directly link the parent menu items without dropdown behavior */}
          <Link
            to={elm.link}
            className={`mobileMenuParent ${
              pathname.split("/")[1] === elm.link.split("/")[1]
                ? "active-link"
                : ""
            }`}
          >
            <span>{elm.title}</span>
          </Link>
        </li>
      ))}
    </>
  );
}
