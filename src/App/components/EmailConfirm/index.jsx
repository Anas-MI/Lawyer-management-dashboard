import React , {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from 'antd'
import queryString from 'query-string'
import { verifyEmail } from '../../../store/Actions'


const EmailConfirm = props => {
    const dispatch = useDispatch()


    const {token} = queryString.parse(props.location.search)

    useEffect(()=>{
        if(token){
            dispatch(verifyEmail(token,(err,response)=>{
                if(err){
                    notification.error(err)
                }else{
                    props.history.push('/login')
                    notification.success(response)
                }
            }))

        }
    },[])

    return(<></>)
}

export default EmailConfirm