import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [secret, setSecret] = useState("7596");
  const [guess, setGuess] = useState("");
  const [statusMessage, setStatus] = useState("Guess a 4 digit number!");
  const [tries, incrementTries] = useState(0);
  const [win, setWin] = useState(false);
 
  function makeGuess(givenGuess, secretPhrase) {
    if (win) return;
    if (tries >= 8) {
      setStatus("Sorry! The number was: " + secret);
      return;
    }
    if (givenGuess.length != 4) {
      setStatus("Invalid size! Guess a 4 digit number!");
      setGuess("");
      return;
    }
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (i != j) {
          if (givenGuess.charAt(i) === givenGuess.charAt(j)) {
            setStatus("Invalid number! Digits must be unique!");
            setGuess("");
            return;
          }
        }  
      }
    }
    
    var A = 0;
    var B = 0;
    for (var i = 0; i < 4; i++) {
      if (secretPhrase.includes(givenGuess.charAt(i))) {
        if (secretPhrase.charAt(i) === givenGuess.charAt(i)) {
          A++;
        } else {
          B++;
        }
      }
    }
    
    setStatus("");
    setGuess("");
    incrementTries(tries + 1);
    if (tries >= 8) {
      setStatus("Sorry! The number was: " + secret);
    }

    var tbodyRef = document.getElementById('Guesses').getElementsByTagName('tbody')[0];
    var newRow = tbodyRef.insertRow();

    var guessCell = newRow.insertCell();
    var guessText = document.createTextNode(givenGuess);
    guessCell.appendChild(guessText);

    var accCell = newRow.insertCell();
    var accText = document.createTextNode(A + "A" + B + "B");
    accCell.appendChild(accText);
    
    if (A == 4) {
      setStatus("Congrats! You guessed right!");
      setWin(true);
    }
    return;
  }

  return (
    <div className="App">
      <form name="Numbers">
        <table id="Inputs">
          <tr>
            <td>
          <table>
            <tr>
              <td><input type="button" name="one" value="1" onClick={() => setGuess(guess + "1")}></input></td>
              <td><input type="button" name="two" value="2" onClick={() => setGuess(guess + "2")}></input></td>
              <td><input type="button" name="three" value="3" onClick={() => setGuess(guess + "3")}></input></td>
            </tr>
            <tr>
              <td><input type="button" name="four" value="4" onClick={() => setGuess(guess + "4")}></input></td>
              <td><input type="button" name="five" value="5" onClick={() => setGuess(guess + "5")}></input></td>
              <td><input type="button" name="six" value="6" onClick={() => setGuess(guess + "6")}></input></td>
            </tr>
            <tr>
              <td><input type="button" name="seven" value="7" onClick={() => setGuess(guess + "7")}></input></td>
              <td><input type="button" name="eight" value="8" onClick={() => setGuess(guess + "8")}></input></td>
              <td><input type="button" name="nine" value="9" onClick={() => setGuess(guess + "9")}></input></td>
            </tr>
            <tr>
              <td><input type="button" id="clear" name="clear" value="Del" onClick={() => setGuess("")}></input></td>
              <td><input type="button" name="zero" value="0" onClick={() => setGuess(guess + "0")}></input></td>
              <td><input type="button" name="evaluate" value="Go!" onClick={() => makeGuess(guess, secret)}></input></td>

            </tr>
              </table>
            </td>
            <td>
          <table id="Guesses">
            <thead>
              <tr>
                <th>Guess:{guess} Attempts: {tries}</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
            <tfoot>
              <tr>
                <td>{statusMessage}</td>
              </tr>
            </tfoot>
              </table>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
}

export default App;
