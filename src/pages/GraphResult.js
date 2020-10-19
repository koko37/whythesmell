import React from 'react'
import { Link } from 'react-router-dom'
import imgRightArrow from '../assets/imgs/lt.png'
const GraphResult = () => {
  return (
    <div className="graph-result">
      <header className="d-flex flex-row justify-content-start align-items-center">
        <Link to="/" className="nav-result d-flex align-items-center"><img src={imgRightArrow} alt="arrow" />&nbsp;Back to entering data</Link>
      </header>
    </div>
  )
}

export default GraphResult
