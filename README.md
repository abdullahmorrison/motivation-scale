<h1><img width=400 src="https://github.com/abdullahmorrison/motivation-scale/assets/49528805/1963ecbb-16de-44f8-bd7c-1a81ddd29770" /></h1>

<p>A mindfulness tool that helps users visualize a mental framework for how their motivation affects the emotions (and vice versa).</p>

## What problem does this solve?
***This tool prevents your emotions from getting in the way of your goals through self-awareness. Here's an example:***
<p>
  In University, I was procrastinating studying for a test I had the following day. When I could not put it off any longer and started to study, I realized that I vastly underestimated how much studying I needed to do.
</p>
<p>
  That put me into the following anxiety death-spiral:
</p>
<br/>
<div align="center">
  <img width=600 src="https://github.com/user-attachments/assets/d57e411d-e229-4fe0-af85-3c5d58401b1f" />
</div>
<br/>
<p>
  This went on for hours without any studying being accomplished until I just gave up and decided to got to sleep and accept whatever grade I got. That caused me evaluate all the ways my emotions can effect the way I pursue my goals, which caused me to create a framework for understanding this so that scenerio never happens again. That framework is called the Motivation Scale!
</p>
<p>
  The framework was helpful, but it was difficult to keep track of all my goals and their correlation to my mood, so I created this tool to do that.
</p>

[Here is a guide to use this tool.](https://github.com/abdullahmorrison/motivation-scale/blob/main/guide.md) 

## Tech Stack

| Global | Website  | Server | Mobile  |
| ------ | -------- | ------ | ------- |
| <img width=50 src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png"/> <img width=50 src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png"/> | <img width=50 src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/5f8c622c-c217-4649-b0a9-7e0ee24bd704"/>   <img width=50 src="https://user-images.githubusercontent.com/25181517/192158956-48192682-23d5-4bfc-9dfb-6511ade346bc.png"/> |  <img width=50 src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png"/>  <img width=50 src="https://user-images.githubusercontent.com/25181517/187955005-f4ca6f1a-e727-497b-b81b-93fb9726268e.png"/> | <img width=50 src="https://github.com/abdullahmorrison/motivation-scale/assets/49528805/380c3bf3-bcd9-49f5-8f72-520d20acd295"/>  <img width=100 src="https://github.com/abdullahmorrison/motivation-scale/assets/49528805/5aa3fd8d-e5f1-448c-a902-8f78ce6a06e8"/> | 


## Architecture Diagram
![image](https://github.com/user-attachments/assets/1682727e-3949-4122-8396-8885ddf0dafc)

# Local Setup
Clone the repo
```
git clone https://github.com/abdullahmorrison/motivation-scale.git
```
## Server & DB
The server and database is set up with docker

Install docker desktop (https://docs.docker.com/desktop/)

run `docker compose up` to start the server and spin up the db.

> [!NOTE]  
> You can view the data using [mongodb compass](https://www.mongodb.com/docs/compass/current/install/)

## Website
Navigate to the `/website` directory and install dependencies
```
npm install
```
run `npm run dev` to run the website

## Mobile
Install android studio (https://developer.android.com/studio/install)

Set up your react native expo environment (https://reactnative.dev/docs/set-up-your-environment)

Navigate to the `/mobile` directory and install dependencies
```
npm install
```
run `npm start` to run the app
