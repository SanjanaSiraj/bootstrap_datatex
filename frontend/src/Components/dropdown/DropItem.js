import React from "react";
import './DropItem.css'
function DropItem(props){
    return(
        <div className='cart-item'>
            <img src={props.item.IMAGE} alt='item' />
            <div className='item-details'>
                <span className='name'>color id: {props.item.COLOR_ID}</span>
                <span className='price'>price:
        {props.item.TOTAL_PRICE}
      </span>
            </div>
        </div>
    )
}
export default DropItem