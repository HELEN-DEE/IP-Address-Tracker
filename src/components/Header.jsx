import { useState } from 'react'
import headerImg from "../assets/pattern-bg-desktop.png"
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Header = ({ fetchLocation }) => {
  const [inputIpAddress, setInputIpAddress] = useState("")

  const handleClick = () => {
    if (inputIpAddress) {
      fetchLocation(inputIpAddress);
    }
  };

  const handleInputChange = (e) => {
    setInputIpAddress(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputIpAddress) {
      fetchLocation(inputIpAddress);
    }
  };

  return (
    <section 
      className="bg-no-repeat min-h-[40vh] md:min-h-[35vh] lg:min-h-[39vh] bg-cover flex justify-center md:items-center" 
      style={{ backgroundImage: `url(${headerImg})` }}
    >
      <div className="flex flex-col items-center md:justify-center w-full max-w-md px-4 pt-10 md:pt-0">
        <h1 className="text-3xl text-white text-center capitalize mb-5 font-bold">
          IP Address Tracker
        </h1> 
        <div className="flex w-full">
          <input 
            type="text" 
            className="px-5 py-5 md:py-4 rounded-l-2xl flex-grow outline-none"
            placeholder="Search for any IP address or domain"
            value={inputIpAddress}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <button 
            className="bg-black hover:bg-gray-800 transition-colors md:p-2 p-4 rounded-r-2xl"
            aria-label="Search"
            onClick={handleClick}
          >
            <MdOutlineKeyboardArrowRight size={24} className="text-white" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Header
