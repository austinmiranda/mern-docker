import React, { Component } from 'react';
import DataLoader from './DataLoader'
import {
  Container,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from "reactstrap";

class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {
    return (
        <Container fluid>
          <div className="animated fadeIn">
            <Row className="justify-context-md-center">
              <Col xs={{ size: 8, offset: 2}}> 
                <Card>
                    <CardHeader>
                      <h2>Countries</h2>
                      <code />
                    </CardHeader>
                    <CardBody>
                      <DataLoader />
                    </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
    );
  }
}

export default List;
