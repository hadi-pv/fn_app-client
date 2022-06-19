import { Container } from 'react-bootstrap';
import styles from '../styles/index.module.css'

const Instruction = () =>{
    return(
        <div className={styles.page}>
            <Container>
                <h1>Instructions</h1>
                <Container>
                    <h3>1.Read the instructions carefully</h3>
                    <h3>1.Read the instructions carefully</h3>
                    <h3>1.Read the instructions carefully</h3>
                    <h3>1.Read the instructions carefully</h3>
                    <h3>1.Read the instructions carefully</h3>
                </Container>
            </Container>
        </div>
    );
}

export default Instruction;