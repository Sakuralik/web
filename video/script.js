document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('myVideo');

    // You can add additional functionality here, e.g., play/pause on click, custom controls, etc.
});
document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('myVideo');

    // Get the play/pause button element
    var playPauseButton = document.getElementById('playPauseButton');

    // Add a click event listener to the play/pause button
    playPauseButton.addEventListener('click', function () {
        if (video.paused) {
            video.play();
            playPauseButton.innerHTML = 'Pause'; // Change button text to 'Pause'
        } else {
            video.pause();
            playPauseButton.innerHTML = 'Play'; // Change button text to 'Play'
        }
    });

    // Update the button text when the video is played or paused
    video.addEventListener('play', function () {
        playPauseButton.innerHTML = 'Pause';
    });

    video.addEventListener('pause', function () {
        playPauseButton.innerHTML = 'Play';
    });
});
