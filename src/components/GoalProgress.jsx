import React, { Component } from 'react';
import Scale from './Scale';

//packages
import { v4 as uuidv4 } from 'uuid';

class GoalProgress extends Component {
    state = { 
        scales: [] 
    }
    componentDidMount() {//adding the saved scales from local storage to state
        const scales = JSON.parse(localStorage.getItem("scales"))
        if(scales !== null){
            this.setState({
                scales
            })
        }
    }
    handleAddScale = () =>{ //saving new scale to state and local storage
        const scales = [
            ...this.state.scales, 
            {
                id: uuidv4(),
                title: null, //value changed through prop drill
                sliderValue: 50, //value changed through prop drill
                explanation: "", //value changed through prop drill
                futurePlan: "" //value changed through prop drill
            }
        ]
        this.setState({ scales })
        localStorage.setItem("scales", JSON.stringify(scales))
    }
    handleDeleteScale = scaleId =>{
        //removing the scale from state and local storage by creating a new set of scales without the on we want to remove
        const scales = this.state.scales.filter(s => s.id !== scaleId)
        this.setState({ scales })
        localStorage.setItem("scales", JSON.stringify(scales))
    }
    handleSliderValueChange = (value, id) =>{
        this.setState(prevState => {
            const scales = [...prevState.scales];
            const index = scales.findIndex(s => s.id === id);
      
            scales[index].sliderValue = value
            return { scales };
          });
          localStorage.setItem("scales", JSON.stringify(this.state.scales))
    }
    render() { 
        return ( 
            <>
                {this.state.scales.map(scale =>(
                    <Scale 
                        key={scale.id} 
                        scale={scale} 
                        onSliderValueUpdate={(event)=>this.handleSliderValueChange(event.target.value, scale.id)}
                        onDelete={this.handleDeleteScale}
                    />
                ))}
                <button className="new-scale" onClick={this.handleAddScale}>+</button>
                <div className="description">
                <h1>What is this tool?</h1>
                <p>
                    This is a tool that helps you evaluate how you feel about the possibility of acheiving your goals.
                </p>
                <h1>Instructions</h1>
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
                </div>
            </>
        );
    }
}
 
export default GoalProgress;