###### Calculator app ##########

- make the background  #ffffff
- and other the same as the calculator image

# work on the front end first ----- DONE

## done
- group the buttons into 5 groups
AC, DEL, %, /
7, 8, 9, *
4, 5, 6, -
1, 2, 3, +
0, ., =

## done
- `make the calculator black including the input and the input text color white`
- `make the buttons circular`
- `make the buttons the same size`
- `make the buttons the same color as the calculator image`



# work on the back end 

## work on the general part --DONE


- make the buttons clickable and display the value to the input
  * you can use a function that appends to the input when clicked
  * onClick = appendToDisplay(value)
  * appendToDisplay(value) {
    this.setState({
      input: this.state.input + value
    })
  }

- make the AC button clear the input
  * make the input = 0;
- make the DEL button delete the last character
  * use the slice method to delete the last character
  .substring(0, input.length - 1)

- evaluate the expression when the = button is clicked
  * use the eval function to evaluate the expression

## work on the user stories


## User Story #11: 
When the decimal element is clicked, a . should append to the currently displayed value; two . in one number should not be accepted.

- create a state(dotAdded) and if the user appends another . don't change the value of the input
- when the user adds a . setDOt = true;
- if true don't let the user add another dot;
- if the dot isn't in the value clear

 

## User Story #13:
If 2 or more operators are entered consecutively, the operation performed should be the last operator entered (excluding the negative (-) sign). For example, if 5 + * 7 = is entered, the result should be 35 (i.e. 5 * 7); if 5 * - 5 = is entered, the result should be -25 (i.e. 5 * (-5)).

- `create a state (operator) which is a string and make it an empty string by default`
-` create a state (operatorAdded) default false and if the user adds a number make it false;`
- `if the user adds an operator again add the last operator from input and the new operator to operator and continue until the user adds a number`
- `if the user adds a number set operatorAdded to false and add the last operator to the input and the number next to it but if it is minus add the minus and the operator before it to the input and then add the number next to it;`






const [input, setInput] = useState("0");
  const [dotAdded, setDotAdded] = useState(false);
 



  // Evaluate
  const evaluateExpression = () => {
    try {
      appendToDisplay("=");
      console.log(input + "       " + operator);
      const sanitizedInput = input.replace(/[^-()\d/*+.]/g, '');
      setInput(eval(sanitizedInput).toString());
    } catch (e) {
      console.log(e);
      setInput("Error");
    }
  };

    const [count, setCount] = useState(0);

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
      setCount((prev) => prev + 1);
      setInput((prev) => prev + value);
      setDotAdded(false);
    } 
    else if (!(value === "." && dotAdded)) {
      setInput((prev) => (prev === "0" ? value : prev + value));
    }

    // Handle the case when operator is added multiple times
    if ((numbers.includes(value))) {
       if(count > 1) {
          let len = input.length - count;
          if(input.slice(-1) === "-")
          {
            setInput((prev) => (prev.slice(0, len) + "-" + value));
          }
          else {
          setInput((prev) => (prev.slice(0, len) + value));
          }
       }
      else {
        setInput((prev) => (prev + value));
      }
    }
  };

  
  // Clear all
  const AC = () => {
    setInput("0");
    setDotAdded(false);
  };