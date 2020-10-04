# ivyhacks3D
Custom 3D world conferencing software using Babylon.js for a more interactive, community-based education and/or event experience.


Inspiration: As high schoolers ourselves, we've experienced first-hand the lack of community that virtual learning brings. We found that virtual learning wasn't very engaging for students and it lacked a sense of community and connectivity. We wanted to bridge this gap/divide by re-imagining the classroom environment. By taking advantage of the current situation and using at-home learning to transform the way classes are taught.

What it does: IntR-Connect transforms the classroom into a VR-Chat style environment, with multiplayer and VR compatibility, the UUID linking system to have private rooms for users. 

How I built it: We wanted IntR-Connect to be as lightweight as possible, so we used the Babylon.js game engine

Challenges we ran into: As this was our first time working with such a huge stack, we ran into major troubles with everything basically: the physics engine, VR integration, player movement, loading models, backend database, and the frontEnd GUI.

Accomplishments that I'm proud of: accomplishments we are proud of was that we were actually able to deliver a semi-working product. We're happy that we were at least able to make a proof-of-concept to show the true potential of our project.

What I Learned: We learned a lot about game engines, database connectivity, multiplayer integration, and VR implementation. Google Firebase was awesome, we used Google Cloud Firestore to upload player positions, worlds, players, and more. We both were inexperienced with backend so being able to learn it with the documentation was awesome. We also learned about 3D Web Apps with Babylon. js live updates based on changes to the data base.

At one point our code was executing out of order so we had to learn about async and await which solved a lot of those problems.

I want to stress how cool, but also how much we learned about Firebase. Super cool, sometimes very stressful :D.

Other cool features: Google Maps 3D and capture the 3D mesh and textures using Renderdoc to import to Blender, etc. import any model and textures into our program.

The Future of IC:

We want to eventually make our own 3D Models for our program to load hyper-realistic designs for classrooms. We plan to use Google Map 3D to export their meshes and textures and import these models into our program, allowing us to potentially import any 3D model from anywhere on the planet.

https://www.forbes.com/sites/marksparrow/2020/08/07/why-do-we-suffer-from-zoom-fatigue-its-all-about-the-sound/#463ebe454d87

We tried implementing 3D Spatial Audio for voice chat, and although this doesn't work the way we want it to in our implementation so far, we are really focused on having this, because sound can play a hugeeeee role in immersion.

Another feature we planned on implementing is a group feature, allowing teachers to easily make students go into groups for projects and STILL be in the classroom with Spatial audio in the background to make it easier for teachers to do this sort of thing and provide a realistic environment for students. (We've witnessed the troubles of google meet "group projects")

IBM Text to Speech - Real time Closed captions would be awesome Motion Control, Hand and Head Tracking - We have this working, just not fully implemented yet. Something we looked into was 3D modeling with a webcam with facial feature recognition. Super cool possibility, seems somewhat doable if its server side computing.

Conclusion: Our main goal with this project is to both "interconnect" people and make the educational environment (or for businesses) more communal, but at the same time immerse people in realities they can't get in real life (while making the technology accessible to everyone, thanks to WebVR and lightweight frameworks). The possibilities for learning, communication, or going to new places with this project is infinite.

