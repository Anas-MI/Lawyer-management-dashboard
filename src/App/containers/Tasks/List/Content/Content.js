
import React from 'react'


class Content extends React.Component {
  constructor(props){
  super(props)
  this.state = {
    data: [{Name:"Jayesh", Discription : "We Dont Know", PractiseArea : "Same" },
    {Name:"Smith", Discription : "We Dont Know this one too", PractiseArea : "Same Again" }]
  }}
  
  render() {
    let newData = this.state.data.map((value, index)=>{
      return <div>
        <p>{value.Name}</p>
        <p>{value.Discription}</p>
        <p>{value.PractiseArea}</p>
        <button>Edit</button>
        <button>Delete</button>
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