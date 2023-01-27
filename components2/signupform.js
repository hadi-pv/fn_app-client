import axios from 'axios';
import { useState } from 'react';
import {Form,Button,Container} from 'react-bootstrap'
import styles from '../styles/index.module.css'
import { ScrollArea, Select } from '@mantine/core';

const Signup = () =>{

    const [name,setName]=useState('')
    const [age,setAge]=useState('')
    const [gender,setGender]=useState('')
    const [motherTongue,setMotherTongue]=useState('')
    const [homeState,setHomeState]=useState('')
    const [educationalQualification,setEducationalQualification]=useState('')
    const [educationalBackground,setEducationalBackground]=useState('')
    const [occupation,setOccupation]=useState('')
    const [socialMediaUsage,setSocialMediaUsage]=useState([])
    const [socialMediaUsageOrder,setSocialMediaUsageOrder]=useState({ 1: '', 2: '', 3: '' })
    const [socialMediaUsageTime,setSocialMediaUsageTime]=useState('')
    const [whatsappUsageTime,setWhatsappUsageTime]=useState('')
    const [isWhatsappGroupMember,setIsWhatsappGroupMember]=useState('')
    const [whatsappUsageFrequencyForNews,setWhatsappUsageFrequencyForNews]=useState('')
    const [prefferedLanguageOnSocialMedia,setPrefferedLanguageOnSocialMedia]=useState('')
    const [email,setEmail]=useState('')
    const [family,setFamily]=useState('')
    const [friend,setFriend]=useState('')
    const [colleague,setColleague]=useState('')

    const genderOptions = ["Male", "Female", "Other"];
    const homeStateOptions = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"];
    const educationalQualificationOptions = ["High school", "Under Graduation or Equivalent", "Post Graduation or Equivalent and above", "Others"];
    const educationalBackgroundOptions = ["Arts", "Commerce", "Science", "Social Science", "Engineering", "Medical", "Others"];
    const socialMediaUsageOptions = ["WhatsApp", "Facebook", "Twitter", "Instagram", "LinkedIn", "YouTube", "Telegram", "Others"];
    const socialMediaUsageOrderOptions = ["WhatsApp", "Facebook", "Twitter", "Instagram", "LinkedIn", "YouTube", "Telegram"];
    const socialMediaUsageTimeOptions = ["Less than 1 hour", "1-2 hours", "2-3 hours", "3-6 hours", "More than 6 hours"];
    const whatsappUsageTimeOptions = ["Less than 1 hour", "1-2 hours", "2-3 hours", "3-6 hours", "More than 6 hours"];
    const isWhatsappGroupMemberOptions = ["Yes", "No"];
    const whatsappUsageFrequencyForNewsOptions = ["Never", "Rarely", "Sometimes", "Often", "Very Often"];
    const prefferedLanguageOnSocialMediaOptions = ["English", "Hindi", "Assamese", "Bengali", "Gujarati", "Kannada", "Malayalam", "Marathi", "Punjabi", "Tamil", "Telugu", "Urdu", "Others"];

    const validateDataFields = () => {
        if (name === '' || email === '' || age === '' || family === '' || friend === '' || colleague === '' ||
            gender === '' || motherTongue === '' || homeState === '' || educationalQualification === '' ||
            educationalBackground === '' || socialMediaUsage.length === 0 ||
            socialMediaUsageOrder["1"] === '' ||socialMediaUsageOrder["2"] === '' || socialMediaUsageOrder["3"] === ''
             || socialMediaUsageTime === '' || whatsappUsageTime === '' ||
            isWhatsappGroupMember === '' || whatsappUsageFrequencyForNews === '' || prefferedLanguageOnSocialMedia === '') {
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
        else if (socialMediaUsageOrder["1"] === socialMediaUsageOrder["2"] || socialMediaUsageOrder["1"] === socialMediaUsageOrder["3"] || socialMediaUsageOrder["2"] === socialMediaUsageOrder["3"]) {
            alert('Please select different social media platforms for order');
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
        let news_rand = Math.floor(Math.random() * 8).toString();
        const rt=''
        const nt=''

        switch(news_rand){
            case '0':
                rt='000'
                nt='ptn'
            case '1':
                rt='000'
                nt='lsn'
            case '2':
                rt='111'
                nt='ptn'
            case '3':
                rt='111'
                nt='lsn'
            case '4':
                rt='222'
                nt='ptn'
            case '5':
                rt='222'
                nt='lsn'
            case '6':
                rt='333'
                nt='ptn'
            case '7':
                rt='333'
                nt='lsn'

        }
        

        if (validateDataFields() === false) {
            return;
        }
        
        axios.post('/api/signupsheet',{
            email:email,
            name:name,
            age:age,
            gender:gender,
            motherTongue,
            homeState,
            educationalQualification,
            educationalBackground,
            occupation,
            socialMediaUsage,
            socialMediaUsageOrder,
            socialMediaUsageTime,
            isWhatsappGroupMember,
            whatsappUsageFrequencyForNews,
            prefferedLanguageOnSocialMedia,
            family:family,
            friend:friend,
            colleague:colleague,
            rt:rt,
            nt:nt
            })
        .then((resp)=>{
            const id=resp.data
            const starttime=new Date().getTime()
            localStorage.setItem('user',JSON.stringify({id,name,email,age,rt,nt,starttime,family,friend,colleague}))
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

    return (
        <ScrollArea style={{ height: "90vh" }}>
            <Container>
                <Form className={styles.form} onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label> Name </Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                        <Form.Text className={styles.textmuted}> You can choose a nickname </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="age">
                        <Form.Label> Age </Form.Label>
                        <Form.Control type="number" placeholder="Enter age" value={age} onChange={(e) => setAge(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="gender">
                        <Form.Label> Gender </Form.Label>
                        <Form.Select onChange={(e) => setGender(e.target.value)}>
                            <option value=""> Select a Gender </option>
                            {genderOptions.map((genderOption) => ( <option value={genderOption}> {genderOption} </option> ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="homeState">
                        <Form.Label> Home State </Form.Label>
                        <Form.Select onChange={(e) => setHomeState(e.target.value)}>
                            <option value=""> Select a Home State </option>
                            {homeStateOptions.map((stateOption) => ( <option value={stateOption}> {stateOption} </option> ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="motherTongue">
                        <Form.Label> Mother Tongue </Form.Label>
                        <Form.Control type="text" placeholder="Enter your mother tongue" value={motherTongue} onChange={(e) => setMotherTongue(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="educationalQualification">
                        <Form.Label> Educational Qualification </Form.Label>
                        <Form.Select onChange={(e) => setEducationalQualification(e.target.value)}>
                            <option value=""> Select an Educational Qualification </option>
                            {educationalQualificationOptions.map((educationalQualificationOption) => ( <option value={educationalQualificationOption}> {educationalQualificationOption} </option> ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="educationalBackground">
                        <Form.Label> Educational Background </Form.Label>
                        <Form.Select onChange={(e) => setEducationalBackground(e.target.value)}>
                            <option value=""> Select an Educational Background </option>
                            {educationalBackgroundOptions.map((educationalBackgroundOption) => ( <option value={educationalBackgroundOption}> {educationalBackgroundOption} </option> ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="occupation">
                        <Form.Label> Occupation </Form.Label>
                        <Form.Control type="text" placeholder="If employed, enter your occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="socialMediaUsage">
                        <Form.Label> Which of these Social Media platforms do you use? </Form.Label>
                        {socialMediaUsageOptions.map((socialMediaUsageOption,id) => (
                            <Form.Check key={id} type="checkbox" label={socialMediaUsageOption} onChange={(e) => { if (e.target.checked) { setSocialMediaUsage([...socialMediaUsage, socialMediaUsageOption]); }
                            else { setSocialMediaUsage(socialMediaUsage.filter((socialMediaUsageOption) => socialMediaUsageOption !== e.target.value)); } }} />
                        ))}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="socialMediaUsageOrder">
                        <Form.Label> In the order of your most frequent usage, mention three social media platforms. </Form.Label>
                        <Form.Select className="mb-1" onChange={(e) => setSocialMediaUsageOrder({ ...socialMediaUsageOrder, ["1"]: e.target.value})}>
                            <option value=""> 1st mostly used </option>
                            {socialMediaUsageOrderOptions.map((socialMediaUsageOption) => ( <option value={socialMediaUsageOption}> {socialMediaUsageOption} </option> ))}
                        </Form.Select>
                        <Form.Select className="mb-1" onChange={(e) => setSocialMediaUsageOrder({ ...socialMediaUsageOrder, ["2"]: e.target.value})}>
                            <option value=""> 2nd mostly used </option>
                            {socialMediaUsageOrderOptions.map((socialMediaUsageOption) => ( <option value={socialMediaUsageOption}> {socialMediaUsageOption} </option> ))}
                        </Form.Select>
                        <Form.Select className="mb-1" onChange={(e) => setSocialMediaUsageOrder({ ...socialMediaUsageOrder, ["3"]: e.target.value})}>
                            <option value=""> 3rd mostly used </option>
                            {socialMediaUsageOrderOptions.map((socialMediaUsageOption) => ( <option value={socialMediaUsageOption}> {socialMediaUsageOption} </option> ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="socialMediaUsageTime">
                        <Form.Label> Your daily social media use: </Form.Label>
                        <Form.Select onChange={(e) => setSocialMediaUsageTime(e.target.value)}>
                            <option value=""> Select an option </option>
                            {socialMediaUsageTimeOptions.map((socialMediaUsageTimeOption) => ( <option value={socialMediaUsageTimeOption}> {socialMediaUsageTimeOption} </option> ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="whatsappUsageTime">
                        <Form.Label> Your daily WhatsApp use: </Form.Label>
                        <Form.Select onChange={(e) => setWhatsappUsageTime(e.target.value)}>
                            <option value=""> Select an option </option>
                            {whatsappUsageTimeOptions.map((whatsappUsageTimeOption) => ( <option value={whatsappUsageTimeOption}> {whatsappUsageTimeOption} </option> ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="isWhatsappGroupMember">
                        <Form.Label> Are you a member of any WhatsApp group? </Form.Label>
                        <Form.Select onChange={(e) => setIsWhatsappGroupMember(e.target.value)}>
                            <option value=""> Select an option </option>
                            {isWhatsappGroupMemberOptions.map((isWhatsappGroupMemberOption) => ( <option value={isWhatsappGroupMemberOption}> {isWhatsappGroupMemberOption} </option> ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="whatsappUsageFrequencyForNews">
                        <Form.Label> How often do you use WhatsApp as a source for news? </Form.Label>
                        <Form.Select onChange={(e) => setWhatsappUsageFrequencyForNews(e.target.value)}>
                            <option value=""> Select an option </option>
                            {whatsappUsageFrequencyForNewsOptions.map((whatsappUsageFrequencyForNewsOption) => ( <option value={whatsappUsageFrequencyForNewsOption}> {whatsappUsageFrequencyForNewsOption} </option> ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="prefferedLanguageOnSocialMedia">
                        <Form.Label> What language do you prefer to use on social media? </Form.Label>
                        <Form.Select onChange={(e) => setPrefferedLanguageOnSocialMedia(e.target.value)}>
                            <option value=""> Select an option </option>
                            {prefferedLanguageOnSocialMediaOptions.map((prefferedLanguageOnSocialMediaOption) => ( <option value={prefferedLanguageOnSocialMediaOption}> {prefferedLanguageOnSocialMediaOption} </option> ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label> Email </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <Form.Text className={styles.textmuted}> We&apos;ll never share your email with anyone else. </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="family">
                        <Form.Label> A family chat group name: </Form.Label>
                        <Form.Control type="name" placeholder="Family" value={family} onChange={(e)=>setFamily(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="friend">
                        <Form.Label> A friends circle chat group name: </Form.Label>
                        <Form.Control type="name" placeholder="Friend" value={friend} onChange={(e)=>setFriend(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="colleague">
                        <Form.Label> A college/school chat group name: </Form.Label>
                        <Form.Control type="name" placeholder="Colleague" value={colleague} onChange={(e)=>setColleague(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
        </Container>
        </ScrollArea>
    );
}

export default Signup;

