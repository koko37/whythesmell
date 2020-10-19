import React from 'react'

const SmellRate = ({rate, callback}) => {
  return (
    <button onClick={() => callback(rate)} className="smell-rate">
      {rate}
    </button>
  )
}

export default SmellRate;
