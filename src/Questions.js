import { React, useState, useEffect } from "react";
import QuestionElement from "./QuestionElement.js";
import { Button } from "reactstrap";
import "./App.css";
import { UseLinkContext } from "./App";

export default function Questions() {
  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [check, setCheck] = useState(false);
  const [message, setMessage] = useState("");
  const [reset, setReset] = useState(false);
  const { link, setLink } = UseLinkContext();

  //fetch data from api, save value in state
  //use array.concat to merge correct and incorrect answer, then sort the array randomly.
  //"https://opentdb.com/api.php?amount=5&type=multiple"
  useEffect(
    function () {
      fetch(link)
        .then((res) => res.json())
        .then((data) => {
          const allData = data.results.map((data, i) => {
            return {
              ...data,
              question: data.question
                .replace(/&amp;/g, "&")
                .replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'"),
              id: i,
              options: data.incorrect_answers
                .map((answer) => answer)
                .concat(data.correct_answer)
                .sort(() => 0.5 - Math.random()),
              selected: false,
            };
          });
          setQuestions(allData);
          setStart(true);
        });
    },
    [reset, link] //call useEffect everytime state of reset changes
  );

  console.log(questions);

  //get value of selected option
  //if id===selected id, set selected true, update selected value. else remain unchanged
  const holdValue = (e, id) => {
    setQuestions((prevState) =>
      prevState.map((data) => {
        return data.id === id
          ? {
              ...data,
              selected: true,
              selectedValue: e.target.innerText,
            }
          : data;
      })
    );
  };

  const handleCheck = () => {
    // use array.every = true to check if all questions are answered
    //use questions.filter to get the number of correct answers
    const allselected = questions.every((question) => question.selected);
    if (allselected) {
      setCheck(true);
      const correct = questions.filter(
        (question) => question.correct_answer === question.selectedValue
      );
      setMessage(
        `Your got ${correct.length} correct answers out of 5 questions!`
      );
    } else {
      setMessage("Please answer all questions before proceeding!");
    }
  };

  function handleReset() {
    setReset((prevState) => !prevState);
    setCheck(false);
    setMessage("");
  }

  return (
    <div>
      {questions.map((question) => (
        <QuestionElement
          {...question}
          key={question.id}
          //options={question.options}
          holdValue={holdValue}
          check={check}
        />
      ))}
      {<h4 style={{ marginTop: "20px" }}>{message}</h4>}
      {/* show check answer button when check is false and game is started*/}
      {start === true && check === false && (
        <Button color="primary" className="button" onClick={handleCheck}>
          Check answer
        </Button>
      )}

      {/* show reset button when check is true*/}
      {check === true && (
        <div>
          <Button color="secondary" className="button" onClick={handleReset}>
            Restart Game
          </Button>
        </div>
      )}
    </div>
  );
}
