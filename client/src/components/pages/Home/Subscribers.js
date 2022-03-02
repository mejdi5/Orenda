import React from 'react'
import {Card} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

function Subscribers() {

    const users = useSelector(state => state.userReducer.users)
    const UserString = useSelector(state => state.userReducer.UserString)
    const cards = useSelector(state => state.cardReducer.cards)

    return (
      <div className="col-10" style={{marginBottom:'50px'}}>
        <div className="user-group" style={{marginLeft:'20%'}}>
          {
          users && users
          .filter(el => el.fullname.toLowerCase().includes(UserString.toLowerCase().trim()))
          .filter(el => cards.find(card => card.subscribers.find(subscriber => subscriber._id === el._id)))
          .map(el => 
          <>
              <Card style={{display:'inline-block', margin:'20px', width:'270px', textAlign:'center', boxShadow: '0 8px 16px 0 lightBlue'}} key={el._id}>
              <Card.Body>
                <Link to={`/${el._id}`}><Card.Title>{el.fullname}</Card.Title></Link>
                <Card.Text>Email: {el.email}</Card.Text>
              </Card.Body>
              </Card>
          </>
          )}
        </div> 
      </div>
    )
}

export default Subscribers
