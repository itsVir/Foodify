import React from 'react'
import './Items.css'
function ItemMenu(props) {
  return (

    <div className="Item_card">
          <div className="Item_img">
            <img src={`./itrm/${props.items.img}`} alt="Gujarati_Dish"></img>
          </div>
          <div className="Item_detail">
          <h2>{props.items.title}</h2>
          <p>{props.items.desc}</p>
          <p>{props.items.price}</p>
       
          <button>Add</button>
          </div>
          </div>


  )
}

export default ItemMenu