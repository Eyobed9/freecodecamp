import "../public/styles.css";
import { useState } from "react";

function Calculator() {
  const [input, setInput] = useState("0");
  const [dotAdded, setDotAdded] = useState(false);
  const [operatorAdded, setOperatorAdded] = useState(false);
  const [operator, setOperator] = useState("");

  // Append to the input
  const appendToDisplay = (value) => () => {
    const operators = ["+", "-", "*", "/", "%"];
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    if(input == "Error")
      setInput("0");
    if (value === "." && !dotAdded) 
    {
      setDotAdded(true);
      setInput((prev) => prev + value);
    } 
    else if (value === "." && dotAdded) {
      return;
    }
    else if (operators.includes(value)) 
    {
      if (!operatorAdded) 
        {
        setOperatorAdded(true);
        setOperator(value);
      } 
      else 
      {
        setOperator((prev) => prev + value);
      }
      setInput((prev) => prev + value);
      setDotAdded(false);
    } 
    else if (!(value === "." && dotAdded)) {
      setInput((prev) => (prev === "0" ? value : prev + value));
    }

    // Handle the case when operator is added multiple times
    if ((numbers.includes(value)) && operatorAdded) {
      setOperatorAdded(false);
      let len = input.length - operator.length;
      console.log("len" + len);
      console.log("input" + input.slice(0, len));

      if (operator.slice(-1) === "-" && operator.length > 1) {
        setInput((prev) => (prev.slice(0, len) + operator.slice(-2) + value));
      } else {
        setInput((prev) => (prev.slice(0, len) + operator.slice(-1) + value));
      }
    }
    console.log("operators: "+operator);
  };


    
  // Clear all
  const AC = () => {
    setInput("0");
    setOperator("");
    setDotAdded(false);
  };

  // Clear one by one
  const Delete = () => {
    if (input === "Error") {
      setInput("0");
    } else if (input.slice(-1) === ".") {
      setDotAdded(false);
    }
    setInput((prev) => (prev.length === 1 ? "0" : input.slice(0, -1)));
  };

  // Evaluate
  const evaluateExpression = () => {
    try {
      const sanitizedInput = input.replace(/[^-()\d/*+.]/g, '');
      setInput(eval(sanitizedInput).toString());
    } catch (e) {
      console.log(e);
      setInput("Error");
    }
  };

  return (
    <div className="container">
      <input id="display" readOnly className="group" value={input} />
      <div className="group">
        <button id="clear" onClick={() => AC()}>
          AC
        </button>
        <button id="delete" onClick={() => Delete()}>
          DEL
        </button>
        <button onClick={appendToDisplay("%")} id="modulus">
          %
        </button>
        <button onClick={appendToDisplay("/")} id="divide">
          /
        </button>
      </div>

      <div className="group">
        <button onClick={appendToDisplay("7")} id="seven">
          7
        </button>
        <button onClick={appendToDisplay("8")} id="eight">
          8
        </button>
        <button onClick={appendToDisplay("9")} id="nine">
          9
        </button>
        <button onClick={appendToDisplay("*")} id="multiply">
          *
        </button>
      </div>
      <div className="group">
        <button onClick={appendToDisplay("4")} id="four">
          4
        </button>
        <button onClick={appendToDisplay("5")} id="five">
          5
        </button>
        <button onClick={appendToDisplay("6")} id="six">
          6
        </button>
        <button onClick={appendToDisplay("-")} id="subtract">
          -
        </button>
      </div>
      <div className="group">
        <button onClick={appendToDisplay("1")} id="one">
          1
        </button>
        <button onClick={appendToDisplay("2")} id="two">
          2
        </button>
        <button onClick={appendToDisplay("3")} id="three">
          3
        </button>
        <button onClick={appendToDisplay("+")} id="add">
          +
        </button>
      </div>
      <div className="group">
        <button onClick={appendToDisplay("0")} id="zero">
          0
        </button>
        <button onClick={appendToDisplay(".")} id="decimal">
          .
        </button>
        <button onClick={() => evaluateExpression()} id="equals">
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;
