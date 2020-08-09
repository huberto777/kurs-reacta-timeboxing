import React from 'react';
import { connect } from 'react-redux';
import Clock from './Clock';
import ProgressBar from './ProgressBar';
import { getMinutesAndSecondsFromDurationInSeconds } from '../lib/time';
import { getCurrentTimebox } from '../reducers';
import { finishCurrentTimebox, stopCurrentTimebox } from '../actions';

class CurrentTimebox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      isPaused: false,
      isFinished: false,
      pausesCount: 0,
      elapsedTimeInSeconds: 0,
    };
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.intervalId = null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isFinished && this.state.isFinished) {
      this.props.onFinish();
    }
  }
  componentWillUnmount() {
    this.stopTimer();
  }
  handleStart() {
    this.setState({
      isRunning: true,
    });
    this.startTimer();
  }
  handleStop() {
    this.setState({
      isRunning: false,
      isPaused: false,
      pausesCount: 0,
      elapsedTimeInSeconds: 0,
    });
    this.stopTimer();
  }
  startTimer() {
    if (this.intervalId === null) {
      this.intervalId = window.setInterval(() => {
        this.setState((prevState) => {
          const { totalTimeInMinutes } = this.props;
          const totalTimeInSeconds = totalTimeInMinutes * 60;
          const elapsedTimeInSeconds = Math.min(
            prevState.elapsedTimeInSeconds + 0.1,
            totalTimeInSeconds,
          );
          const isFinished = prevState.isFinished || elapsedTimeInSeconds >= totalTimeInSeconds;
          if (isFinished) {
            this.stopTimer();
          }
          const isRunning = prevState.isRunning && !isFinished;
          const isPaused = prevState.isPaused && !isFinished;
          return { elapsedTimeInSeconds, isFinished, isRunning, isPaused };
        });
      }, 100);
    }
  }
  stopTimer() {
    window.clearInterval(this.intervalId);
    this.intervalId = null;
  }
  togglePause() {
    this.setState((prevState) => {
      const isPaused = !prevState.isPaused;
      if (isPaused) {
        this.stopTimer();
      } else {
        this.startTimer();
      }
      return {
        isPaused,
        pausesCount: isPaused ? prevState.pausesCount + 1 : prevState.pausesCount,
      };
    });
  }

  render() {
    const { isFinished, isPaused, isRunning, pausesCount, elapsedTimeInSeconds } = this.state;
    const { title, totalTimeInMinutes, onCancel } = this.props;
    const totalTimeInSeconds = totalTimeInMinutes * 60;
    const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
    const [minutesLeft, secondsLeft] = getMinutesAndSecondsFromDurationInSeconds(timeLeftInSeconds);
    const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;
    return (
      <div className="CurrentTimebox">
        <h1>{title}</h1>
        <Clock minutes={minutesLeft} seconds={secondsLeft} className={isPaused ? 'inactive' : ''} />
        <ProgressBar
          percent={progressInPercent}
          className={isPaused ? 'inactive' : ''}
          color="red"
          big
        />
        <button
          className={isRunning || isFinished ? 'inactive' : 'startButton'}
          onClick={this.handleStart}
          disabled={isRunning || isFinished}>
          <i className="fas fa-play" />
        </button>
        <button
          className={!isRunning ? 'inactive' : 'stopButton'}
          onClick={this.handleStop}
          disabled={!isRunning}>
          <i className="fas fa-stop" />
        </button>
        <button
          className={!isRunning ? 'inactive' : 'pauseButton'}
          onClick={this.togglePause}
          disabled={!isRunning}>
          {isPaused ? <i className="fas fa-redo-alt" /> : <i className="fas fa-pause" />}
        </button>
        Liczba przerw: {pausesCount}
        <button className="resetButton" onClick={onCancel}>
          <i className="fas fa-window-close" />
        </button>
      </div>
    );
  }
}

function CurrentTimeboxOrNothing({ currentTimebox, onFinish, onCancel }) {
  if (currentTimebox) {
    const { title, totalTimeInMinutes } = currentTimebox;
    return (
      <CurrentTimebox
        title={title}
        totalTimeInMinutes={totalTimeInMinutes}
        onFinish={onFinish}
        onCancel={onCancel}
      />
    );
  }
  return null;
}

function mapStateToProps(state) {
  const currentTimebox = getCurrentTimebox(state);

  return {
    currentTimebox,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onFinish: () => dispatch(finishCurrentTimebox()),
    onCancel: () => dispatch(stopCurrentTimebox()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentTimeboxOrNothing);
