"use client";
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import styles from "./Autocomplete.module.css";

interface AutocompleteProps {
  suggestions: string[];
}

function Autocomplete({ suggestions }: AutocompleteProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value;
    setInputValue(userInput);

    const newFilteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setFilteredSuggestions(newFilteredSuggestions);
    setShowSuggestions(true);
  };

  const handleClick = (suggestion: string) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && filteredSuggestions.length > 0) {
      setInputValue(filteredSuggestions[0]);
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const suggestionsListComponent =
    showSuggestions && inputValue ? (
      <ul className={styles.suggestions}>
        {filteredSuggestions.map((suggestion, index) => {
          return (
            <li key={index} onClick={() => handleClick(suggestion)}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : null;

  return (
    <div className={styles.autocomplete} ref={inputRef}>
      <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={inputValue}
      />
      {suggestionsListComponent}
    </div>
  );
}

function AutocompletePage() {
  const suggestions = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
    "Kiwi",
    "Lemon",
    "Mango",
    "Orange",
    "Pineapple",
    "Raspberry",
    "Strawberry",
    "Watermelon",
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Autocomplete suggestions={suggestions} />
    </div>
  );
}

export default AutocompletePage;
