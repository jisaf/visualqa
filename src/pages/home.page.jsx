import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {observable} from 'mobx';
import {getResult} from '../core/services/api.service';
//style
import '../styles/home.page.scss';
import loader from '../loader.gif';

//components

@inject('store')
@observer
class HomePage extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){

    }

    changeInputUrl = (e) => {
        this.inputUrl = e.target.value;
    };

    changeOutputUrl = (e) => {
        this.outputUrl = e.target.value;
    };

    handleButtonClick = () => {
        this.image = {loader}
        getResult(encodeURIComponent(this.inputUrl), encodeURIComponent(this.outputUrl)).then((result)=>{
        // getResult('http://lorempixel.com/400/400/', 'http://lorempixel.com/400/400/').then((result)=>{
            this.image = `https://cf12a713.ngrok.io:4000/${result.comparison}`
        })

    }


    @observable inputUrl = '';
    @observable outputUrl = '';
    @observable image = "http://lorempixel.com/400/400";

    render() {
        return (
            <section className="HomePage__wrapper">
                <div className="row pt-4">
                    <div className="col-6">
                        <div className="p-3">
                            <h1>Design With Confidence.</h1>
                            Find your design disparities faster. Compare your designs with production results. Save time and design with happiness.
                            <div className="p-3 bg-light">
                                <h3>Try it out for free</h3>
                                <h4>Enter the link to your design</h4>
                                <input type="text" value={this.inputUrl} onChange={this.changeInputUrl}/>
                                <h4>Enter the link to your website</h4>
                                <input type="text" value={this.outputUrl} onChange={this.changeOutputUrl}/>
                                <div>
                                    <button className="btn btn-primary" onClick={this.handleButtonClick}>GET A REPORT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="d-flex align-content-center justify-content-center">
                            <img src={this.image}/>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default HomePage;


