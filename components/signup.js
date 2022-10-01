import axios from 'axios';
import { useState } from 'react';
import {Form,Button,Container} from 'react-bootstrap'
import styles from '../styles/index.module.css'

const Signup = () =>{

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [age,setAge]=useState('')
    const [ischecked,setIschecked]=useState(false)

    const submitHandler=async(e)=>{
        e.preventDefault();
        
        axios.post('/api/signupsheet',{
            email:email,
            name:name,
            age:age
            })
        .then((resp)=>{
            const id=resp.data
            localStorage.setItem('user',JSON.stringify({id,name,email,age}))
            window.location.href = "/mainpage";  
        })
        .catch((err)=>{
            console.log(e);
            alert("Invalid signup");
            setName("");
            setAge("");
            setEmail("");
        })
        };
      
    return(
        <Container>
        <Form className={styles.form} onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <Form.Text className={styles.textmuted}>
                We&apos;ll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="name" placeholder="Type your Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <Form.Text className={styles.textmuted}>
                Please share your Full Name
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Age</Form.Label>
                <Form.Control type="age" placeholder="Type your Age" value={age} onChange={(e)=>setAge(e.target.value)}/>
                <Form.Text className={styles.textmuted}>
                Please share the correct age
                </Form.Text>
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="mobile" placeholder="Type your Mobile Number" />
                <Form.Text className={styles.textmuted}>
                We'll never share your number with anyone else.
                </Form.Text>
            </Form.Group> */}

            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group> */}
            
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="I read the instructions and agree to all the terms and conditions" onChange={(e) => setIschecked(e.currentTarget.checked)}/>
            </Form.Group>
            {ischecked?
                <Button variant="primary" type="submit" >
                    Submit
                </Button>
                :
                <Button variant="primary" type="submit" disabled>
                    Submit
                </Button>
            }
        </Form>
        </Container>
    );
}

export default Signup;