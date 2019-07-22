import React, { Component } from 'react';
import { observer } from 'mobx-react';

//style
import './Template.scss';

@observer
class Template extends Component {

    constructor(props) {
        super(props);
        this.state = {count: 0};
    }

    handleClick = () => {
        let newCount = this.state.count + 1;
        this.setState({count: newCount});
    }

    render() {
        return (
            <div className="template-wrapper">
                Hello world <br />
                {this.state.count}
                <br />
                <button onClick={this.handleClick}> click </button>
            </div>
        )
    }
}

export default Template;
