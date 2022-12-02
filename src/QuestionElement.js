import { React } from "react";
import "./App.css";
import { nanoid } from "nanoid";

export default function QuestionElement(props) {
  const styleCorrect = {
    backgroundColor: "#20B2AA",
    border: "2px solid #20B2AA",
    color: "white",
  };

  const styleSelected = {
    backgroundColor: "#6495ED",
    border: "2px solid #4682B4",
    color: "white",
  };

  const styleUnselected = { color: "#4D5B9E", border: "2px solid #4D5B9E" };

  const styleIncorrect = {
    backgroundColor: "#FFA07A",
    border: "2px solid #FFA07A",
    color: "white",
  };

  return (
    <div className="questionSection">
      <h4 style={{color:"#483D8B"}}>{props.question}</h4>

      <div className="options">
        {props.options.map((value) => {
          if (props.check === false && props.selectedValue === value) { //checked and selected
            return (
              <div
                className="option"
                key={nanoid()}
                onClick={(e) => props.holdValue(e, props.id)}
                style={styleSelected}
              >
                
                {value}
              </div>
            );
          } else if (props.check === false) {//not checked 
            return (
              <div
                className="option"
                key={nanoid()}
                onClick={(e) => props.holdValue(e, props.id)}
                style={styleUnselected}
              >
                
                {value}
              </div>
            );
          } else if (
            props.check === true && //checked and selected correct answer and selected
            props.selectedValue === props.correct_answer &&
            props.selectedValue === value
          ) {
            return (
              <div
                className="option"
                key={nanoid()}
                onClick={(e) => props.holdValue(e, props.id)}
                style={styleCorrect}
              >
                
                {value}
              </div>
            );
          } else if ( //checked and selected and the selected option is incorrect, then style the correct option to correct style
            props.check === true &&
            props.selectedValue !== props.correct_answer &&
            props.selectedValue !== value &&
            props.correct_answer === value
          ) {
            return (
              <div
                className="option"
                key={nanoid()}
                onClick={(e) => props.holdValue(e, props.id)}
                style={styleCorrect}
              >
                
                {value}
              </div>
            );
          } else if ( //checked and selected and the selected option is incorrect, then style the incorrect option to incorrect style
            props.check === true &&
            props.selectedValue === value &&
            props.selectedValue !== props.correct_answer
          ) {
            return (
              <div
                className="option"
                key={nanoid()}
                onClick={(e) => props.holdValue(e, props.id)}
                style={styleIncorrect}
              >
                
                {value}
              </div>
            );
          } else if (props.check === true && props.selectedValue !== value) {//checked, then style the not selected option to unselected style
            return (
              <div
                className="option"
                key={nanoid()}
                onClick={(e) => props.holdValue(e, props.id)}
                style={styleUnselected}
              >
               
                {value}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

