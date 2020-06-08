import React, { useEffect, useState } from 'react'

const LawyerDetail = props => {

    const [lawyer,setLawyer] = useState()

    useEffect(()=>{
        setLawyer(props.location.user)
        console.log(props.location.user)
    },[])



    return (
        <div>
            {JSON.stringify(lawyer)}

        </div>
    )
}

export default LawyerDetail