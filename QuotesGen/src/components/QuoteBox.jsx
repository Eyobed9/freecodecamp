import { useEffect, useState } from "react";
import { FaTwitter, FaTumblr } from "react-icons/fa";
import axios from "axios";
import './QuoteBox.css'; // Import the CSS file

// The quote box
function QuoteBox() {
  const colors = ["#16a085", "#27ae60", "#2c3e50", "#f39c12", "#e74c3c", "#9b59b6", "#FB6964", "#342224", "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState(""); 
  const [backgroundColor, setBackgroundColor] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading

  // Change the background color
  const changeColor = () => {
    let index = Math.floor(Math.random() * colors.length);
    setBackgroundColor(colors[index]);
    if(backgroundColor!=""){
    document.body.style.backgroundColor = backgroundColor;
    document.getElementById("quote-box").style.color = backgroundColor;
    const elements = document.getElementsByClassName("button");

    Array.from(elements).forEach((element) => {element.style.backgroundColor = backgroundColor})

    }
  }

  const allData = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await axios.get("https://api.api-ninjas.com/v1/quotes?&X-Api-Key=t0jwniUfusCxw/pN/QcZHg==d9WmaX8sfzIfRwGI");
      const data = response.data[0]
      setQuote(data.quote);
      setAuthor(data.author);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched

      // Change the background color
      changeColor();
    }
  };

  useEffect(() => {
    allData();
  }, []);
  

  return (
    <>
      <div id="quote-box" className={loading ? 'fade' : ''}>
        <div id="text"  style={{opacity: loading ? "0" : "1"}}>&#x275D; {quote}</div>
        <div id="author" style={{opacity: loading ? "0" : "1"}}>{author}</div>
        <a href="twitter.com/intent/tweet" target="_blank" className="button" id="tweet-quote"><FaTwitter/></a>
        <a href="https://www.tumblr.com/" target="_blank" className="button" id="tumblr"><FaTumblr/></a>
        <button className="button" id="new-quote" onClick={allData}>
          New Quote
        </button>
      </div>
    </>
  );
}

export default QuoteBox;
