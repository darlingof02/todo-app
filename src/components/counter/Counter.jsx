import React, {Component} from 'react'
import './Counter.css'

class Counter extends Component {

    constructor() {
        super();

        this.state = {
            counter : 0
        }

        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.reset = this.reset.bind(this)
    }

    render() {
        return (
            <div className="">
                <CounterButton by = {1} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <CounterButton by = {5} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <CounterButton by = {10} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <div>
                    <button className='Reset' onClick={this.reset}>Reset</button>
                </div>

                <span className='count'>{this.state.counter}</span>
            </div>
            
        )
    }

    reset() {
        this.setState(
            () => {
                return {
                    counter : 0
                }
            }
        )
    }

    decrement(by) {
        this.setState(
            (prevState) => {
                return { counter : prevState.counter - by}
            }
        );
    }

    increment(by) { //update state => counter ++
        // console.log(`increment from parent = ${by}`)
        this.setState(
            (prevState) => {
                return {counter: prevState.counter + by}
            }
        );
    }
}


class CounterButton extends Component{

    //define the initial state in a constructor
    //state => 0
    constructor() {
        super();

        // this.state = {
        //     counter : 0
        //     // secondCounter : 100

        // }

        // this.increment = this.increment.bind(this);
        // this.decrement = this.decrement.bind(this);
    }

    render() {
        return (
            <div className='counter'>
                <button onClick={() => this.props.incrementMethod(this.props.by)} > +{this.props.by}</button>
                <button onClick={() => this.props.decrementMethod(this.props.by)} > -{this.props.by}</button>
            </div>
        )
    }

    // increment() { //update state => counter ++
    //     // this.state.counter ++;
    //     // this.setState({
    //     //     counter: this.state.counter + this.props.by
    //     // });
    //     this.props.incrementMethod(this.props.by);
    // };

    // decrement() { //update state => counter --
    //     // this.state.counter --;
    //     // this.setState({
    //     //     counter: this.state.counter - this.props.by
    //     // });
    //     this.props.decrementMethod(this.props.by);
    // }

}

// Counter.defaultProps = {
//     by : 1
// }



export default Counter