import React from "react";
import "./Items.css";
import ItemMenu from "./ItemMenu";

const Items = () => {
  const Items=[{
    img:'i1.jpg',
    title:'Gujarati Thali',
    desc:`It's Include 2 type of sabji , 5 roti etc`,
    price:'140 RS'
  },{
    img:'i2.png',
    title:'Roti',
    desc:'Per Roti',
    price:'10 RS'
  },{
    img:'i3.webp',
    title:'Dal Bhat',
    desc:'Dal And Bhat',
    price:'50 RS'
  },{
    img:'i4.jpg',
    title:'Sabji',
    desc:'Per Avalable Sabji',
    price:'100 RS'
  },{
    img:'i5.jpg',
    title:'Butter Milk',
    desc:'Glass Of Butter Milk',
    price:'25 RS'
  }]
  return (
    <>
    <div className="Item_back">
      <div className="Items">
        <h1>Gujarati Thali</h1>
        <h3>Flavors of Gujarat on Plate.</h3>``

        <div className="Items_list">

        <ItemMenu items={Items[0]}/>
        <ItemMenu items={Items[1]}/>
        <ItemMenu items={Items[2]}/>
        <ItemMenu items={Items[3]}/>
        <ItemMenu items={Items[4]}/>

        </div>

        </div>
      </div>  
    </>
  );
};

export default Items;
