export default function Home() {
  return (
      <div >
        <div className='w-full bg-[#00a884] -z-1 h-[8vh] md:h-[24vh]'>
          <img src='/iitmlogo.png' className='w-[6vh] h-[6vh] md:w-[18vh] md:h-[18vh] absolute top-[1vh] left-[1vh] md:top-[3vh] md:left-[3vh]' />
        </div>
        <div className='absolute top-[8vh] left-[50vw] md:top-[5vh] translate-x-[-50%] flex-col z-2 w-[100vw] h-[90vh] md:w-[50vw] bg-white shadow-2xl p-2 rounded-lg'>
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeSWbch5ZyuWqTTdy24MTm0Tl8Q9sY1YNS3Fhxo1MPMl0oV9g/viewform?embedded=true" width="100%" height="100%">Loading…</iframe>
        </div>
      </div>
  )
}