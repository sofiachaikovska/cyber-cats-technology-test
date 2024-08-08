import css from "./AnimalAutocomplete.module.css";
import { useState, useRef, useEffect } from "react";
import { animals } from "../../constants/animals";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const AnimalAutocomplete = () => {
  const [animalList, setAnimalList] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setAnimalList(animals);
      setIsLoading(false);
    }, 3000);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const filtered = animalList.filter((animal) =>
        animal.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredAnimals(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  const handleSelect = (animal) => {
    setQuery(animal);
    setShowDropdown(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={css.autocompleteContainer}>
      {isLoading ? (
        <p className={css.loadingText}>Loading...</p>
      ) : (
        <div className={css.formContainer}>
          <h1 className={css.formTitle}>
            Animal <span className={css.formTitleAccent}>Auto</span>complete
          </h1>
          <div className={css.inputContainer}>
            <form ref={inputRef} className={css.autocompleteForm}>
              <input
                className={css.input}
                type="text"
                value={query}
                onChange={handleInputChange}
                onFocus={() => {
                  query && setShowDropdown(true);
                }}
                placeholder="Search animals..."
              />
              <FontAwesomeIcon
                icon={faChevronDown}
                className={css.dropDownIcon}
              />
            </form>
            {showDropdown && (
              <ul className={css.dropdown}>
                {filteredAnimals.length > 0 ? (
                  filteredAnimals.map((animal) => (
                    <li
                      key={nanoid()}
                      className={css.dropdownItem}
                      onClick={() => handleSelect(animal)}
                    >
                      {animal}
                    </li>
                  ))
                ) : (
                  <li key={nanoid()} className={css.noMatchesFoundItem}>
                    No matches found.
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalAutocomplete;
