import React, { Component } from 'react';
import Scale from './Scale';

class GoalProgress extends Component {
    state = { 
        scales: [
            {id: 1}
        ] 
    }
    handleDelete = scaleId =>{
        //removing the scale by creating a new set of scales without the on we want to remove
        const scales = this.state.scales.filter(s => s.id !== scaleId)
        this.setState({ scales })
    }

    render() { 
        return ( 
            <>
                {this.state.scales.map(scale =>(
                    <Scale key={scale.id} id={scale.id} onDelete={this.handleDelete}/>
                ))}
                <button className="new-scale" >+</button>
                <div className="description">
                <h1>What is this tool?</h1>
                <p>
                    This is a tool that helps you evaluate how you feel about the possibility of acheiving your goals.
                </p>
                <h1>Instructions</h1>
                <p>
                    <ul>
                    <li>
                        Press the orange button to create a new scale.
                    </li>
                    <li>
                        Write the name of the goal you want to achieve.
                    </li>
                    <li>
                        Move the scale in the direction that you feel is correct for how you feel about the possibility of acheiving your goal
                    </li>
                    </ul>
                </p>
                </div>
            </>
        );
    }
}
 
export default GoalProgress;