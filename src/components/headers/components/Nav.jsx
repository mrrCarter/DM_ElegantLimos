import { menuItems } from "@/data/menu";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Nav() {
  const { pathname } = useLocation();

  return (
    <>
      {menuItems.map((elm, i) => (
        <li key={i} className={elm.subMenu.length > 0 ? "has-children" : ""}>
          {elm.subMenu.length > 0 ? (
            <>
              <a
                className={`active ${
                  elm.subMenu.some(
                    (elm3) => pathname.split("/")[1] === elm3.link.split("/")[1]
                  )
                    ? "active-link"
                    : ""
                } `}
              >
                {elm.title}
              </a>
              <ul className="sub-menu">
                {elm.subMenu.map((elm2, i2) => (
                  <li key={i2}>
                    <Link
                      className={
                        pathname.split("/")[1] === elm2.link.split("/")[1]
                          ? "active-link"
                          : ""
                      }
                      to={elm2.link}
                    >
                      {elm2.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Link
              to={elm.link}
              className={pathname === elm.link ? "active-link" : ""}
            >
              {elm.title}
            </Link>
          )}
        </li>
      ))}
    </>
  );
}
