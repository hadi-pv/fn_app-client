import { useEffect, useState } from 'react';
import { Button,Modal,Row,Col,Container } from 'react-bootstrap';
import Router from 'next/router'
import axios from 'axios';
import Image from 'react-bootstrap';
import { NEWS_OPENED, NEWS_CLOSED, NEWS_SENT } from '../constants/taskTypes';


export default function Modaldiv(props) {

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('user')))
  },[user])

  const [user,setUser]=useState('')

  const [person,setPerson]=useState('')
  const [fake,setFake]=useState(true)

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => {
    setShow1(false)

    axios.post('/api/addlog',{
      user_id:user.id,
      news_id:props.news.news_id,
      task:NEWS_CLOSED,
      startTime: localStorage.getItem('start_time'),
      currTime: Date.now()
    })
  }

  const handleShow1 = () => {
    setShow1(true)
    localStorage.setItem('start_time', Date.now())

    axios.post('/api/addlog',{
      user_id:user.id,
      news_id:props.news.news_id,
      task:NEWS_OPENED,
      startTime: localStorage.getItem('start_time'),
      currTime: localStorage.getItem('start_time')
    })
  }

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const Model1=()=>{
    console.log(props.news)
    return(
        <Modal
          show={show1}
          onHide={handleClose1}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{props.news.headline}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={6}>
                <h1><img alt='image of an breaking news' src={props.news.image_link} height='100%' width='100%'/></h1>
              </Col>
              <Col xs={6}>
                <Row>
                  <Button variant='secondary'>{props.news.author}</Button>
                </Row>
                <br/>
                <Row>
                  <Button variant='secondary'>{props.news.info}</Button>
                </Row>
              </Col>
            </Row>
            <Row>
              <Container>
                  <h5>Description of the news like : <br/> {props.news.description}</h5>
              </Container>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>&emsp;
            <Button variant="success" value="family" onClick={(e)=>{
              if(fake){
                handleShow2()
                setPerson(e.target.value)
              }else{
                sendButton(e.target.value)
              }
              handleClose1()
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16"><path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/></svg>
              &emsp;Family
            </Button>&emsp;
            <Button variant="success" value="friend" onClick={(e)=>{
              if(fake){
                handleShow2()
                setPerson(e.target.value)
              }else{
                sendButton(e.target.value)
              }
              handleClose1()
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16"><path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/></svg>
              &emsp;Friends
            </Button>&emsp;
            <Button variant="success" value="colleague" onClick={(e)=>{
              if(fake){
                handleShow2()
                setPerson(e.target.value)
              }else{
                sendButton(e.target.value)
              }
              handleClose1()
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16"><path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/></svg>
              &emsp;Collegues
            </Button>&emsp;
          </Modal.Footer>
        </Modal>
    );
  }

  const Model2=()=>{
   return(
    <Modal
    show={show2}
    onHide={handleClose2}
    backdrop="static"
    keyboard={false}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title>Please be advised!!</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row>
        <Col>
          <h1>This news is a fake</h1>
        </Col>
        <Col>
          <Container>
            <Row>
              <h2>Are you sure you still want to share this</h2>
            </Row>
          </Container>
        </Col>
      </Row>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="danger" onClick={(e)=>{
        setPerson('')
        handleClose2()
      }}>
        No
      </Button>&emsp;
      <Button variant="success" onClick={(e)=>{
        sendButton(person)
        setPerson('')
        handleClose2()
      }}>
        Yes
      </Button>&emsp;
    </Modal.Footer>
  </Modal>
   );
  }

  const sendButton=(val)=>{
    axios.post('/api/sendmsg',{
      fk_news_id:props.news.news_id,
      send_to:person,
      send_by:user.id
    }).then(()=>{
      axios.post('/api/addlog', {
        user_id: user.id,
        news_id: props.news.news_id,
        task: NEWS_SENT,
        send_to: person,
        startTime: localStorage.getItem('start_time'),
        currTime: Date.now()
      })
    });

  }

  return (
    <>
      <Button variant="success" onClick={handleShow1}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/>
        </svg>
      </Button>
      <Model1/>
      <Model2/>
    </>
  );
}

