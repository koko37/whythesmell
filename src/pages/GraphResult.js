import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Calendar from 'react-calendar'
import SmellGraph from '../components/SmellGraph'

import { setCurrentDate } from '../actions/dateActions'
import { queryDataByTimestamp, deleteDataByTimestamp } from '../utils/firebase'
import { DISPLAY_WEEKLY, DISPLAY_DAILY, MONTHLY_CALENDAR, DAILY_CALENDAR } from '../utils/constants'

import 'react-calendar/dist/Calendar.css'
import imgRightArrow from '../assets/imgs/lt.png'
import imgGood from '../assets/imgs/good.png'
import imgBad from '../assets/imgs/bad.png'
import imgLA from '../assets/imgs/la.png'
import imgRA from '../assets/imgs/ra.png'

const mapStateToProps = (state) => ({
  weekStart: state.date.weekStart,
  weekEnd: state.date.weekEnd,
  currentDate: state.date.currentDate,
  dateStart: state.date.dateStart,
  dateEnd: state.date.dateEnd,
})

const mapDispatchToProps = (dispatch) => ({
  setDate: (dt) => dispatch(setCurrentDate(dt))
})

const GraphResult = ({currentDate, weekStart, weekEnd, dateStart, dateEnd, setDate}) => {
  const [displayMode, setDisplayMode] = useState(DISPLAY_DAILY)
  const [showCalendar, setShowCalendar] = useState(false)
  const [calendarMode, setCalendarMode] = useState('month')
  const [loading, setLoading] = useState(false)
  const [connError, setConError] = useState(false)
  const [showDeleteButton, setShowDeleteButton] = useState(false)
  const [selectedTs, setSelectedTs] = useState(null)

  const [peeData, setPeeData] = useState([])
  const [pooData, setPooData] = useState([])
  const [smellData, setSmellData] = useState([])

  const onGraphItemSelected = (visibleDelete, selectedTime=null) => {
    setShowDeleteButton(visibleDelete)
    if (selectedTime) {
      const selectedTemp = new Date(selectedTime)
      if (displayMode === DISPLAY_DAILY) {
        selectedTemp.setMinutes(selectedTemp.getMinutes()-60)
      } else {
        selectedTemp.setMinutes(selectedTemp.getMinutes()-120)
      }
      setSelectedTs(selectedTemp)
    }
  }

  const refreshGraphData = () => {
    setLoading(true)

    let beginDate = displayMode === DISPLAY_WEEKLY ? weekStart : dateStart
    let endDate = displayMode === DISPLAY_WEEKLY ? weekEnd : dateEnd
    queryDataByTimestamp(
      process.env.REACT_APP_COLLECTION_NAME,
      beginDate.valueOf(),
      endDate.valueOf(),
      (results) => {
        setLoading(false)
        if (results === null) {
          setConError(true)
          return
        }
        results.forEach(result => {
          console.log(result.createdAt, "  ", result.flag, result.value);
        })
        setPeeData(results.filter((item) => item.flag === 'pee'))
        setPooData(results.filter((item) => item.flag === 'poo'))
        setSmellData(results.filter((item) => item.flag === 'smell'))
      })
  }

  const onClickDeleteButton = () => {
    if(!window.confirm('Are you sure to delete the data?')) return

    const endTs = new Date(selectedTs)
    if (displayMode === DISPLAY_DAILY) {
      endTs.setHours(endTs.getHours()+2)
    } else {
      endTs.setHours(endTs.getHours()+4)
    }

    console.log(selectedTs.valueOf(), "~", endTs.valueOf())
    deleteDataByTimestamp(process.env.REACT_APP_COLLECTION_NAME,
      selectedTs.valueOf(),
      endTs.valueOf(),
      () => {
        setShowDeleteButton(false)
        // re-load data
        refreshGraphData()
      })
  }

  useEffect(() => {
    refreshGraphData()
  }, [currentDate, dateStart, dateEnd, weekStart, weekEnd, displayMode])

  /**
   * Display mode
   */
  const onWeeklyMode = () => {
    setDisplayMode(DISPLAY_WEEKLY)
  }

  const onDailyMode = () => {
    setDisplayMode(DISPLAY_DAILY)
  }

  /**
   * Calendar related methods
   */
  const onOpenCalendar = (calendarMode) => {
    if(calendarMode === MONTHLY_CALENDAR) {
      setCalendarMode('year')
    } else {
      setCalendarMode('month')
    }
    setShowCalendar(true)
  }

  const onDateChanged = (v, e) => {
    setShowCalendar(false)
    setDate(v)
  }

  const onMonthChanged = (v, e) => {
    setShowCalendar(false)
    setDate(v)
  }
  /**
   * Navigation Event Handlers
   */
  const onPrevMonth = () => {
    let dateTemp = new Date(currentDate)
    dateTemp.setMonth(dateTemp.getMonth() - 1)
    setDate(dateTemp)
  }

  const onNextMonth = () => {
    let dateTemp = new Date(currentDate)
    dateTemp.setMonth(dateTemp.getMonth() + 1)
    setDate(dateTemp)
  }

  const onPrevDayOrWeek = () => {
    if (displayMode === DISPLAY_WEEKLY) {
      let dateTemp = new Date(currentDate)
      dateTemp.setDate(dateTemp.getDate() - 7)
      setDate(dateTemp)
    } else {
      let dateTemp = new Date(currentDate)
      dateTemp.setDate(dateTemp.getDate() - 1)
      setDate(dateTemp)
    }
  }

  const onNextDayOrWeek = () => {
    if (displayMode === DISPLAY_WEEKLY) {
      let dateTemp = new Date(currentDate)
      dateTemp.setDate(dateTemp.getDate() + 7)
      setDate(dateTemp)
    } else {
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
      return `${currentDate.toLocaleString('default', {weekday: 'long'})} ${currentDate.toLocaleString('default', {day: 'numeric'})}`
    } 
    return `Week: ${weekStart.getDate()} - ${weekEnd.getDate()}`
  }
  
  return (
    <div className="graph-result">
      <header className="d-flex flex-row justify-content-start align-items-center">
        <Link to="/" className="nav-result d-flex align-items-center"><img src={imgRightArrow} alt="arrow" />&nbsp;Back to entering data</Link>
      </header>

      <div className="title w-100 d-flex justify-content-center align-items-center">
        <h1 className="text-white"><span className="hint">WhyTheSmell</span> Results</h1>
        {
          loading && (
          <Loader
            type="Oval"
            color="#FFF"
            height={32}
            width={32}
            className="spinner"
          />
          )
        }
        {
          connError && (
            <h3 className="error">
              Error
            </h3>
          )
        }
      </div>

      <div className="graph-wrapper d-flex align-items-stretch justify-content-center">
        <div className="y-axis-wrapper d-flex">
          <div className="y-axis-label d-flex justify-content-center align-items-center flex-grow-1">Smell<br/>Rating</div>
          <div className="y-axis-img d-flex flex-column justify-content-between">
            <img src={imgBad} alt="bad"/>
            <img src={imgGood} alt="good" className="y-axis-img--good" />
          </div>
        </div>
        
        <div className="graph">
          <SmellGraph
            peeData={peeData}
            pooData={pooData}
            smellData={smellData}
            startDate={displayMode === DISPLAY_WEEKLY ? weekStart : dateStart}
            endDate={displayMode === DISPLAY_WEEKLY ? weekEnd : dateEnd}
            graphMode={displayMode}
            onSelectedItem={onGraphItemSelected}
          />
        </div>

        <div className="graph-legend-wrapper d-flex flex-column justify-content-around align-items-start">
          <button className={`btn btn-danger ${!showDeleteButton && 'd-none'}`} onClick={onClickDeleteButton}>Delete</button>
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
