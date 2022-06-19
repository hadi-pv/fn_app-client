import { Row,Card,Col,Modal,Button } from "react-bootstrap";
import styles from '../styles/mainpage.module.css';
import {useState} from 'react';
import Modaldiv from "./modal";
import news from '../data/news.json'


const Mainpageleft=(props)=>{
    
    return(
        <>
        <Row xs={2} md={4} className="g-4">
        {props.news.map((indnews) => (
            <Col key={indnews.id}>
                <Card>
                    <Card.Body>
                    <Card.Title><h1 className={styles.h1}>{indnews.title}</h1></Card.Title>
                    <Card.Text>
                        {indnews.description}
                    </Card.Text>
                    <Modaldiv news={indnews} persons={props.persons} setPersons={props.setPersons}/>                            
                </Card.Body>
                </Card>
            </Col>
        ))}
        </Row>
        </>
    );
}

export default Mainpageleft;