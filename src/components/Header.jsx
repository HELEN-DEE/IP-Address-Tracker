// import React from 'react'

import headerImg from "../assets/pattern-bg-desktop.png"
import arrowIcon from "../assets/icon-arrow.svg"

const Header = () => {
  return (
    <section className=" bg-no-repeat min-h-[35vh] bg-cover" 
    style= {{
      backgroundImage: `url(${headerImg})`
      }}>
      <div className="">
        <h1 className="text-3xl text-white">
          IP address Tracker
        </h1>
        {/* Search input */}
        <div>
          <input type="text" className="w-[40%] px-5 py-2 rounded-lg"/>
          
        </div>
      </div>
    </section>
  )
}

export default Header
