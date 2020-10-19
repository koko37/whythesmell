import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SmellRate from '../components/SmellRate'
import imgLeftArrow from '../assets/imgs/gt.png'
import imgGood from '../assets/imgs/good.png'
import imgBad from '../assets/imgs/bad.png'
import imgCheck from '../assets/imgs/check_sign.png'

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false)
  const rateItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const onClickRate = (rate) => {
    console.log("rate: ", rate);
    setShowModal(true);
  }
  
  return (
    <div className="dashboard">
      <header className="d-flex flex-row justify-content-end">
        <Link to="/graph" className="nav-result d-flex align-items-center">View current results &nbsp;<img src={imgLeftArrow} alt="arrow" /></Link>
      </header>

      <div className="title w-100 text-center">
        <h1 className="text-white">WhyTheSmell</h1>
      </div>
      <div className="buttons-wrapper d-flex justify-content-between">
        <button className="dashboard__button pee" onClick={() => onClickRate('pee')}>+ Pee</button>
        <button className="dashboard__button poo" onClick={() => onClickRate('poo')}>+ Poo</button>
      </div>
      
      <h6 className="smell-rate-title">Rate the current smell <span className="hint">(from good to bad)</span></h6>

      <div className="d-flex">
        <div className="flex-grow-1 d-flex align-items-center justify-content-end pr-4">
          <img src={imgGood} alt="good" />
        </div>
        <div className="smell-wrapper d-flex justify-content-between">  
          {
            rateItems.map((rate) => (
              <SmellRate rate={rate} callback={onClickRate} key={rate} />
            ))
          }
        </div>
        <div className="flex-grow-1 d-flex align-items-center justify-content-start pl-4">
          <img src={imgBad} alt="bad"/>
        </div>
      </div>

      <div className={`modal ${!showModal && 'd-none'}`} onClick={() => setShowModal(false)}>
        <div className="modal__content d-flex flex-column align-items-center justify-content-center">
          <div><img src={imgCheck} alt="check" /></div>
          <h1 className="text-white modal__title">Thank you.</h1>
          <h3 className="text-white modal__comment">That data has<br/>been recorded.</h3>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
