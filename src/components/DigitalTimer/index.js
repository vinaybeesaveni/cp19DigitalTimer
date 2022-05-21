import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {timeLimit: 25, isRunning: false}

  onDecrement = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      const {timeLimit} = this.state
      if (timeLimit > 25) {
        this.setState(prevState => ({timeLimit: prevState.timeLimit - 1}))
      }
    }
  }

  onIncrement = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState(prevState => ({timeLimit: prevState.timeLimit + 1}))
    }
  }

  toggleStopPause = () => {
    this.setState(prevState => ({isRunning: !prevState.isRunning}))
  }

  onReset = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState({timeLimit: 25})
    }
  }

  render() {
    const {timeLimit, isRunning} = this.state
    const timer = timeLimit
    const imgUrl = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altText = isRunning ? 'pause icon' : 'play icon'
    const timerStatus = isRunning ? 'Running' : 'Paused'
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="whole-container">
          <div className="timer-img-container">
            <div className="timer-container">
              <h1 className="timer">{timer}:00</h1>
              <p className="paused">{timerStatus}</p>
            </div>
          </div>
          <div className="details-container">
            <div className="start-stop-container">
              <div className="stop-pause-container">
                <button
                  type="button"
                  className="btn"
                  onClick={this.toggleStopPause}
                >
                  <img src={imgUrl} alt={altText} className="stop-pause-img" />
                </button>
                <p className="start">{isRunning ? 'Pause' : 'Start'}</p>
              </div>
              <div className="stop-pause-container">
                <button type="button" className="btn">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="stop-pause-img"
                    onClick={this.onReset}
                  />
                </button>
                <p className="start">Reset</p>
              </div>
            </div>
            <p className="set-timer-limit">Set Timer limit</p>
            <div className="set-timer-container">
              <button
                type="button"
                className="plus-minus-btn"
                onClick={this.onDecrement}
              >
                -
              </button>
              <p className="timer-limit">{timeLimit}</p>
              <button
                type="button"
                className="plus-minus-btn"
                onClick={this.onIncrement}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
