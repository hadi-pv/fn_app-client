import LoginPassword from "../components2/loginpassword"

export default function Home() {
  return (
    <div >
          <div className='w-full bg-[#00a884] -z-1 h-[180px] text-white text-4xl'> FN-APP </div>

      <div className='absolute top-12 left-[50vw] translate-x-[-50%] flex-col z-2 w-[896px] bg-white shadow-2xl p-2 rounded-lg'>
        <LoginPassword/>
      </div>
      </div>
  )
}

