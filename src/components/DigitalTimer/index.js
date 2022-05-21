import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {timeLimit: 25, isRunning: false, timeElapsedInSeconds: 0}

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecrement = () => {
    const {timeLimit} = this.state
    if (timeLimit > 1) {
      this.setState(prevState => ({timeLimit: prevState.timeLimit - 1}))
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({timeLimit: prevState.timeLimit + 1}))
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeLimit, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeLimit * 60 === timeElapsedInSeconds
    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  toggleStopPause = () => {
    const {isRunning, timeLimit, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeLimit * 60 === timeElapsedInSeconds

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isRunning: !prevState.isRunning}))
  }

  onReset = () => {
    this.clearTimerInterval()
    this.setState({timeLimit: 25, isRunning: false, timeElapsedInSeconds: 0})
  }

  getTimer = () => {
    const {timeLimit, timeElapsedInSeconds} = this.state
    const totalTime = timeLimit * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalTime / 60)
    const seconds = Math.floor(totalTime % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {timeLimit, isRunning, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds > 0
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
              <h1 className="timer">{this.getTimer()}</h1>
              <p className="paused">{timerStatus}</p>
            </div>
          </div>
          <div className="details-container">
            <div className="start-stop-container">
              <button
                type="button"
                className="btn stop-pause-container"
                onClick={this.toggleStopPause}
              >
                <img src={imgUrl} alt={altText} className="stop-pause-img" />
                <p className="start">{isRunning ? 'Pause' : 'Start'}</p>
              </button>

              <button
                type="button"
                className="btn stop-pause-container"
                onClick={this.onReset}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="stop-pause-img"
                />
                <p className="start">Reset</p>
              </button>
            </div>
            <p className="set-timer-limit">Set Timer limit</p>
            <div className="set-timer-container">
              <button
                type="button"
                className="plus-minus-btn"
                onClick={this.onDecrement}
                disabled={isTimerCompleted}
              >
                -
              </button>
              <p className="timer-limit">{timeLimit}</p>
              <button
                type="button"
                className="plus-minus-btn"
                onClick={this.onIncrement}
                disabled={isTimerCompleted}
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
