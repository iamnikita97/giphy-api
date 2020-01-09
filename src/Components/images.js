import React from 'react';
import {render} from 'react-dom';


export default function ListImages(props) {
    const allData = props.allData;
    return (
        
             allData.map((item,index)=>
            
             <img key={index.toString()}src={item.images.fixed_height_downsampled.url} width="200" height="200" alt='no image  ' />
             )
        
    );
}