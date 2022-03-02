import React,{useState} from 'react'
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useDispatch} from 'react-redux'
import {editUser} from '../../../Redux/actions/userActions'
import axios from 'axios'

const EditProfile = ({el}) => {


const [editPhoto, setEditPhoto] = useState(el.photo)
const [editFullname, setEditFullname] = useState(el.fullname)
const [editDateOfBirth, setEditDateOfBirth] = useState(el.dateOfBirth)
const [editEmail, setEditEmail] = useState(el.email)
const [editAddress, setEditAddress] = useState(el.address)
const [editPhoneNumber, setEditPhoneNumber] = useState(el.phoneNumber)
const [editDescription, setEditDescription] = useState(el.description)
const [editPassword, setEditPassword] = useState(el.password)


const [modalIsOpen,setIsOpen] = useState(false);

const dispatch = useDispatch() 


const edittingUser = () => {
    dispatch(editUser( el._id,
        {photo: editPhoto,
        fullname: editFullname,
        dateOfBirth: editDateOfBirth, 
        email: editEmail, 
        address: editAddress, 
        phoneNumber: editPhoneNumber,
        description: editDescription,
        password: editPassword,
        } 
        ))
    setEditPhoto(el.photo); setEditFullname(el.fullname); setEditDateOfBirth(el.dateOfBirth); setEditEmail(el.email);
    setEditAddress(el.address); setEditPhoneNumber(el.phoneNumber); setEditPassword(el.password);
    setIsOpen(false)
}


return (
<div>   
    <Button onClick={() => setIsOpen(true)} variant="info">Edit Profile</Button>  
        <Modal isOpen={modalIsOpen} style={{width:'40%'}}>
        <Form style={{marginLeft:'35%',  fontWeight:'bold'}}>
        
            
            <Form.Group controlId="formBasicPhoto" style={{display:'flex'}}>
                <Form.Label style={{textAlign:'center', marginRight:'100px'}}>Photo</Form.Label>
                <Form.Control style={{width:'400px'}} type="text" placeholder="enter a new Photo URL" value={editPhoto} onChange={e => setEditPhoto(e.target.value)} />
            </Form.Group>
            

            <Form.Group controlId="formBasicFullname" style={{display:'flex'}}>
                <Form.Label style={{textAlign:'center', marginRight:'70px'}}>Full Name</Form.Label>
                <Form.Control style={{width:'400px'}} type="text" placeholder="enter a new fullname" value={editFullname} onChange={e => setEditFullname(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicDateOfBirth" style={{display:'flex'}}>
                <Form.Label style={{textAlign:'center', marginRight:'45px'}}>Date Of Birth</Form.Label>
                <Form.Control style={{width:'400px'}} type="date" value={editDateOfBirth} onChange={e => setEditDateOfBirth(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" style={{display:'flex'}}>
                <Form.Label style={{textAlign:'center', marginRight:'105px'}}>Email</Form.Label>
                <Form.Control style={{width:'400px'}} type="text" placeholder="enter a new email" value={editEmail} onChange={e => setEditEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicAddress" style={{display:'flex'}}>
                <Form.Label style={{textAlign:'center', marginRight:'85px'}}>Address</Form.Label>
                <Form.Control style={{width:'400px'}} type="text" placeholder="enter a new address" value={editAddress} onChange={e => setEditAddress(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPhoneNumber" style={{display:'flex'}}>
                <Form.Label style={{textAlign:'center', marginRight:'32px'}}>Phone Number</Form.Label>
                <Form.Control style={{width:'400px'}} type="text" placeholder="enter a new phone number" value={editPhoneNumber} onChange={e => setEditPhoneNumber(e.target.value)} />
            </Form.Group>

            {el.role[0] === "Professional" &&
            <Form.Group controlId="formBasicDescription" style={{display:'flex'}}>
                <Form.Label style={{textAlign:'center', marginRight:'57px'}}>Description</Form.Label>
                <Form.Control style={{width:'400px'}} type="text" placeholder="enter a new description" value={editDescription} onChange={e => setEditDescription(e.target.value)} />
            </Form.Group>}

            <Form.Group controlId="formBasicPassword" style={{display:'flex'}}>
                <Form.Label style={{textAlign:'center', marginRight:'75px'}}>Password</Form.Label>
                <Form.Control style={{width:'400px'}} type="password" placeholder="enter a new password" value={editPassword} onChange={e => setEditPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={edittingUser} style={{marginRight:'5px'}}>Save</Button>
            <Button variant="primary" type="submit" onClick={() => setIsOpen(false)}>Close</Button>
        </Form>
        </Modal>   
    </div>

)
}

export default EditProfile