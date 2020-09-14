import React , {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../../store/Actions'


const Logout = props => {

    const dispatch = useDispatch()

    const user = useSelector(state=>state.user)

    useEffect(()=>{
        dispatch(logoutUser())
        props.history.push('/')
    },[])

    return(<></>)
}

export default Logout