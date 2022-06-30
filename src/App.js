import React from 'react';
import Control from '@components/Control';
import Display from '@components/Display';
import Button from '@components/Button';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timeLeft: [25, 0],
      isCounting: false,
      isSession: true,
      idInterval: 0,
      idBeep: 0
    };
    this.reset = this.reset.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.playPause = this.playPause.bind(this);
    this.startCounting = this.startCounting.bind(this);
    this.clearCounting = this.clearCounting.bind(this);
    this.clearBeep = this.clearBeep.bind(this);
  }
  reset() {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timeLeft: [25, 0],
      isCounting: false,
      isSession: true,
      idInterval: 0,
      idBeep: 0
    });
    this.clearCounting();
    this.clearBeep();
  }
  decrementBreak() {
    if (!this.state.isCounting && this.state.breakLength > 1) {
      this.setState({ breakLength: this.state.breakLength - 1 });
    }
  }
  incrementBreak() {
    if (!this.state.isCounting && this.state.breakLength < 60) {
      this.setState({ breakLength: this.state.breakLength + 1 });
    }
  }
  decrementSession() {
    if (!this.state.isCounting && this.state.sessionLength > 1) {
      this.setState({ sessionLength: this.state.sessionLength - 1 });
    }
  }
  incrementSession() {
    if (!this.state.isCounting && this.state.sessionLength < 60) {
      this.setState({ sessionLength: this.state.sessionLength + 1 });
    }
  }
  playPause() {
    if (!this.state.isCounting) {
      this.setState({ isCounting: true });
      this.startCounting();
    } else {
      this.setState({ isCounting: false });
      this.clearCounting();
    }
  }
  startCounting() {
    const idInterval = setInterval(() => {
      this.setState(state => {
        let mm = state.timeLeft[0];
        let ss = state.timeLeft[1];
        if (mm > 0 && ss == 0) return { timeLeft: [mm - 1, 59] };
        if (mm == 0 && ss == 0) {
          this.beep();
          if (state.isSession) return { isSession: false, timeLeft: [state.breakLength, 0] };
          return {
            isSession: true,
            timeLeft: [state.sessionLength, 0]
          };
        }
        return {
          timeLeft: [mm, ss - 1]
        };
      });
    }, 1000);
    this.setState({ idInterval });
  }
  clearCounting() {
    clearInterval(this.state.idInterval);
  }
  componentDidUpdate(prevProps, prevState) {
    if (!this.state.isSession && this.state.breakLength != prevState.breakLength) {
      this.setState({ timeLeft: [this.state.breakLength, 0] });
    }
    if (this.state.isSession && this.state.sessionLength != prevState.sessionLength) {
      this.setState({ timeLeft: [this.state.sessionLength, 0] });
    }
  }

  beep() {
    const audio = document.getElementById('beep');
    audio.play();
    const idBeep = setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 2000);
    this.setState({ idBeep });
  }
  clearBeep() {
    const audio = document.getElementById('beep');
    clearTimeout(this.state.idBeep);
    audio.pause();
    audio.currentTime = 0;
  }
  render() {
    return (
      <div className='pomodoro-timer'>
        <h1 className='title'>Pomodoro Timer</h1>
        <Display
          idLabel='timer-label'
          label={this.state.isSession ? 'Session' : 'Break'}
          idValue='time-left'
          value={this.state.timeLeft}
        />
        <div className='section-session'>
          <Button
            id='start_stop'
            onClick={this.playPause}
            icon={this.state.isCounting ? 'pause' : 'play'}
          />
          <Button
            id='reset'
            onClick={this.reset}
            icon='reset'
          />
          <audio id='beep' src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            preload="auto"></audio>
        </div>
        <div className='section-control'>
          <Control
            idLabel='break-label'
            label='Break Length'
            idButtonOne='break-decrement'
            funcOne={this.decrementBreak}
            iconOne='down'
            idButtonTwo='break-increment'
            funcTwo={this.incrementBreak}
            iconTwo='up'
            idValue='break-length'
            value={this.state.breakLength}
          />
          <Control
            idLabel='session-label'
            label='Session Length'
            idButtonOne='session-decrement'
            funcOne={this.decrementSession}
            iconOne='down'
            idButtonTwo='session-increment'
            funcTwo={this.incrementSession}
            iconTwo='up'
            idValue='session-length'
            value={this.state.sessionLength}
          />
        </div>
      </div>
    );
  }
}

export default App;