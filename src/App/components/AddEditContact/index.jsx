import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, createBlog } from '../../../store/Actions'
import { Form,Button } from "react-bootstrap";


const AddEditContact = props => {

    const [state,setState] = useState({})
    const [editMode,setEditMode] = useState(false)

    const dispatch = useDispatch()
    const selectedContact = useSelector(state=>state.Contact.selected)

    useEffect(()=>{
        if(!selectedContact){
            setEditMode(false)
        }else{
            setState({...selectedContact})
            setEditMode(true)
        }
    },[])

    const handleChange = e => {
        e.persist()
        setState(st=>({...st,[e.target.name]:e.target.value}))
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(editMode){
            // dispatch(updateBlog({id:state._id,body:state}))
        }else{
            // dispatch(createBlog(state))
        }
        props.history.goBack()
    }

    return (
        <div className='w-75 m-auto'>
        <h3 className='text-center' >Add New Contact</h3>
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control name='title' type="text" placeholder="Feature Title" 
            value={state['title']} onChange={handleChange}/>
          </Form.Group>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Author</Form.Label>
            <Form.Control name='author' type="text" placeholder="author" 
            value={state['author']} onChange={handleChange}/>
          </Form.Group>

          <Form.Group controlId="formGroupEmail">
            <Form.Label>Short Description</Form.Label>
            <Form.Control name='shortDescription' type="text" placeholder="shortDescription" 
            value={state['shortDescription']} onChange={handleChange}/>
          </Form.Group>

          <Form.Group controlId="formGroupEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control name='description' type="text" placeholder="Description" 
            value={state['description']} onChange={handleChange}/>
          </Form.Group>
          <Button onClick={handleSubmit}>{editMode?'Update':'Create'}</Button>
        </Form>
      </div>
    )
}

export default AddEditContact