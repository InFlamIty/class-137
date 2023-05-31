video = ""
status = ""
resultsArray = []
function preload()
{
    video = createVideo("video.mp4")
    video.hide()
}
function setup()
{
    canvas = createCanvas(600 , 500)
    canvas.center()
}
function draw()
{
    image(video , 0 , 0 , 600 , 500)
    if (status != "") {
        objectDetector.detect(video , gotResults)
        for (let i = 0; i < resultsArray.length; i++) {
            document.getElementById("detectedNum").innerHTML = "there are " + resultsArray.length + " detected figures"
            document.getElementById("status").innerHTML = "objects have been detected"

            fill("yellow")
            percent = floor(resultsArray[i].confidence * 100)
            text(resultsArray[i].label + percent + "%" , resultsArray[i].x , resultsArray[i].y)
            noFill()
            stroke("yellow")
            rect(resultsArray[i].x , resultsArray[i].y , resultsArray[i].width , resultsArray[i].height)
        }
    }
}
function start()
{
    document.getElementById("status").innerHTML = "Detecting"
    objectDetector = ml5.objectDetector("cocossd" , modellaoded)
}
function modellaoded()
{
    console.log("if ur reading this, the code probably worked and it did not corrupt all the files in ur pc :)")
    status = true
    video.loop()
    video.volume(0)
    video.speed(1)
}
function gotResults(error , results)
{
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        resultsArray = results
    }
}