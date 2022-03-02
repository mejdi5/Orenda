import React,{useState} from 'react'
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form'
import {useSelector, useDispatch} from 'react-redux'
import Button from 'react-bootstrap/Button'
import {addCard} from '../../../../Redux/actions/cardActions'


const AddingCard = ({cards}) => {

const dispatch = useDispatch()
const user = useSelector(state => state.authReducer.user)

const [modalIsOpen,setIsOpen] = useState(false);

  
  const [region, setRegion] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('Schools')
  const [description, setDescription] = useState('')

const email = user && user.email
const title = user && user.fullname

const Add = () => {
    
    dispatch(addCard({email, title, image, region, category, description}))
    setRegion(''); 
    setImage('');  
}

return (
<div>   
    
    <>
    <Button style={{marginLeft:'10%'}} onClick={() => setIsOpen(true)} variant="info">Post Your Card</Button>  
        <Modal isOpen={modalIsOpen} style={{width:'40%'}}>
        <Form style={{marginLeft:'35%',  fontWeight:'bold'}}>

            <Form.Group controlId="formBasicEmail" style={{display:'flex'}}>
                <Form.Label style={{textAlign:'center', marginRight:'50px'}}>Email</Form.Label>
                <Form.Control style={{width:'400px'}} type="text" value={email} required/>
            </Form.Group>

            <Form.Group controlId="formBasicTitle" style={{display:'flex'}}>
                <Form.Label style={{textAlign:'center', marginRight:'47px'}}>Name</Form.Label>
                <Form.Control style={{width:'400px'}} type="text" value={title} required/>
            </Form.Group>

            <Form.Group controlId="formBasicRegion" style={{display:'flex'}}>
                <Form.Label style={{textAlign:'center', marginRight:'40px'}}>Region</Form.Label>
                <Form.Control style={{width:'400px'}} type="text" placeholder="enter region" value={region} onChange={e => setRegion(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicImage" style={{display:'flex'}}>
                <Form.Label style={{textAlign:'center', marginRight:'45px'}}>Image</Form.Label>
                <Form.Control style={{width:'400px'}} type="text" placeholder="enter image URL" value={image} onChange={e => setImage(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicImage" style={{display:'flex'}}>
                <Form.Label style={{textAlign:'center', marginRight:'45px'}}>Description</Form.Label>
                <Form.Control style={{width:'400px'}} type="text" placeholder="enter image URL" value={description} onChange={e => setDescription(e.target.value)} />
            </Form.Group>

            <label style={{textAlign:'center', marginRight:'23px'}}>Category</label> 
            <select onChange={e => setCategory(e.target.value)} style={{width:'400px', height:'30px'}}>
                <option value="Schools">Schools</option>
                <option value="Training Centers">Training Centers</option>
                <option value="Coworking Spaces">Coworking Spaces</option>
                <option value="Clubs">Clubs</option>
                <option value="Scolarship">Scolarship</option>
                <option value="Fund">Fund</option>
                <option value="Competition">Competition</option>
                <option value="Event">Training</option>
                <option value="Event">Event</option>
                <option value="Organization">Organization</option>
                <option value="Challenge">Challenge</option>

            </select>
            <br></br> <br></br>
            <Button variant="primary" type="submit" onClick={Add} style={{marginRight:'5px'}}>Submit</Button>
            <Button variant="primary" type="submit" onClick={() => setIsOpen(false)}>Close</Button>
        </Form>
        </Modal> 
        </>

    </div>
)
}

export default AddingCard