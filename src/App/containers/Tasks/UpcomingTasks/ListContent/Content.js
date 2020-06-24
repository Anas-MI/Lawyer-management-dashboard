
import React from 'react'


class Content extends React.Component {
  constructor(props){
  super(props)
  this.state = {
    data: [{Date : "11/11/19" , Task: "Something" , Discription : "We Dont Know", Matter : "Same" },
    {Date : "3/1/20" , Task: "Something else" , Discription : "We Dont Know this one too", Matter : "Same Again" }]
  }}
  
  render() {
    let newData = this.state.data.map((value, index)=>{
      return <div>
        <p>{value.Date}</p>
        <p>{value.Discription}</p>
        <p>{value.Task}</p>
        <p>{value.Matter}</p>
      </div>
    })
    return (
      <div>
        {newData}
      </div>     
    )
  }
}

export default Content 