import React, { useState, useEffect } from 'react'
//import { useSelector, useDispatch } from 'react-redux'
//import { updateBlog, createBlog } from '../../../store/Actions'
import { Form,Button, Row , Col } from "react-bootstrap";
import AddEmployee from './AddEmployee'

/*
const [editMode,setEditMode] = useState(false)
const dispatch = useDispatch()
const selectedContact = useSelector(state=>state.Contact.selected)

useEffect(()=>{
    if(!selectedContact){
        setEditMode(false)
    }else{
        this.setState({...selectedContact})
        setEditMode(true)
    }
},[])

*/
class AddEditContact extends React.Component {
    constructor(props){
      super(props)
      this.state = {Employee : [""]}
    }
    
    render(){
    const HandleAddEmployee = () =>{
      let newState = this.state.Employee
      newState.push("")
      this.setState({Employee : newState})

    }
    
    const handleSubmit = e => {
        e.preventDefault()
        /*
        if(editMode){
            // dispatch(updateBlog({id:state._id,body:state}))
        }else{
          console.log(this.state)
           //  dispatch(createBlog(state))
        }
        */
        this.props.history.goBack()
    }
    let Employee = this.state.Employee.map((value,i)=>{
      return <AddEmployee index={i} state={this.state}></AddEmployee>
    })

    return (
        <div className='w-75 m-auto'>
        <h3 className="text-center mb-4 form-header-text">Add New Contact</h3>
        
     
        <h4 className='text-center' >Company Details</h4>
          {Employee}          
          <Button onClick={HandleAddEmployee}>Add Employee</Button>
         {/* <Button onClick={handleSubmit}>{editMode?'Update':'Create'}</Button> */}
          <Button onClick={handleSubmit}>Create</Button>
      </div>
    )}
}

export default AddEditContact
