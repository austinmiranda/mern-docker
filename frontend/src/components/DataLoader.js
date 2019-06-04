import React, { Component } from 'react';
import { DataView } from './DataView';
class DataLoader extends Component {

    constructor(props){
        super(props);
        //set up the state
        this.state={
            data:"",
            loaded: false,
            connectionAttempts: 0
        };
        this.url =
      process.env.NODE_ENV === "prod"
        ? "http://my-api:80/api/countries/allNameOnly"
        : "http://192.168.99.100:80/api/countries/allNameOnly";

        this.deleteurl =
        process.env.NODE_ENV === "prod"
          ? "http://my-api:80/api/countries/delete/"
          : "http://192.168.99.100:80/api/countries/delete/";

    console.log("setting the constructor");
    }

    componentDidMount = async () => {
      console.log("component is mounted, doing fetch");
      //do an api call
      await this.getData();
      console.log(this.state.data);
    }

    getData = async () => {
      await fetch(this.url)
        .then(response => response.json())
        .then(json => this.setState({ data: json, loaded: true }))
        .catch(error => {
          //likely server is not online yet
          console.error("Error:", error);
          console.log("connecting to: " + this.url);
          console.log(this.state);
          this.setState({
            connectionAttempts: this.state.connectionAttempts + 1
          });
          const direct = () => {
            this.getData();
          };
          setTimeout(direct, 5000);
        });

    }

    delete = async(id) => {
      try {
        //e.preventDefault();
      
        console.log('delete');
        console.log(id);
        await fetch(this.deleteurl+id, {method: 'DELETE',  headers:{ 'Content-Type':'application/json'}} )
        .then(async response => {
          console.log(response)
          await this.getData();
        })
        .catch(error => {
          //likely server is not online yet
          console.error("Error:", error);
        });
     
      } catch (e) {
        alert(e.message);
      }
  }

  render() {
    return (
      <div>
        {this.state.loaded && this.state.data.length > 0 ? (<DataView info={this.state.data} delete={this.delete} />) : (null)}
        </div>
    );
  }
}

export default DataLoader;
