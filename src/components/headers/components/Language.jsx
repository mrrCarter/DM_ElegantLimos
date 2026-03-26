import { languages } from "@/data/languages";

import { useEffect, useRef, useState } from "react";

export default function Language() {
  const [SelectedLanguage, setSelectedLanguage] = useState(languages[0].code);
  const [ddOpen, setDdOpen] = useState(false);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const target = event.target;
      const clickedInsideTrigger = triggerRef.current?.contains(target);
      const clickedInsideMenu = menuRef.current?.contains(target);

      if (!clickedInsideTrigger && !clickedInsideMenu) {
        setDdOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <>
      <span
        ref={triggerRef}
        onClick={() => setDdOpen((pre) => !pre)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setDdOpen((pre) => !pre);
          }
        }}
        className="text-14-medium icon-list icon-account"
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={ddOpen}
      >
        <span className="text-14-medium color-white arrow-down">
          {SelectedLanguage}
        </span>
      </span>
      <div
        ref={menuRef}
        className={`dropdown-account ${ddOpen ? "dropdown-open" : ""} `}
        role="listbox"
      >
        <ul>
          {languages.map((elm, i) => (
            <li
              key={i}
              onClick={() => {
                setSelectedLanguage(elm.code);
                setDdOpen(false);
              }}
              role="option"
              aria-selected={SelectedLanguage === elm.code}
            >
              <a className="font-md" href="#">
                <img src={elm.image} alt="luxride" />
                {elm.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
