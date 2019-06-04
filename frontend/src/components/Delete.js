import React, { Component } from 'react';
import {
  Collapse,
  Container,
  Col,
  Row,
  Button} from "reactstrap";

class Details extends Component {

  constructor(props) {
    super(props);

  }



  onDelete = async(e) => {
    try {
      e.preventDefault();
      await this.props.delete(this.props.countryId);
   
    } catch (e) {
      alert(e.message);
    }
}

  


  render() {
    return (
          <div className="animated fadeIn">
            <Button color="warning" onClick={this.onDelete}>
              Delete
            </Button>
          </div>
    );
  }
}



export default Details;
