import React from "react";



const CircleButton = (props) => {
  
  return (

    <button style={{height:"fit-Content", background:props.bckgrnd, borderRadius:'50%', padding:"12px", gap:"10px", boxShadow:"0px #00000024", border:"0px"}}>
        <img style={{width:props.width, height:props.height, gap:"10px"}}src={props.img}/>
        </button>
   
  )

}

export default CircleButton