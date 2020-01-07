import React, {Component} from 'react';
import axios from 'axios';
import './JokeList.css';
import Joke from './Joke';
import uuid from 'uuid/v4';

class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    };
    constructor(props) {
        super(props);
        this.state = {
            jokes: []
        }
    };
    
    async componentDidMount() {
        let getJokes = [];
        while (getJokes.length < this.props.numJokesToGet) {
            let res = await axios.get("https://icanhazdadjoke.com/", {
                // this object asks for the JSON version, bc the url gives us HTML version
                headers: {Accept: 'application/json'}
            });
            // getJokes.push(res.data.joke)
        // we will make 'jokes', formerly an array, to now be an object so that we can store more info, such as 'vote':
            getJokes.push({id: uuid(), text: res.data.joke, votes: 0})
        }
        // console.log(getJokes);
        // console.log(res);
        // console.log(res.data);
        // console.log(res.data.joke)
        this.setState({
            jokes: getJokes
        });
    };

    handleVote = (id, delta) => {
        // 'delta' means a 'vote' can either be negative or positive
        this.setState(st => ({
            jokes: st.jokes.map(j => 
                j.id === id ?
                {...j, votes: j.votes + delta}
                : j
                )
        }))
    };

    render() {
        let mapJokes = this.state.jokes.map((j) => (
            <Joke
            key={j.id}
            text={j.text} 
            vote={j.votes}
            upVote={() => this.handleVote(j.id, 1)}
            downVote={() => this.handleVote(j.id, -1)}
            />
        ))
        return(
            <div className="JokeList">
                <h1 >Dad Jokes... 🤦🏻‍♀️ 🙄</h1>
                <ul>{mapJokes}</ul>
            </div>
        )
    }
}
export default JokeList;
