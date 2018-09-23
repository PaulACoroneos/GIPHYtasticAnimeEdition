# GIPHYtasticAnimeEdition

This web app is anime themed. On page load an initial list of anime characters is created as HTML button elements. When the user presses one of the buttons 10 images with that search tag are requested from the GIPHY API using the search endpoint. These images are then displayed in bootstrap cards with information such as GIF title and GIF rating.

The user can then continue clicking name buttons. 10 GIF's will get appended to the previous set of GIFs. Additionally the user can type a term into the text input and create a new button. This button will function like the previously generated buttons.

## TODO

Need to make the GIF's anime/un-animate on click of the GIF card
Need to have the capability to one click download (add button to each card and functionality onclick
Add persistence so user buttons are saved in local storage
