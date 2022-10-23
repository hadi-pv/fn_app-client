import Head from 'next/head'
import Image from 'next/image'
import { Col,Row } from 'react-bootstrap'
import styles from '../styles/index.module.css'
import Signup from '../components/signup'
import Instruction from '../components/instruction'

export default function Home() {
  return (
    <div >
      
      <div className='absolute top-12 left-[50vw] translate-x-[-50%] flex-col z-2 w-[896px] bg-white shadow-2xl p-2 rounded-lg'>
        <Instruction/>
        <Signup/>
      </div>
      </div>
  )
}
