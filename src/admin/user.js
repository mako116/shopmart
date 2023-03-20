import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import useGetData from '../custom-hooks/useGetData'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase config'
import {toast} from 'react-toastify'
const Users = () => {

    const {data:usersData, loading }=useGetData('users')
  
    const deleteUser = async(id)=>{
        await deleteDoc(doc(db, 'users',id))
        toast.success('user Deleted')
      }
    return (
    <section>
      <Container>
        <Row>
            <Col lg='12'><h4 className='fw-bold'>users</h4></Col>
            <Col lg='12' className='pt-5'>
                <table className='table'>
                <thead>
                   {
                    loading ?( <h5>oading</h5>
                    ):(  <tr>
                        <th>Image</th>
                        <th>Username</th>
                        <th>email</th>
                        <th>action </th>
                    </tr>
                   )}
                </thead>
                <tbody>
                {
                    loading ? (<h5 className='pt-5 fw-bold'>Loading</h5>
                    ) : ( usersData?.map(user =>(
                        <tr>
                            <td><img src={user.photoURL} alt="" /></td>
                            <td>{user.displayName}</td>
                            <td>{user.email}</td>
                            <td><button className='btn btn-danger' onClick={()=>{deleteUser(user.id)}}>Delete</button></td>
                        </tr>
                    ))
                )}
                </tbody>
                </table>
            </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Users
