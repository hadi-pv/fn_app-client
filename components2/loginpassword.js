import { useState } from 'react';
import {Form,Button,Container, Modal, Alert} from 'react-bootstrap'
import { ScrollArea } from '@mantine/core';

// This component checks the password entered by the user is matching with the password stored in env file and if it matches then it redirects to the signup page
const LoginPassword = () =>{
    const [password,setPassword]=useState('')
    const [ischecked,setIschecked]=useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validatePassword = () => {
        if (password === process.env.NEXT_PUBLIC_PASSWORD) {
            window.location.href = '/signup';
        }
        else {
            Alert('Please enter the correct password');
        }
    }

    return(
        <ScrollArea style={{ height: "90vh" }}>
        <div className='flex flex-col p-4'>
            <div className='text-2xl font-bold mb-3'>
                Dear Friends, <br/><br/>
                <b>A warm hello from the Indian Institute of Technology Madras!</b> <br/><br/>
                We are a team of researchers from the Department of Management Studies, Indian Institute of Technology Madras invested in understanding how to improve the quality and accuracy of information shared on social media platforms. Considering the role of social media in information dissemination, we feel it is important to understand how users experiences with regard to ‘information’ can be enhanced on social media platforms. We invite your valuable contribution to this study about health information on social media. <br/><br/>
                <b>The study has two phases:</b> <br/>
                <b>• In the first phase, you have a small information game (10 mins)</b> <br/>
                <b>• In the second phase,  you are given a questionnaire ( 15 mins)</b> <br/><br/>
                The participation in this study is voluntary and poses no risk. You may choose to withdraw from the study at any point without giving a reason. Should you have any queries, you may ask the corresponding researcher. <br/><br/>
                We appreciate your time and contribution to academia. <br/><br/>
                Best Regards, <br/>
                Muhammed Sadiq T  (Ph.D. Candidate and Corresponding Researcher), connectsadiqt@gmail.com <br/>
                Dr. Saji Mathew (Professor, IIT Madras)
            </div>
            <div>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label={<div> I have read the <span> <Button variant="link" onClick={handleShow}>Consent of Participation</Button></span> and agree to participate in the study.</div>} onChange={(e)=>setIschecked(e.target.checked)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter the password" onChange={(e)=>setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={validatePassword} disabled={!ischecked}>
                        Submit
                    </Button>
                </Form>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title> Consent of Participation </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                • I confirm that I have read and understood the above participant information sheet for the study. <br/><br/>
                • I understand that my participation in the study is voluntary and that I am free to withdraw at any time, without giving any reason, and without my legal rights being affected. <br/><br/>
                • I agree not to restrict the use of any data or results that arise from this study, provided such use is only for academic purposes.                
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
        </ScrollArea>
    )
}

export default LoginPassword