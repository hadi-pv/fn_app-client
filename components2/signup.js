import axios from 'axios';
import { useState } from 'react';
import {Form,Button,Container} from 'react-bootstrap'
import styles from '../styles/index.module.css'
import { ScrollArea } from '@mantine/core';

const Signup = () =>{

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [age,setAge]=useState('')
    const [family,setFamily]=useState('')
    const [friend,setFriend]=useState('')
    const [colleague,setColleague]=useState('')
    
    const validateDataFields = () => {
        if (name === '' || email === '' || age === '' || family === '' || friend === '' || colleague === '') {
            alert('Please fill all the fields');
            return false;
        }
        else if (isNaN(age)) {
            alert('Please enter a valid age');
            return false;
        }
        else if (age < 18) {
            alert('You are not eligible to participate in this survey');
            return false;
        }
        else if (age > 90) {
            alert('Not a valid age');
            return false;
        }
        else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            alert('Please enter a valid email address');
            return false;
        }
        else if (!name.match(/^[a-zA-Z ]+$/)) {
            alert('Please enter a valid name');
            return false;
        }
        else if (!family.match(/^[a-zA-Z ]+$/)) {
            alert('Please enter a valid family member name');
            return false;
        }
        else if (!friend.match(/^[a-zA-Z ]+$/)) {
            alert('Please enter a valid friend name');
            return false;
        }
        else if (!colleague.match(/^[a-zA-Z ]+$/)) {
            alert('Please enter a valid colleague name');
            return false;
        }
        else if (family === friend || family === colleague || friend === colleague) {
            alert('Please enter different names');
            return false;
        }
        return true;
    };


    const submitHandler=async(e)=>{
        e.preventDefault();
        let rt = Math.floor(Math.random() * 4).toString();
        rt=rt+rt+rt

        if (validateDataFields() === false) {
            return;
        }
        
        axios.post('/api/signupsheet',{
            email:email,
            name:name,
            age:age,
            family:family,
            friend:friend,
            colleague:colleague,
            rt:rt
            })
        .then((resp)=>{
            const id=resp.data
            const starttime=new Date().getTime()
            localStorage.setItem('user',JSON.stringify({id,name,email,age,rt,starttime,family,friend,colleague}))
            window.location.href = "/mainpage";  
        })
        .catch((err)=>{
            console.log(e);
            alert("Some error occured");
            setName("");
            setAge("");
            setEmail("");
        })
        };
      
    return(
        <ScrollArea style={{ height: 600 }}>
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

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Family</Form.Label>
                <div className='flex gap-2'>
                <Form.Control type="name" placeholder="Family" value={family} onChange={(e)=>setFamily(e.target.value)}/>
                </div>
                <Form.Text className={styles.textmuted}>
                A Family member you frequently chat with
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Friend</Form.Label>
                <div className='flex gap-2'>
                <Form.Control type="name" placeholder="Friend" value={friend} onChange={(e)=>setFriend(e.target.value)}/>
                </div>
                <Form.Text className={styles.textmuted}>
                 A Friends you frequently chat with
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Colleague</Form.Label>
                <div className='flex gap-2'>
                <Form.Control type="name" placeholder="Colleague" value={colleague} onChange={(e)=>setColleague(e.target.value)}/>
                </div>
                <Form.Text className={styles.textmuted}>
                A Colleagues you frequently chat with
                </Form.Text>        
            </Form.Group>
                <Button variant="primary" type="submit" >
                    Submit
                </Button>
        </Form>
        </Container>
        </ScrollArea>
    );
}

export default Signup;