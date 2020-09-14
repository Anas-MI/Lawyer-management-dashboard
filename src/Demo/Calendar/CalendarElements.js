import React, {useState} from 'react';
import Calendar from 'react-calendar';

const CalendarElements = () =>{
    const [date, setDate] = useState(new Date());

    const onChange = date =>{
        setDate(date)
    }
    const events = (e) =>{
        setDate([new Date(2017, 0, 1), new Date(2017, 7, 1)])
    }

    return(
        <div>
            
            <Calendar onChange={onChange} value={date} />
            <br />
            <button  onClick={events}>Events</button> <br />
            {date.toString()}
            <div>
                <h3>Title</h3>
                <p>What to do.......</p>
            </div>
        </div>
    )
}
export default CalendarElements