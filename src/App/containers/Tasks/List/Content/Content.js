
import React from 'react'
import {Button} from 'antd'

class Content extends React.Component {
  constructor(props){
  super(props)
  this.state = {
    data: [{Name:"Jayesh", Discription : "We Dont Know", PractiseArea : "Same" },
    {Name:"Smith", Discription : "We Dont Know this one too", PractiseArea : "Same Again" }]
  }}
  
  render() {
    let newData = this.state.data.map((value, index)=>{
      return <tr>
            <th scope="row">{value.Name}</th>
            <td>{value.Discription}</td>
            <td>{value.PractiseArea}</td>
            <td><Button>Edit</Button></td>
            <td><Button danger>Delete</Button></td>
          </tr>
       
        
      
    })
    return (
      <div>
        <table class="table">
  <thead class="thead-light">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Discription</th>
      <th scope="col">Area</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {newData}
  </tbody>
</table>

      </div>     
    )
  }
}

export default Content 
