import LoginPassword from "../components2/loginpassword"

export default function Home() {
  return (
      <div >
        <div className='w-full bg-[#00a884] -z-1 h-[8vh] md:h-[24vh]'>
          <img src='/iitmlogo.png' alt='IITM LOGO' className='w-[6vh] h-[6vh] md:w-[18vh] md:h-[18vh] absolute top-[1vh] left-[1vh] md:top-[3vh] md:left-[3vh]' />
          <img src='/logo192.png' alt='IITM LOGO' className='bg-white rounded w-[6vh] h-[6vh] md:w-[18vh] md:h-[18vh] absolute top-[1vh] right-[1vh] md:top-[3vh] md:right-[3vh]'/>
        </div>
        <div className='absolute top-[8vh] left-[50vw] md:top-[5vh] translate-x-[-50%] flex-col z-2 w-[100vw] md:w-[70vw] bg-white shadow-2xl p-2 rounded-lg'>
          <LoginPassword/>
        </div>
      </div>
  )
}
