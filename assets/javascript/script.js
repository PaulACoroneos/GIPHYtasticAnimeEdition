var objImage;
var topics = ["naruto","kurosaki","inuyasha","kinomoto","yugioh","luffy","Midoriya"]

//okay lets render initial buttons
for(var i =0; i<topics.length;i++) {
    var button = $("<button>");
    button.attr("value",topics[i]);
    button.addClass('objecty mr-1 ml-1');
    button.text(topics[i]);
    $(".button-area").append(button);
}

//When text field is submitted generate a button! (using built in bootstrap to throw error if field empty)
$(".object-button").on("click", function(e) {
    e.preventDefault(); //DON'T REFRESH PAGE
    var object = $("#button-gen").val();    //get value in text field 
    if(object.length >0) {  //is it not empty
        console.log(object);
        var button = $("<button>");
        button.addClass("objecty ml-1 mr-1");
        button.text(object);
        button.attr("value",object);
        $(".button-area").append(button);
        $("#button-gen").val("");
    }
});

//when generated object button is pressed
$(".button-area").on("click",".objecty", function(e) {
    e.preventDefault(); //DON'T REFRESH PAGE
    var objectName = $(this).val();    //get value in buttons
    console.log(objectName);
    // create URL for get request + field input
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Z4v8bNQShUGV21HziHzyKa5Xx8fVH8sX&q="+objectName+"&limit=150";
    console.log(queryURL);
    // call to API using stored URL. Only call the API once!
    
    $.ajax({
    url: queryURL,
    method: "GET"
    })

    // After the call is complete
    .then(function(response) {
        console.log(response);

        for(var i=0; i<10;i++) {

            //rando = Math.floor(Math.random()*99)+1; //generate random result from GET request

            // store URL of cat image into a var
            var imageUrl = response.data[i].images.original.url;    //location of gif in giphy
            var imgRating =response.data[i].rating;  //grab rating from JSON 

            console.log(imgRating);
            var card = $("<div>");  //div to hold card
            card.addClass("card mb-1");
            card.attr("style","width: 18rem");

            var img = $("<img>");   //hold img
            img.addClass("card-img-top p-1");
            img.attr("src",imageUrl);
            img.attr("alt","giphy photo");

            var cardBody = $("<div>");
            cardBody.addClass("card-body");

            var cardText = $("<p>");
            cardText.addClass("card-text");
            cardText.text("Rating: "+imgRating);

            //put together card
            cardBody.append(cardText);
            card.append(img);
            card.append(cardBody);


            // add id images to catImage img element
            $(".image-area").prepend(card);
        }
    });


});