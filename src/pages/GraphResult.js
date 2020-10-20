import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCurrentDate } from '../actions/dateActions'
import Calendar from 'react-calendar'

import 'react-calendar/dist/Calendar.css'
import imgRightArrow from '../assets/imgs/lt.png'
import imgGood from '../assets/imgs/good.png'
import imgBad from '../assets/imgs/bad.png'
import imgLA from '../assets/imgs/la.png'
import imgRA from '../assets/imgs/ra.png'

const DISPLAY_WEEKLY = 1;
const DISPLAY_DAILY = 2;
const MONTHLY_CALENDAR = 3;
const DAILY_CALENDAR = 4;

const mapStateToProps = (state) => ({
  weekStart: state.date.weekStart,
  weekEnd: state.date.weekEnd,
  currentDate: state.date.currentDate
})

const mapDispatchToProps = (dispatch) => ({
  setDate: (dt) => dispatch(setCurrentDate(dt))
})

const GraphResult = ({currentDate, weekStart, weekEnd, setDate}) => {
  const [displayMode, setDisplayMode] = useState(DISPLAY_WEEKLY)
  const [showCalendar, setShowCalendar] = useState(false)
  const [calendarMode, setCalendarMode] = useState('month')

  const onWeeklyMode = () => {
    setDisplayMode(DISPLAY_WEEKLY)
  }

  const onDailyMode = () => {
    setDisplayMode(DISPLAY_DAILY)
  }

  const onOpenCalendar = (calendarMode) => {
    console.log("calendarMode", calendarMode);
    if(calendarMode === MONTHLY_CALENDAR) {
      setCalendarMode('year')
    } else {
      setCalendarMode('month')
    }

    setShowCalendar(true)
  }

  const onDateChanged = (v, e) => {
    console.log("dateChanged", v)
    setShowCalendar(false)
    setDate(v)
  }

  const onMonthChanged = (v, e) => {
    console.log("monthChanged", v)
    setShowCalendar(false)
    setDate(v)
  }
  /**
   * Navigation Event Handlers
   */
  const onPrevMonth = () => {
    console.log("move to previous month");
    let dateTemp = new Date(currentDate)
    dateTemp.setMonth(dateTemp.getMonth() - 1)
    setDate(dateTemp)
  }

  const onNextMonth = () => {
    console.log("move to next month");
    let dateTemp = new Date(currentDate)
    dateTemp.setMonth(dateTemp.getMonth() + 1)
    setDate(dateTemp)
  }

  const onPrevDayOrWeek = () => {
    if (displayMode === DISPLAY_WEEKLY) {
      console.log("move to previous week");
      let dateTemp = new Date(currentDate)
      dateTemp.setDate(dateTemp.getDate() - 7)
      setDate(dateTemp)
    } else {
      console.log("move to previous day");
      let dateTemp = new Date(currentDate)
      dateTemp.setDate(dateTemp.getDate() - 1)
      setDate(dateTemp)
    }
  }

  const onNextDayOrWeek = () => {
    if (displayMode === DISPLAY_WEEKLY) {
      console.log("move to next week");
      let dateTemp = new Date(currentDate)
      dateTemp.setDate(dateTemp.getDate() + 7)
      setDate(dateTemp)
    } else {
      console.log("move to next day");
      let dateTemp = new Date(currentDate)
      dateTemp.setDate(dateTemp.getDate() + 1)
      setDate(dateTemp)
    }
  }

  /**
   * Get current date
   */
  const selectedDateOrWeek = () => {
    if (displayMode === DISPLAY_DAILY) {
      console.log("get current date: ", currentDate.toLocaleString())
      return `${currentDate.toLocaleString('default', {weekday: 'long'})} ${currentDate.toLocaleString('default', {day: 'numeric'})}`
    } 
    return `Week: ${weekStart.getDate()} - ${weekEnd.getDate()}`
  }

  return (
    <div className="graph-result">
      <header className="d-flex flex-row justify-content-start align-items-center">
        <Link to="/" className="nav-result d-flex align-items-center"><img src={imgRightArrow} alt="arrow" />&nbsp;Back to entering data</Link>
      </header>

      <div className="title w-100 text-center">
        <h1 className="text-white"><span className="hint">WhyTheSmell</span> Results</h1>
      </div>

      <div className="graph-wrapper d-flex align-items-stretch justify-content-center">
        <div className="x-axis-wrapper d-flex">
          <div className="x-axis-label d-flex justify-content-center align-items-center flex-grow-1">Smell<br/>Rating</div>
          <div className="x-axis-img d-flex flex-column justify-content-between">
            <img src={imgBad} alt="bad"/>
            <img src={imgGood} alt="good" />
          </div>
        </div>
        
        <div className="graph">
          lorem ipsum
        </div>

        <div className="graph-legend-wrapper d-flex flex-column justify-content-around align-items-start">
          <div className="graph-legend graph-legend__smell">Smell</div>
          <div className="graph-legend graph-legend__pee">Pee</div>
          <div className="graph-legend graph-legend__poo">Poo</div>
        </div>
      </div>

      <div className="query-wrapper d-flex align-items-stretch">
        <div className="selector month-selector flex-grow-1 border-right d-flex justify-content-center align-items-center">
          <button className="navigate" onClick={onPrevMonth}><img src={imgLA} alt="prev-month" /></button>
          <button className="navigate" onClick={() => onOpenCalendar(MONTHLY_CALENDAR)}>
            {currentDate.toLocaleString('default', { month: 'long'})}&nbsp;
            {currentDate.getFullYear()}
          </button>
          <button className="navigate" onClick={onNextMonth}><img src={imgRA} alt="next-month" /></button>
        </div>
        <div className="selector week-day-selector flex-grow-1 d-flex justify-content-center align-items-center">
          <button className="navigate" onClick={onPrevDayOrWeek}><img src={imgLA} alt="prev-year" /></button>
          <button className="navigate" onClick={() => onOpenCalendar(DAILY_CALENDAR)}>
            { selectedDateOrWeek() }
          </button>
          <button className="navigate" onClick={onNextDayOrWeek}><img src={imgRA} alt="next-year" /></button>
        </div>
        <div className="selector mode-selector flex-grow-1 border-left d-flex justify-content-center">
          <button className={`weekly-mode ${displayMode === DISPLAY_WEEKLY && 'active'}`} onClick={onWeeklyMode}>7 days</button>
          <button className={`daily-mode ${displayMode === DISPLAY_DAILY && 'active'}`} onClick={onDailyMode}>24 hours</button>
        </div>
      </div>

      <div className={`modal ${!showCalendar && 'd-none'}`}>
        <div className="modal__content d-flex flex-column align-items-center justify-content-center">
          <Calendar
            className="calendar"
            onChange={onDateChanged}
            onClickMonth={onMonthChanged}
            value={currentDate}
            view={calendarMode}
          />
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphResult)
