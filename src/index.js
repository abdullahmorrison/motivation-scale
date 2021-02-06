import React from 'react';
import ReactDOM from 'react-dom';
import Scale from './components/Scale';

const element = (
  <>
    <Scale />
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
)
ReactDOM.render(element, document.getElementById('root'));