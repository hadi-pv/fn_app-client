import Head from 'next/head'
import Image from 'next/image'
import { Col,Row } from 'react-bootstrap'
import styles from '../styles/index.module.css'

import Signup from '../components/signup'
import Instruction from '../components/instruction'


export default function Home() {
  return (
    <div style={{'backgroundColor':'lightgrey'}}>
      <div className={styles.outerdiv}>
        <Row>
          <Col>
            <Instruction/>
          </Col>
          <Col>
            <Signup/>
          </Col>
        </Row>
      </div>
    </div>
  )
}
