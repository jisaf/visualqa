import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

//style
import '../styles/home.page.scss';

//components

@inject('store')
@observer
class HomePage extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){

    }

    render() {
        return (
            <section className="HomePage__wrapper">
                <div>
                    Put stuff here
                </div>
            </section>
        )
    }
}

export default HomePage;


