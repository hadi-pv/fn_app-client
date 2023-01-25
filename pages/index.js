import LoginPassword from "../components2/loginpassword"

export default function Home() {
  return (
    <div >
          <div className='w-full bg-[#00a884] -z-1 h-[180px]'>
            <img src='/iitmlogo.png' className='w-[140px] h-[140px] absolute top-[20px] left-[90px] translate-x-[-50%]'></img>
          </div>
      <div className='absolute top-12 left-[50vw] translate-x-[-50%] flex-col z-2 w-[896px] bg-white shadow-2xl p-2 rounded-lg'>
        <LoginPassword/>
      </div>
      </div>
  )
}
