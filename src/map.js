import React, { Component } from 'react';
import GoogleMap, { Polyline } from 'google-map-react';
import axios from "axios";
import './map.css';

const mapStyles = {
    position: 'absolute',
    top: '5',
    left: '0',
    right: '0',
    bottom: '0',
    height: '450px',
    display: 'block',
    border: '2px solid black',
    margin: '0px'
}

const markerStyle = {
    height: '50px',
    width: '50px',
    marginTop: '-50px'
}

const imgStyle = {
    height: '50%'
}

const Marker = ({ title }) => (
    <div style={markerStyle}>
        <img style={imgStyle} src="https://res.cloudinary.com/og-tech/image/upload/s--OpSJXuvZ--/v1545236805/map-marker_hfipes.png" alt={title} />
        <h3>{title}</h3>
    </div>
);



class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            arr: [],
            vehicleNumber: null,
            number: null,
            vehicleList: [],
            curr: [],
            currLat: '',
            currLng: '',
            timeStamp: ''
        }
        this.clickHandler = this.clickHandler.bind(this);
        this.allLocationHandler = this.allLocationHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeNumber = this.handleChangeNumber.bind(this);
        this.currentLocationHandlerChange = this.currentLocationHandlerChange.bind(this);
    }

    handleChangeNumber({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    currentLocationHandlerChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    allLocationHandler = () => {
        axios.get(`https://map-imr-api.herokuapp.com/vehicles`)
            .then((data) => {
                var v1 = data.data._embedded.vehicleList;
                this.setState({ arr: v1 });
            })
    }

    clickHandler = () => {
        const n = 0;
        const no = this.state.number;
        const vehiclenumber = this.state.vehicleNumber;
        axios.get(`http://localhost:8080/vehiclesCount/${vehiclenumber}?number=${no}`)
            .then((data) => {
                var v1 = data.data;
                console.log(v1);
                this.setState({ arr: v1 });
            });
    }

    listHandler = () => {
        axios.get(`http://localhost:8080/vehiclesList`)
            .then((data) => {
                const d = data.data;
                this.setState({ vehicleList: d });
            });
    }


    currentLocationHandler = () => {
        const vehiclenumber = this.state.vehicleNumber;
        axios.get(`http://localhost:8080/currentLocation/${vehiclenumber}`)
            .then((data) => {
                const curr = data.data;
                const lat = curr.latitude;
                const lng = curr.longitude;
                const timestamp = curr.timastamp.substr(11, 8);
                this.setState({ currLat: lat, currLng: lng, timeStamp: timestamp })
            })
    }

    postData = () => {
        console.log("home");
        this.props.history.push(`/home`)
    }

    render() {
        return (
            <div>
                <GoogleMap
                    style={mapStyles}
                    bootstrapURLKeys={{ key: "AIzaSyBqOgf4wWH5ZPGPF9IKPu3LC-yDyWMs1DM" }}
                    center={{ lat: -20.70, lng: -30.03 }}
                    zoom={1}
                >
                    {
                        this.state.arr.map(
                            ({ latitude, longitude, timastamp }) => (
                                <Marker
                                    title={timastamp}
                                    lat={latitude}
                                    lng={longitude}
                                    zoom={5}
                                >
                                </Marker>
                            )
                        )
                    }

                    <Marker
                        title={this.state.timeStamp}
                        lat={this.state.currLat}
                        lng={this.state.currLng}
                    >
                    </Marker>

                </GoogleMap>
                <div className="vehicleLocation">                
                    <div className="ok"><b style={{marginTop:"5px"}}>1) All vehicle location :- </b><button style={{marginLeft:"20px",marginTop:"5px",height:"30px",width:"170px"}}onClick={this.allLocationHandler}>SUBMIT</button>
                    <b style={{marginTop:"5px",marginLeft:"100px"}} >4) Current Location :- </b><input style={{marginLeft:"62px",marginTop:"5px",height:"20px"}} type="text" name="vehicleNumber" value={this.state.vehicleNumber} onChange={this.currentLocationHandlerChange} placeholder="Enter vehicle number" />
                    <button style={{height:"25px",marginTop:"5px",marginLeft:"15px",width:"170px"}} onClick={this.currentLocationHandler}>SUBMIT</button>   
                </div>

                <div className="currLoc">
                    <b style={{marginTop:"5px"}}>2) Post Vehicle Data :- </b><button style={{marginLeft:"32px",marginTop:"5px",height:"30px",width:"170px"}} onClick={this.postData}>SUBMIT</button>
                    
                    <b style={{marginTop:"5px",marginLeft:"100px"}}>5) Get Count of Location :- </b><input style={{marginLeft:"25px",marginTop:"5px",height:"20px"}} type="text" name="vehicleNumber" value={this.state.vehicleNumber} onChange={this.handleChange} placeholder="Enter vehicle number" />
                    <input style={{marginLeft:"12px",marginTop:"5px",height:"20px",width:"60px"}} type="number" name="number" value={this.state.number} onChange={this.handleChangeNumber} placeholder="count" />
                    <button style={{height:"25px",marginTop:"5px",marginLeft:"15px",width:"90px"}} onClick={this.clickHandler}>SUBMIT</button><br></br>
                </div>

               <div className="vehicleList">
                <b style={{marginTop:"10px"}}>3) Get Vehicle List :- </b><button style={{marginLeft:"47px",marginTop:"8px",height:"30px",width:"170px"}} onClick={this.listHandler}>SUBMIT</button>
               </div>
               <div className="vehicleList1">
               {
                    this.state.vehicleList.map(
                        response => 
                        <li>
                            {response}
                        </li>
                    )
                }
                </div>
            </div>
        </div>
        )
    }
}

export default App;