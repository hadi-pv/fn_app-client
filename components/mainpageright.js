import { Container,Card ,Row,Col,Form, Modal} from "react-bootstrap";
import { useEffect, useState } from "react";
import styles from '../styles/mainpage.module.css'
import Modaldiv from "./modal";
import axios from "axios";

const Mainpageright=(props)=>{

    const [person,setPerson]=useState('');
    const [flag,setFlag]=useState(true)
    const [persons,setPersons] = useState({
        'family':null,
        'friend':null,
        'colleague':null
    })

    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem('user'))
        axios.post('/api/getmsg',{
            send_by:user.id
        })
        .then((resp)=>{
            if(resp.data){
                setPersons(prevState=>({
                    ...prevState,
                    'family':resp.data.message.filter((data)=>data.send_to=='family'),
                    'friend':resp.data.message.filter((data)=>data.send_to=='friend'),
                    'colleague':resp.data.message.filter((data)=>data.send_to=='colleague')
                }))    
                setFlag(false)
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
   
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
                {flag? '............':
                <Row className="d-flex flex-column-reverse flex-row-reverse" style={{'height':'90%','backgroundColor':'lightgrey','borderRadius':'10px','overflowY':'scroll'}}>
                {
                    !person? <h1 style={{'marginBottom':'50%','color':'white'}}><center>Select a Person</center></h1>:
                    persons[person].map((obj)=>{
                        return(
                            <div key={obj.news_id} className="d-flex flex-row-reverse p-2 col-example text-left">
                                <Card style={{ width: '25rem' }}>
                                    <Card.Body>
                                        <Card.Title>{obj.headline}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{obj.info}</Card.Subtitle>
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
        }
            </Container>
        </>
    );
}

export default Mainpageright;