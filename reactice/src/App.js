import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import cards from "./cards.json";
import "./App.css";


let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click on an image to earn points, but don't click on any of them more than once!";

class App extends Component {

  // Setting this.state.cards to the cards state json array
  state = {
    cards,
    correctGuesses,
    bestScore,
    clickMessage
  };

  setClicked = id => {

    // Make a copy of the state cards array to work with
    const cards = this.state.cards;

    // Filter for the clicked match
    const clickedCard = cards.filter(card => cards.id === id);

    // If the matched pic's clicked value is already true, 
    // do the game over actions
    if (clickedCard[0].clicked) {

      console.log("Correct Guesses: " + correctGuesses);
      console.log("Best Score: " + bestScore);

      correctGuesses = 0;
      clickMessage = "Incorrect!"

      for (let i = 0; i < cards.length; i++) {
        cards[i].clicked = false;
      }

      this.setState({ clickMessage });
      this.setState({ correctGuesses });
      this.setState({ cards });
      // Otherwise, if clicked = false, and the user hasn't finished
    } else if (correctGuesses < 10) {
      // Set its value to true
      clickedCard[0].clicked = true;
      // increment the appropriate counter
      correctGuesses++;

      clickMessage = "Good Job!";

      if (correctGuesses > bestScore) {
        bestScore = correctGuesses;
        this.setState({ bestScore });
      }

      // Shuffle the array to be rendered in a random order
      cards.sort(function (a, b) { return 0.5 - Math.random() });

      // Set this.state.cards equal to the new cards array
      this.setState({ cards });
      this.setState({ correctGuesses });
      this.setState({ clickMessage });
    } else {

      // Set its value to true
      clickedCard[0].clicked = true;

      // restart the guess counter
      correctGuesses = 0;

      // encourage game play
      clickMessage = "Good Work! Play Again!" ;
      bestScore = 12;
      this.setState({ bestScore });

      for (let i = 0; i < cards.length; i++) {
        cards[i].clicked = false;
      }

      // Shuffle the array to be rendered in a random order
      cards.sort(function (a, b) { return 0.5 - Math.random() });

      // Set this.state.matches equal to the new matches array
      this.setState({ cards });
      this.setState({ correctGuesses });
      this.setState({ clickMessage });

    }
  };

  render() {
    return (
      <Wrapper>
  

        <h3 className="scoreSummary">
          {this.state.clickMessage}
        </h3>

        <h3 className="scoreSummary">
          Correct Guesses: {this.state.correctGuesses}
          <br />
          Best Score: {this.state.bestScore}
        </h3>

        {this.state.cards.map(match => (
          <Card
            setClicked={this.setClicked}
            id={match.id}
            key={match.id}
            image={match.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;