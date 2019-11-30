import React, { Component } from 'react';
import store from '../store';
import { changeDialogName } from '../actions';
import '../stylesheets/Records.css';

class Records extends Component {
    constructor(props) {
        super(props);
        this.state = {
            part: 'personal'
        };
        this.changePart = this.changePart.bind(this);
    }

    changePart(part) {
        if (this.state.part !== part) this.setState({part});
    }

    render() {
        const records = this.props.records[this.state.part]
            .filter((_, i) => i < 10)
            .map((record, i) => 
                <p key={i}>{i + 1}) {record.username && record.username} {record.points} points</p>);

        return (
            <div className="records">
                <button 
                    onClick={() => store.dispatch(changeDialogName('menu'))} 
                    className="back-button">
                        ←
                </button>
                <button 
                    onClick={() => this.changePart('personal')} 
                    className={this.state.part === 'personal' ? 'active' : ''}>
                        Personal
                </button>
                <button 
                    onClick={() => this.changePart('overall')}
                    className={this.state.part === 'overall' ? 'active' : ''}>
                        Overall
                </button>
                {records.length ? records : <p>There are no any records</p>}
            </div>
        );
    }
}

export default Records;