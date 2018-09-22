var objImage;

//When text field is submitted generate a button! (using built in bootstrap to throw error if field empty)
$(".object-button").on("click", function(e) {
    e.preventDefault(); //DON'T REFRESH PAGE
    var object = $("#button-gen").val();    //get value in text field 
    console.log(object);
    $(".button-area").append("<button value="+object+" class='objecty'>"+object+"</button>"); //append button with value of object
    $("#button-gen").val("");
});

//when generated object button is pressed
$(".button-area").on("click",".objecty", function(e) {
    e.preventDefault(); //DON'T REFRESH PAGE
    var objectName = $(".objecty").val();    //get value in buttons
    console.log(objectName);
    // create URL for get request + field input
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=Z4v8bNQShUGV21HziHzyKa5Xx8fVH8sX&tag="+objectName;
    console.log(queryURL);
    // call to API using stored URL. We are receiving data call this TEN TIMES
    for(var i=0; i<10;i++) {
        $.ajax({
        url: queryURL,
        method: "GET"
        })

        // After the call is complete
        .then(function(response) {

        // store URL of cat image into a var
            var imageUrl = response.data.image_original_url;

            // create IMG tag to store obj 
            objImage = $("<img>");

            // add src and alt attribute to img tag
            objImage.attr("src", imageUrl);
            objImage.attr("alt", "object");

            // add id images to catImage img element
            $(".image-area").prepend(objImage);
        });
    }

});