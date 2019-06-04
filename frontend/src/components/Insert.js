import React, { Component } from 'react';

import { Alert, Button, Card, CardHeader, CardBody, Col, Container, 
  Input, InputGroup, InputGroupAddon, Row, 
  Label, FormFeedback,
  FormGroup, FormText } from 'reactstrap';


import { Formik, Form, Field, FieldArray } from 'formik';

import * as Yup from 'yup';

const styles = {
  textLeft: {
    textAlign: "left"
  }
};


const SignupSchema = Yup.object().shape({
  country: Yup.string()
    .required('Country Name Required'),
  capital: Yup.string()
    .required('Capital Name Required'),
  population: Yup.number()
    .required('population Required'),
  latitude: Yup.string()
    .required('latitude is Required'),
  longitude: Yup.string()
    .required('longitude is Required'),
  currency: Yup.string()
    .required('currency type Required'),
  flag: Yup.string().url()
    .required('Flag image url is Required'),
  languages: Yup.array()
   .of(
    Yup.string()
      .required('Required'), // these constraints take precedence
    
  )
  .required('Must have Languages') // these constraints are shown if and only if inner constraints are satisfied
  .min(1, 'Minimum of 1'),
});

class Insert extends Component {


  constructor(props) {
     super(props);

      this.state = {
        validation_error: ''
      };

     this.url =
     process.env.NODE_ENV === "prod"
       ? "http://my-api:80/api/countries/new/"
       : "http://192.168.99.100:80/api/countries/new/";
  }
  


  insert = async(jsonObject) => {
      try {
        //e.preventDefault();
        let data = {
          name: jsonObject.country,
          capital: jsonObject.capital,
          population: jsonObject.population,
          languages: jsonObject.languages,
          latitude: jsonObject.latitude,
          longitude: jsonObject.longitude,
          cur: jsonObject.currency,
          flag: jsonObject.flag
        }
        console.log(data);
        await fetch(this.url+data.name, {method: 'POST', body: JSON.stringify(data), headers:{ 'Content-Type':'application/json'}} )
        .then(response => {
          console.log(response)
          if(response.status === 403){
            console.log('Country exists in Database')
            this.setState({
              validation_error: 'Country exists in Database!'
            });
          }
          else if(response.status === 200){
            this.props.history.push("list");
          }
        })
        .catch(error => {
          //likely server is not online yet
          console.error("Error:", error);
        });

        //this.props.history.push("list");
     
      } catch (e) {
        alert(e.message);
      }
  }

  onDismiss = () => {
    this.setState({ validation_error: false });
  }
 

  render() {
    return (
        <Container fluid>
          <div className="animated fadeIn">
            <Row className="justify-context-md-center">
              <Col xs={{ size: 8, offset: 2}}> 
              <Card >
                  <CardHeader>
                        <h2>
                            Insert
                        </h2>
                  </CardHeader>
                <CardBody >
                <Formik
                  initialValues={{
                    country: '',
                    capital: '',
                    population: '',
                    languages: [],
                    latitude: '',
                    longitude: '',
                    currency:'',
                    flag:''
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={async (values) => {
                    // same shape as initial values
                    //e.preventDefault();
                    //console.log(e);
                    console.log(values);
                    await this.insert(values);
                  }}
                >
    {({ errors, touched, values }) => (
                  <Form>
                    <div style={styles.textLeft}>
                    <FormGroup>
                        <Label>Country</Label>
                      	<Input
                          type="text"
                          placeholder="Country Name"
                          name="country"
                          tag={Field}
                          invalid={errors.country && touched.country}
                        />
					            <FormFeedback>{errors.country}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label>Capital</Label>
                        <Input
                            type="text"
                            placeholder="Capital Name"
                            name="capital"
                            tag={Field}
                            invalid={errors.capital && touched.capital}
                          />
                        <FormFeedback>{errors.capital}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label>Population</Label>
                        <Input
                            type="number"
                            placeholder="Population"
                            name="population"
                            tag={Field}
                            invalid={errors.population && touched.population}
                          />
					            <FormFeedback>{errors.population}</FormFeedback>
                    </FormGroup>
                    <Row form>
                      <Col md={6}>
                          <FormGroup>
                            <Label>Latitude</Label>
                              <Input
                                  type="text"
                                  placeholder="Latitude ex. 56.1304 N"
                                  name="latitude"
                                  tag={Field}
                                  invalid={errors.latitude && touched.latitude}
                                />
                              <FormFeedback>{errors.latitude}</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label>Longitude</Label>
                            <Input
                                  type="text"
                                  placeholder="Longitude ex. 106.3468 W"
                                  name="longitude"
                                  tag={Field}
                                  invalid={errors.longitude && touched.longitude}
                                />
                              <FormFeedback>{errors.longitude}</FormFeedback>
                          </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                        <Label>Currency</Label>
                        <Input
                              type="text"
                              placeholder="Currency Type"
                              name="currency"
                              tag={Field}
                              invalid={errors.currency && touched.currency}
                            />
                          <FormFeedback>{errors.currency}</FormFeedback>
                    
                    </FormGroup>
                    <FormGroup>
                        <Label>Flag</Label> 
                        <Input
                              type="text"
                              placeholder="Flag Image url"
                              name="flag"
                              tag={Field}
                              invalid={errors.flag && touched.flag}
                            />
                          <FormFeedback>{errors.flag}</FormFeedback>
                    
                    </FormGroup>
                    <FormGroup>
                    <Label>Official Languages</Label> 
                    <FieldArray
                        name="languages"
                        render={arrayHelpers => (
                          <div>
                            {values.languages && values.languages.length > 0 ? (
                              values.languages.map((language, index) => (
                                <div key={index}>
                                  {/* <Field name={`languages.${index}`} /> */}
                                  <InputGroup className="mb-3">
                                  <Input
                                    type="text"
                                    name={`languages.${index}`}
                                    tag={Field}
                                    invalid={errors.languages && touched.languages}
                                  />
                                  <InputGroupAddon addonType="append">
                                      <Button
                                          type="button"
                                          onClick={() => arrayHelpers.remove(index)} // remove a language from the list
                                        >
                                          -
                                        </Button>
                                  </InputGroupAddon>
                             {errors.languages && errors.languages.length > 0 ?
                              (<FormFeedback>{errors.languages[index]}</FormFeedback>) : (null)}
                             </InputGroup>
                             
                             
                             
                             
                                  {index === values.languages.length-1  ? (<Button
                                    type="button"
                                    onClick={() => arrayHelpers.insert(index+1, '')} // insert an empty string at a position
                                  >
                                    Add additional language
                                  </Button>) : (null)}
                                  
                                </div>
                              ))
                              
                            ) : (
                              <Button type="button" onClick={() => arrayHelpers.push('')}>
                                {/* show this when user has removed all languages from the list */}
                                Add Language
                              </Button>
                            )}
                          </div>
                        )}
                      />
                      <FormText> {typeof errors.languages === 'string' ? <div style={{color: "red"}}>{errors.languages}</div> : null} </FormText>
                    </FormGroup>
                    </div>
                    <Button color="success">Insert Country</Button>
                  </Form>
                  )}
                  </Formik>
                  <br />
                    <Row>
                        <Col>
                        {this.state.validation_error ? (
                          <Alert  color="danger" isOpen={this.state.validation_error} toggle={this.onDismiss}>
                            {this.state.validation_error}
                          </Alert >) :
                          (null)
                        }
                        </Col>
                      </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          </div>
        </Container>
      
    );
  }
}

export default Insert;