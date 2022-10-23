<><Container className={styles.rightcontainer}>
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







// main page


<Offcanvas show={show} onHide={handleClose}>
                                <Offcanvas.Header closeButton>
                                <Offcanvas.Title>{user.id}<br/>{user.name}<br/>{user.email}<br/>{user.age}</Offcanvas.Title>
                                </Offcanvas.Header>
                                <hr style={{'margin':'1vh'}}/>
                                <Offcanvas.Body>
                                Instructions
                                </Offcanvas.Body>
                            </Offcanvas>



{/* entire main page */}
                            <div className={styles.outerdiv}>
            <Row>
                <Col md={7}>
                    <Row style={{'padding':'2vh'}} >
                        <Col md={2}>
                            <Button variant="primary" onClick={handleShow} className="me-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                </svg>&emsp;
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg>
                            </Button>   
                            <Drawer
                            opened ={show}
                            onClose = {handleClose}
                            title = 'Instructions'
                            >
                            

                            </Drawer>
                        </Col>
                    </Row>
                    <Row className={styles.firstcol}>
                        {!data? '............':
                        <Mainpageleft news={data} />} 
                    </Row>
                    
                </Col>

                <Col style={{'padding':'5vh'}} md={5}>
                    <Mainpageright/>
                </Col>
            </Row>
        </div>
                            
</>

