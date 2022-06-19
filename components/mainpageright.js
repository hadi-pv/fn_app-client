import { Container,Card ,Row,Col,Form, Modal} from "react-bootstrap";
import { useState } from "react";
import styles from '../styles/mainpage.module.css'
import Modaldiv from "./modal";


const Mainpageright=(props)=>{

    const [person,setPerson]=useState('');

    return(
        <>
            <Container className={styles.rightcontainer}>
                <br/>
                <Row style={{'padding':'1vh'}}>
                    <Form.Select aria-label="Default select example" onChange={(e)=>setPerson(e.target.value)}>
                        <option value=''>Select person</option>
                        <option value='family'>Family</option>
                        <option value='friend'>Friends</option>
                        <option value='colleague'>Colleagues</option>
                    </Form.Select>
                </Row>
                <Row className="d-flex flex-column-reverse flex-row-reverse" style={{'height':'90%','backgroundColor':'lightgrey','borderRadius':'10px'}}>
                    {
                        !person? <h1 style={{'marginBottom':'50%','color':'white'}}><center>Select a Person</center></h1>:
                        props.persons[person].map((obj)=>{
                            return(
                                <div key={obj.id} className="d-flex flex-row-reverse p-2 col-example text-left">
                                    <Card style={{ width: '25rem' }}>
                                        <Card.Body>
                                            <Card.Title>{obj.title}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                            <Card.Text>
                                            {obj.description}
                                            </Card.Text>
                                            <Modaldiv news={obj}/>
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                            
                        })
                    }
                </Row>
            </Container>
        </>
    );
}

export default Mainpageright;