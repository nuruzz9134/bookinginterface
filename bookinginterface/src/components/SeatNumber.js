import React from 'react'
import { useSelector } from 'react-redux'
import { busbookedSeats } from '../features/BusSlice'
import { useState } from 'react'

const SeatNumber = ({seat}) => {

    const [colr,setColor] = useState(null)

    let s = String(seat)
    const seats = useSelector(busbookedSeats)
    let currClass = ''
    for (let k in seats){
        for(let m in seats[k]){
            if (seat == seats[k][m]){
            currClass = 'change-butt-colr'
            }
        }
    }
    

    return <div className={currClass}  
                style={{backgroundColor : colr}}
                onClick={()=>setColor('red')}
                >{seat}</div>

}

export default SeatNumber