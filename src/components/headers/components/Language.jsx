import { languages } from "@/data/languages";

import { useState } from "react";

export default function Language() {
  const [SelectedLanguage, setSelectedLanguage] = useState(languages[0].code);
  const [ddOpen, setDdOpen] = useState(false);

  return (
    <div
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setDdOpen(false);
        }
      }}
    >
      <button
        type="button"
        onClick={() => setDdOpen((pre) => !pre)}
        className="text-14-medium icon-list icon-account"
        aria-haspopup="listbox"
        aria-expanded={ddOpen}
      >
        <span className="text-14-medium color-white arrow-down">
          {SelectedLanguage}
        </span>
      </button>
      <div
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
              <button type="button" className="font-md">
                <img src={elm.image} alt="luxride" />
                {elm.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
