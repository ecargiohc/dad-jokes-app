import React, {Component} from 'react';
import './Joke.css';

class Joke extends Component {
    render() {
        return(
            <div className="Joke">
                    <div className="Joke-text">
                        {this.props.text}
                    </div>
                <div className="Joke-buttons">
                    <i className="fas fa-arrow-up" 
                    onClick={this.props.upVote}/>
                    <span>{this.props.vote}</span>
                    <i className="fas fa-arrow-down"
                    onClick={this.props.downVote}/>
                </div>
            </div>
        )
    }
}
export default Joke;
