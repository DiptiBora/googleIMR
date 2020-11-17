import React,{Component} from 'react';
import axios from "axios";

class Home extends Component{

    constructor() {
        super();
    
        this.state = {
          arr : [],
          latitude :'',
          longitude : '',
          vehicleNumber : '',
          timastamp :'',
          
        }
        this.postDataHandler = this.postDataHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange({ target }) {
        this.setState({
          [target.name]: target.value
        });
      }

    postDataHandler = () => {
        const mapData= {latitude:this.state.latitude,longitude:this.state.longitude,vehicleNumber:this.state.vehicleNumber,timastamp:this.state.timastamp}
        axios.post(`http://localhost:8080/vehicles`,mapData)
        .then((data) => {
      console.log(data);
      this.setState({arr: data});
    });
    alert("Vehicle Data submitted successfully");
    }

    previousDataHandler = () => {
        this.props.history.goBack();
    }

    render(){
        return (
            <div style={{marginTop:"50px",border:"2px solid black",height:"370px",width:"800px",marginLeft:"250px",marginRight:"250px"}}>
                <h1 style={{marginLeft:"20px"}}>Enter Vehicle Data</h1>
                <input style={{margin:"10px",height:"10px",padding:"10px",marginLeft:"20px",width:"300px"}} type="text"  name="latitude" value={this.state.latitude} onChange={ this.handleChange } placeholder="Enter Latitude" /><br/>
                <input style={{margin:"10px",height:"10px",padding:"10px",marginLeft:"20px",width:"300px"}} type="text" name="longitude" value={this.state.longitude} onChange={ this.handleChange } placeholder="Enter Longitude" /><br/>
                <input style={{margin:"10px",height:"10px",padding:"10px",marginLeft:"20px",width:"300px"}} type="text" name="timastamp" value={this.state.timastamp} onChange={ this.handleChange } placeholder="Enter TimeStamp" /><br/>
                <input style={{margin:"10px",height:"10px",padding:"10px",marginLeft:"20px",width:"300px"}} type="text" name="vehicleNumber" value={this.state.vehicleNumber} onChange={ this.handleChange } placeholder="Enter VehicleNumber" /><br/>
                <button  style={{margin:"10px",height:"40px",padding:"10px",marginLeft:"20px",width:"100px"}} onClick={this.postDataHandler}>SUBMIT</button>
                <button   style={{height:"40px"}} onClick={this.previousDataHandler}>PREVIOUS</button>
            </div>
        );
    }
}

export default Home;