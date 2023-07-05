import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import bgDesktop from '../assets/images/pattern-bg-desktop.png'
import iconArrow from '../assets/images/icon-arrow.svg'
import Map from '../components/Map'

const Home = () => {

  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState("")
  const [apiData, setApiData] = useState({
    ip: '',
    region: '',
    country: '',
    timezone: '',
    isp: '',
  })

  const ipFetch = (ipAddress) => {
    setLoading(true);
    fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_DGZf9JrGuBsxJwnyGnrOcy6mM1acb&ipAddress=${ipAddress}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const location = data.location || {}; // Ensure location object exists
        setApiData({
          ip: data.ip || "",
          region: data.location.region || "",
          country: data.location.country || "",
          timezone: data.location.timezone || "",
          isp: data.isp || "",
        });
        setLoading(false);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  };

  useEffect(() => {
    console.log("ip:", apiData.ip, "|| region:", apiData.region, "|| country:", apiData.country, "|| timezone:", apiData.timezone, "|| isp:", apiData.isp);
  }, [apiData])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input !== "") {
      ipFetch(input)
    }
  }


  return (
    <section className='relative w-screen h-screen flex flex-col items-center bg-[#d6e0ed]'>
      {loading && <Loading />}

      <div className='w-screen h-fit flex justify-center items-center overflow-hidden'>
        <img className='min-w-min w-full min-h-min' src={bgDesktop} alt="desktop Backgground Image" />
      </div>

      <Map />

      <div className='absolute z-10 top-8 w-fit h-fit px-5 flex gap-6 flex-col items-center font-Rubik'>
        <h1 className='text-white font-semibold text-3xl tracking-wider'>IP Address Tracker</h1>

        <form onSubmit={handleSubmit} className='w-[600px] h-16 rounded-2xl overflow-hidden flex'>
          <input className='w-full outline-none px-5 text-xl' onChange={(e) => setInput(e.target.value)} value={input} placeholder='Search for any IP address or domain' type="search" name="search" id="search" />
          <button type='submit' className='duration-300 bg-black hover:bg-[#414141] text-white w-16 h-full flex justify-center items-center'>
            <img src={iconArrow} alt="icon arrow" />
          </button>
        </form>

        <div className='w-[1200px] min-h-[140px] mt-6 p-6 shadow-2xl bg-white rounded-xl flex gap-5 justify-between divide-x-2'>
          <div className='w-full min-h-full flex flex-col gap-2'>
            <h3 className='uppercase text-gray-400 text-sm font-medium tracking-wider'>ip address</h3>
            <p className='text-3xl font-medium'>{apiData.ip}</p>
          </div>
          <div className='w-full min-h-full flex flex-col pl-5 gap-2'>
            <h3 className='uppercase text-gray-400 text-sm font-medium tracking-wider'>location</h3>
            <p className='text-3xl font-medium'>{apiData.region + (apiData.country && ", ") + apiData.country}</p>
          </div>
          <div className='w-full min-h-full flex flex-col pl-5 gap-2'>
            <h3 className='uppercase text-gray-400 text-sm font-medium tracking-wider'>timezone</h3>
            <p className='text-3xl font-medium'>{apiData.timezone}</p>
          </div>
          <div className='w-full min-h-full flex flex-col pl-5 gap-2'>
            <h3 className='uppercase text-gray-400 text-sm font-medium tracking-wider'>isp</h3>
            <p className='text-3xl font-medium'>{apiData.isp}</p>
          </div>
        </div>

      </div>

    </section>
  )
}

export default Home