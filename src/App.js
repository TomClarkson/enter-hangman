import React from 'react';
import Game from './Game';
import * as actionCreators from './actionCreators';
import store from './store';
import initialState from './initialState';
import {wordSoFar, isGameWon, isGameLost} from './stateQueries';
import createDispatcher from './dispatcher';

const {dispatch, subscribe} = createDispatcher(store, initialState);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    dispatch(actionCreators.resetGame());
    this.unsubscribe = subscribe(this.setState.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  logActions() {
    console.log(
      window.copyActions()
    )
  }

  replayActions() {
    var jsonActions = prompt('replace actions', window.copyActions());
    window.replayActions(jsonActions);
  }

  render() {
    return (
      <div>
        <button onClick={() => {window.undo()}}>Undo</button>
        <button onClick={() => {window.redo()}}>Redo</button>
        <button onClick={this.logActions}>Log Actions</button>
        <button onClick={this.replayActions}>Replay Actions</button>
        <pre>
        </pre>
        <Game
          errors={this.state.errors}
          usedLetters={this.state.usedLetters}
          wordSoFar={wordSoFar(this.state.word, this.state.usedLetters)}
          isGameWon={isGameWon(this.state)}
          isGameLost={isGameLost(this.state)}
          onNewLetter={this.handleNewLetter}
          onResetGame={this.handleResetGame} />
      </div>
    );
  }

  handleNewLetter(letter) {
    dispatch(actionCreators.newLetter(letter));
  }

  handleResetGame() {
    dispatch(actionCreators.resetGame());
  }
}
