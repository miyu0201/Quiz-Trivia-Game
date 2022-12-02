import React, { useState, useContext } from "react";
import Questions from "./Questions.js";
import { Button } from "reactstrap";
import "./App.css";

const LinkContext = React.createContext();

export function UseLinkContext() {
  return useContext(LinkContext);
}

export default function App({ children }) {
  const [start, setStart] = useState(false);
  const [link, setLink] = useState(
    "https://opentdb.com/api.php?amount=5&type=multiple"
  );

  function handleSubmit() {
    setStart(true);
  }

  function handleChange(e) {
    setLink(e.target.value);
  }
  console.log(link);
  return start === false ? (
   
      
      <LinkContext.Provider value={{ link, setLink }}>
        <div className="start">
          
         <div> <h1 style={{ color: "#483D8B", fontFamily: "Inter" }}>Quizzical</h1>
          <h6>Test you abilities, become aware of your limitations</h6></div>
          <form>
            <select
              style={{ border:"2px solid #483D8B"}}
              value={link}
              onChange={handleChange}
            >
              <option value="https://opentdb.com/api.php?amount=5&category=9&type=multiple">
                General Questions
              </option>
              <option value="https://opentdb.com/api.php?amount=5&category=10&type=multiple">
                Entertainment_Books
              </option>
              <option value="https://opentdb.com/api.php?amount=5&category=11&type=multiple">
                Entertainment_Film
              </option>
              <option value="https://opentdb.com/api.php?amount=5&category=17&type=multiple">
                Science & Nature
              </option>
              <option value="https://opentdb.com/api.php?amount=5&category=21&type=multiple">
                Sports
              </option>
              <option value="https://opentdb.com/api.php?amount=5&category=23&type=multiple">
                History
              </option>
            </select>
          </form>
          
          <Button color="primary" className="button" onClick={handleSubmit}>
            Start Game
          </Button>
        </div>
        {children}
      </LinkContext.Provider>
   
  ) : (
    <main>
      <LinkContext.Provider value={{ link, setLink }}>
        <Questions />
      </LinkContext.Provider>
    </main>
  );
}
