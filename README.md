[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/HpplOQZx)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14993365&assignment_repo_type=AssignmentRepo)
# 2024 MDDN342 Assignment 3
## Development
For this project, I was tasked with building on the ideas of Project 2 to create parameterised faces that respond to face tracking data and intrinsic facial properties.

I initially explored the idea of generating a "censored" pixelation effect beneath some facial expressions that would sample colours from the canvas. This would create faces that interact with the background image, something like an Instagram filter, but I was unable to make it work correctly.

I didn't want to spend too much time trying to fix it, so I went back to the original faces I had created in Project 2. The structure of the provided code was very similar to my code from Project 2, so I was able to transfer my code quickly, only having to clean up minor dependencies.
## Faces
My faces already had a particular visual style, and I didn't want the complexity of the face-tracking data to spoil it. The expressions are largely unchanged from how they appear in Project 2. I adjusted the positioning of my faces to react to the faces while not precisely mimicking them.

For instance, tracking points on the nose are used to determine the orientation of the face. This data is then used to flip the nose to face the correct direction, and make the central features of my faces glide across the face in response. The eyes glide more than the nose and the mouth, and are spaced out based on the eye distance of the tracking data, giving the face its own unique way of "looking" at things.

To add some interactivity to my faces, especially when applying the faces in real-time with the camera, I made use of my dynamic facial expressions from Project 2. Each set of eyes and mouths has two states, one in a neutral expression, and one in an excited expression. In Project 2, faces would switch between two expressions as they grew larger and smaller. For this project, my code uses the provided face-tracking data to switch expressions when the mouth is opened or closed, adding some personality to the way that the faces are tracked.

My faces in Project 2 randomly selected qualities like hair, eyes, nose, and mouth from a discrete collection of functions. Since the code in this project is object-oriented, using random values didn't work correctly and would generate the same kind of face for each person, outside of the trained values. I solved this by sampling positions from the chin segments of the face tracking data, and manipulating them to produce pseudo-random numbers instead.

While this would break the real-time video mode and wouldn't yield different faces when the same face tracking positions are applied to multiple faces (such as in the Training Quiz mode), it would produce varied expression for each face image. I combined this with a random seed that is generated at the beginning of the code to produce different faces for each image each time the page is reloaded.
## Training
In terms of training, I selected three facial properties that were visually apparent: gender identity, skin tone, and estimated age. I chose them because my faces from Project 2 are not very complicated and don't have many specific qualities to tie to real face qualities. It also gave my faces the opportunity to respond to the training data in unique ways.

Gender identity is used to determine the colour of the face: cool colours for a feminine appearance, and warm colours for a masculine appearance. This was simple to implement as my code from Project 2 already included these colours in the palette, so all I needed to do was separate them into two palettes and select one based on the gender identity.

The skin tone is used to determine the overall lightness of the skin tone. To implement this, I mapped the estimated skin tone value to the vertical axis of my colour palette, becoming darker as the value decreases, and lighter as the value increases. This let me represent a variety of skin tones while remaining true to my faces' visual style.

The age is used to determine what hair style is used. By default, all faces use a pseudo-random selection from a discrete set of hair styles. The estimated age value ranges between 0 and 1. If the value exceeds 0.7, the hair is drawn white instead of whatever colour was decided prior. If the value exceeds 0.85, no hair is drawn at all.
## Final Touches
The visual style of my faces was inspired by video game Wilmot's Warehouse, a game about sorting and stocktaking, so my first sample image is of a worker taking stock. The person's face is not directly facing the camera, so it shows off how the face orientation responds to the face data. Source: https://primestrategies.co.nz/how-to-stocktaking/

I was also inspired by the works of Geoff McFetridge who's artwork takes on a similar style. He also worked on, so my second sample image is depicts him posing with his artwork. Source: https://www.cbc.ca/arts/geoff-mcfetridge-drawing-a-life-dan-covert-interview-1.7022566

I wanted to show off the different expressions that each face can switch between, so my third sample image is a stock photo of two women with a happy and sad expression, respectively. The face code correctly identifies the open and closed mouths and switches between expressions appropriately. It also shows off how the skin colour is different based on gender identity as the other two sample images depict men. Source: https://www.shutterstock.com/image-photo/closeup-portrait-young-people-women-one-184575812

For my animated background, my code from Project 1 ported over effortlessly and didn't need any adjustments aside from a few lines of code needed in and around the `setup` function.