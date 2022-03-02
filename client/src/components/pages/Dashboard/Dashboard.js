import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Spinner } from 'reactstrap';
import EditProfile from './EditProfile';
import {deleteUser} from '../../../Redux/actions/userActions'
import {Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button} from 'reactstrap';
import {BrowserRouter as Router , Route, useParams} from 'react-router-dom'


const Dashboard = () => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.authReducer.user);
  const users = useSelector(state => state.userReducer.users)
  const deleteAndout = async (id) => {
    await dispatch(deleteUser(id));
    window.location.replace('/');
  }
  const { isLoading } = useSelector((state) => state.authReducer);
  const {_id} = useParams()

  if (isLoading || !user ) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spinner
          style={{ width: '3rem', height: '3rem', color: 'secondary' }}
          type="grow"
        />
      </div>
    );
  }

    return (
  <Router>
    <Route path="/dashboard/:_id" render={() => 
  <div style={{marginBottom:'50px'}}>
    {users && users
    .filter(el => el.email === user.email)
    .map(el =>    

<Card style={{textAlign:'center'}}>
  <Button onClick={() => deleteAndout(el._id)} style={{width:'130px', backgroundColor:'black'}}>Delete Profile</Button>
  <div >
    <CardImg top width="100%" src={el.photo} alt="" style={{width:'25%', height:'15%', boxShadow: '0 8px 16px 0 lightBlue'}}/>
    <CardBody>
      <CardTitle tag="h5">Name: {el.fullname}</CardTitle>
      <CardSubtitle tag="h6" className="mb-2 text-muted" >Role: {el.role}</CardSubtitle>
      {el.address && <CardText>Address: {el.address}</CardText>}
      {el.role[0] !== "Professional" && el.dateOfBirth && <CardText>Date Of Birth: {el.dateOfBirth}</CardText>}
      {el.role[0] === "Professional" && el.dateOfBirth && <CardText>Created at: {el.dateOfBirth}</CardText>}
      <CardText>Email: {el.email}</CardText>
      {el.phoneNumber && <CardText>Phone: {el.phoneNumber}</CardText>}
      {el.role[0] === "Professional" && el.description && <CardText>Description: {el.description}</CardText>}
    </CardBody>
  </div>
  <EditProfile el={el}/> 
</Card>

    )}
  </div>
  }/>
  </Router>
  );
};

export default Dashboard;