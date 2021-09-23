function setup(){
    canvas = createCanvas(450, 450)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}
song = "";

function play(){
   song.play()
   song.setVolume(1)
   song.rate(1)
}
function modelLoaded(){
    console.log('Posenet is ready')
}
scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX = 0 
rightWristX = 0
leftWristY = 0
rightWristY = 0

function preload(){
    song = loadSound("hp.mp3") 
     
}
function draw(){
    image(video, 0, 0, 450, 450)
    fill("red")
    stroke("red")

    if (scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20)
        IntheNumberof = Number(leftWristY)
        remove_decimals = floor(IntheNumberof)
        volume = remove_decimals/500;
        document.getElementById("results_volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume)

    }
    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20)
        if(rightWristY >0 && rightWristY<100){
            document.getElementById("results_speed").innerHTML = "Speed = 0.5X"
            song.rate(0.5)
        }
        if(rightWristY >100 && rightWristY<200){
            document.getElementById("results_speed").innerHTML = "Speed = 1X"
            song.rate(1)
        }
        if(rightWristY >200 && rightWristY<300){
            document.getElementById("results_speed").innerHTML = "Speed = 1.5X"
            song.rate(1.5)
        }
        if(rightWristY >300 && rightWristY<400){
            document.getElementById("results_speed").innerHTML = "Speed = 2X"
            song.rate(2)
        }
        if(rightWristY >400){
            document.getElementById("results_speed").innerHTML = "Speed = 2.5X"
            song.rate(2.5)
        }
    }
}
function gotPoses(results){
    if (results.length > 0){
console.log(results)
scoreLeftWrist = results[0].pose.keypoints[9].score;
scoreRightWrist = results[0].pose.keypoints[10].score;
console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist)
rightWristX = results[0].pose.rightWrist.x
leftWristX = results[0].pose.leftWrist.x
rightWristY = results[0].pose.rightWrist.y
leftWristY = results[0].pose.leftWrist.y
console.log("leftWristY = "+ leftWristY+ "rightWristY = " + rightWristY + "rightWristX = " + rightWristX + "leftwristX = "+ leftWristX)

    }
}
