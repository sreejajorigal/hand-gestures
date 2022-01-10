predection_1="";
predection_2="";
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");
function captureimage(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML="<img id='captureimage' src='"+data_uri+"'>";       
    });
    
}
console.log("ml5 version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/mf2neIlUd/model.json",modelLoaded);
function modelLoaded(){
    console.log("model Loaded");
}
function speak(){
    var synth=window.speechSynthesis;
    speak_1="the first prediction is "+predection_1;
    speak_2="and the second predection is "+predection_2;
    var utterThis =new SpeechSynthesisUtterance(speak_1+speak_2);
    synth.speak(utterThis);
}
function predictimage (){
    img=document.getElementById("captureimage");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        predection_1=results[0].label;
        predection_2=results[1].label;
        speak();
        if(results[0].label=="amazing"){
            document.getElementById("update_emoji").innerHTML="&#128076"
        }
        if(results[0].label=="best"){
            document.getElementById("update_emoji").innerHTML="&#128077"
        }
        if(results[0].label=="victory"){
            document.getElementById("update_emoji").innerHTML="&#9996"
        }
        if(results[1].label=="amazing"){
            document.getElementById("update_emoji2").innerHTML="&#128076"
        }
        if(results[1].label=="best"){
            document.getElementById("update_emoji2").innerHTML="&#128077"
        }
        if(results[1].label=="victory"){
            document.getElementById("update_emoji2").innerHTML="&#9996"
        }
    }
}
