import {useState, useEffect} from 'react'



const Stats = (
  {ipAddress,
  location,
  timezone,
  isp}
) => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect( () => {
    const handleResize = () => {
      if (window.innerHeight > windowHeight) {
        setWindowHeight(window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowHeight] );

  const statInfo = [
    {Label: "IP Address", Info: ipAddress },
    {Label: "Location", Info: location },
    {Label: "Timezone", Info: timezone },
    {Label: "Isp", Info: isp}
  ]

  return (
    <section className=" w-[90%] md:w-[80%] lg:w-[70%] absolute left-1/2 transform -translate-x-1/2 top-[27%] md:top-0 z-10 bg-white rounded-xl shadow-lg overflow-hidden "
      style={{
        top: `${windowHeight * 0.3}px`,
        maxHeight: `${windowHeight * 0.6}px`
      }}
    >
      <div className=" flex flex-col md:flex-row w-full py-5 lg:py-8">
        {statInfo.map((item, index) => (
          <div key={index} className={` flex flex-col gap-2 justify-center items-center md:items-start w-full ${index !== statInfo.length - 1 ? 'md:border-r border-slate-300 px-5' : "px-5"}`}>
            <p className="uppercase tracking-widest text-[14px] font-bold text-gray-500">
              {item.Label}
            </p>
            <p className="text-2xl font-bold">
              {item.Info || "N/A"}
            </p>
          </div>
        ))}
      </div>
      
    </section>
  )
}

export default Stats
