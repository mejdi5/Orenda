import React,{useEffect, useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {useParams, Link} from 'react-router-dom'
import {getProfile} from '../../../Redux/actions/userActions'
import {Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button} from 'reactstrap';



function Profile() {

    const user = useSelector(state => state.authReducer.user)
    const users = useSelector(state => state.userReducer.users)
    const dispatch = useDispatch()
    const {_id} = useParams()

    useEffect(() => {
        dispatch(getProfile())
    }, [])

    return (
        
<div style={{marginBottom:'50px'}}>
    {users && users.map(el => el._id == _id ?
<div>
<Card style={{textAlign:'center'}}>
    <div >
    <CardImg top width="100%" src={el.photo} alt="" style={{width:'25%', height:'15%', boxShadow: '0 8px 16px 0 lightBlue'}}/>
    <CardBody>
      <CardTitle tag="h5">Name: {el.fullname}</CardTitle>
      <CardSubtitle tag="h6" className="mb-2 text-muted" >Role: {el.role}</CardSubtitle>
      {el.address && <CardText>Address: {el.address}</CardText>}
      {el.role[0] !== "Professional" && el.dateOfBirth && <CardText>Date Of Birth: {el.dateOfBirth}</CardText>}
      {el.role[0] === "Professional" && el.dateOfBirth && <CardText>Created at: {el.dateOfBirth}</CardText>}
      <CardText>Email: {el.email}</CardText>
      {el.phoneNumber && <CardText>Phone Number: {el.phoneNumber}</CardText>}
      {el.role[0] === "Professional" && el.description && <CardText>Description: {el.description}</CardText>}
    </CardBody>
  </div> 
</Card> 
</div> : null )}
</div>)
}

export default Profile
