let capture;
let posenet;
let noseX,noseY;
let reyeX,reyeY;
let leyeX,leyeY;
let singlePose,skeleton;
let actor_img;
let gafas,piruleta;

function setup() {  // this function runs only once while running
    createCanvas(800, 500);
    //console.log("setup funct");
    capture = createCapture(VIDEO);
    capture.hide();

    //load the PoseNet model
    posenet = ml5.poseNet(capture, modelLOADED);
    //detect pose
    posenet.on('pose', recievedPoses);

    actor_img = loadImage('images/shahrukh.png');
    gafas = loadImage('images/gafas.png');
    piruleta = loadImage('images/piruleta.png');
}

function recievedPoses(poses) {
    console.log(poses);

    if(poses.length > 0) {
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLOADED() {
    console.log("model has loaded");
}
function draw() { // this function code runs in infinite loop
    
    // images and video(webcam)
    image(capture, 0, 0);
    fill(255, 0, 0);
    
    if(singlePose) {
        for(let i=0; i<singlePose.keypoints.length; i++) {
            ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y, 20);
        }

        stroke(255, 255, 255);
        strokeWeight(5);

        for(let j=0; j<skeleton.length; j++) {
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y);
        }

        // Apply gafas and piruleta
        image(gafas, singlePose.nose.x, singlePose.nose.y, 100, 100);
        image(piruleta, singlePose.nose.x-35, singlePose.nose.y+28, 50, 50);
    }
  }
