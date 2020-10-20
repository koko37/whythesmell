import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import firebase from 'firebase/app'
import 'firebase/firestore'
import SmellRate from '../components/SmellRate'

import imgLeftArrow from '../assets/imgs/gt.png'
import imgGood from '../assets/imgs/good.png'
import imgBad from '../assets/imgs/bad.png'
import imgCheck from '../assets/imgs/check_sign.png'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [connError, setConError] = useState(false)

  const rateItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const onClickRate = (rate) => {
    // show spinner
    setUploading(true)

    let value = rate === 'pee' || rate === 'poo' ? 10 : rate
    let flag = rate === 'pee' || rate === 'poo' ? rate : 'smell'
    let db = firebase.firestore()
    db.collection(process.env.REACT_APP_COLLECTION_NAME).add({
      value,
      flag,
      createdAt: Date.now()
    })
    .then(function(docRef) {
      // console.log("written with ID: ", rate, docRef.id)
      setUploading(false)
      setShowModal(true);
    })
    .catch(function(err) {
      // console.log("error while adding: ", err)
      setUploading(false)
      setConError(true)
    })
  }
  
  return (
    <div className="dashboard">
      <header className="d-flex flex-row justify-content-end">
        <Link to="/graph" className="nav-result d-flex align-items-center">View current results &nbsp;<img src={imgLeftArrow} alt="arrow" /></Link>
      </header>

      <div className="title w-100 d-flex justify-content-center align-items-center">
        <h1 className="text-white">
          WhyTheSmell
        </h1>
        {
          uploading && (
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
