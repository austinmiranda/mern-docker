import React from "react";
import {
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading  } from "reactstrap";
import Details from './Details';  
import Delete from './Delete'; 
export const DataView = (props) => {


    const items = props.info.map((item) => {
      return <ListItem
                key={item._id}
                data={item}
                delete={props.delete} />
    });

      return (
          <ListGroup flush>
              {items}
          </ListGroup>
      );
    
  }

const ListItem = (props) => {


 

    return (
        
        <ListGroupItem>
            <ListGroupItemHeading>{props.data.name}</ListGroupItemHeading>
          
            <Details countryId={props.data._id}/>
            <Delete countryId={props.data._id} delete={props.delete} />
        </ListGroupItem>
        
    );
  
  }