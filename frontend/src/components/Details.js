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

    this.state = {
      countryDetail: '',
      connectionAttempts: 0,
      loaded: false,
      collapse: false
    };

    this.url =
    process.env.NODE_ENV === "prod"
      ? "http://my-api:80/api/countries/"
      : "http://192.168.99.100:80/api/countries/";
  }


  onEntering = async () => {
    await this.getCountryDetails();
  }


  onExited = async () => {
    this.setState({ countryDetail: '', connectionAttempts: 0, loaded: false});

    //console.log(this.state);
  }


  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  getCountryDetails = async () => {
    await fetch(this.url+this.props.countryId)
      .then(response => response.json())
      .then(json => this.setState({ countryDetail: json, loaded: true }))
      .catch(error => {
        //likely server is not online yet
        console.error("Error:", error);
        console.log("connecting to: " + this.url);
        console.log(this.state);
        this.setState({
          connectionAttempts: this.state.connectionAttempts + 1
        });
        const direct = () => {
          this.getCountryDetails();
        };
        setTimeout(direct, 5000);
      });
      console.log(this.state.countryDetail);
  }

  componentWillUnmount = () => {
    this.setState({ countryDetail: '', connectionAttempts: 0, loaded: false});
  }
  


  render() {
    return (
        <Container fluid>
          <div className="animated fadeIn">
            <Button color="info" style={{ marginBottom: '1rem' }} onClick={this.toggle}>
              Details
            </Button>
        
            <Collapse
              isOpen={this.state.collapse}
              onEntering={this.onEntering}
              onExited={this.onExiting} >
              {this.state.loaded ? (
                <Row>
                    <Col sm={4} style={imageStyle}>
                        <img src={this.state.countryDetail.flag} 
                          className="img-profile" width="100%" />
                    </Col>
                    <Col sm={8}>
                      Capital: {this.state.countryDetail.capital}
                      <br />
                      Population: {this.state.countryDetail.population}
                      <br />
                      Location: {this.state.countryDetail.location.latitude}, {this.state.countryDetail.location.longitude}
                      <br />
                      Currency: {this.state.countryDetail.currency}
                      <br />
                      Languages: {this.state.countryDetail.languages.map((language) => {
                        return (<span key={language}> {language } </span>)
                      })}
                    </Col>
                </Row>) : (null) }
            </Collapse>
          </div>
        </Container>
    );
  }
}

const imageStyle = { display: 'flex', justifyContent: 'left', alignItems: 'center'}


export default Details;
