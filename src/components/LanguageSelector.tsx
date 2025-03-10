import React, { useContext } from "react";
import { LangContext } from "@/app/apex/page";

interface LanguageSelectorProps {
  selected?: React.Context<string>;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = () => {
  const languages = [
    { key: "en", value: "English" },
    { key: "es", value: "Spanish" },
  ];

  const [key, setLang] = useContext(LangContext);

  return (
    <select
      onChange={({ target: { value } }) => {
        setLang(value);
      }}
    >
      {languages.map((language) => (
        <option key={language.key} value={language.key}>
          {language.value}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
