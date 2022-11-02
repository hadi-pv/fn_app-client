import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/index.module.css'
import Signup from '../components/signup'
import Instruction from '../components/instruction'

export default function Home() {
  return (
    <div >
          <div className='w-full bg-[#00a884] -z-1 h-[50vh] text-white text-4xl'>  </div>

      <div className='absolute top-12 left-[50vw] translate-x-[-50%] flex-col z-2 w-[75vw] h-[75vh] bg-white shadow-2xl p-2 rounded-lg'>
        <Instruction/>
        <Signup/>
      </div>
      </div>
  )
}
