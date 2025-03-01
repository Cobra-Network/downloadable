document.addEventListener("DOMContentLoaded", function () {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Genesis</title>
    <link rel="stylesheet" href="https://downloadable.pages.dev/styles.css">
    <script defer src="https://downloadable.pages.dev/home.js"></script>
  </head>
  <body>
    <h1>Genesis Downloadable File</h1>

    <div class="buttons-container">
        <center>
            <a href="" class="button-link" target="_blank"><div class="button">Request a Game</div></a>
            <a href="" class="button-link" target="_blank"><div class="button">Request a Movie</div></a>
            <a href="" class="button-link" target="_blank"><div class="button">Report a Game</div></a>
            <a href="" class="button-link" target="_blank"><div class="button">Report a Movie</div></a>            
        </center>
    </div>

    <select id="content-selector">
      <option value="">Please select an option</option>
    </select>

    <p id="game-count">Game Count: 0</p>
    <p id="movie-count">Movie Count: 0</p>

    <div id="content-container">
      <iframe id="content-iframe" class="game" src="" scrolling="no"></iframe>
      <video id="content-video" class="game" controls>
        <track id="video-caption" kind="subtitles" srclang="en" label="English">
      </video>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
    <script>
        document.addEventListener("DOMContentLoaded", async function () {
          const selector = document.getElementById('content-selector');
          const iframe = document.getElementById('content-iframe');
          const video = document.getElementById('content-video');
          const captionTrack = document.getElementById('video-caption');
          const gameCountElement = document.getElementById('game-count');
          const movieCountElement = document.getElementById('movie-count');
      
          const gamesGroup = document.createElement('optgroup');
          gamesGroup.label = 'Games';
          const moviesGroup = document.createElement('optgroup');
          moviesGroup.label = 'Movies';
      
          let gameCount = 0;
          let movieCount = 0;
          let contentData = [];
      
          try {
            const response = await fetch('https://downloadable.pages.dev/data.json');
            contentData = await response.json();
      
            contentData.forEach((item, index) => {
              const option = document.createElement('option');
              option.value = index;
              option.textContent = item.title;
      
              if (item.type === 'game') {
                gamesGroup.appendChild(option);
                gameCount++;
              } else if (item.type === 'video') {
                moviesGroup.appendChild(option);
                movieCount++;
              }
            });
      
            selector.appendChild(gamesGroup);
            selector.appendChild(moviesGroup);
      
            gameCountElement.textContent = \`Game Count: \${gameCount}\`;
            movieCountElement.textContent = \`Movie Count: \${movieCount}\`;
          } catch (error) {
            console.error("Failed to load content data:", error);
          }
      
          selector.addEventListener('change', function (event) {
            const selectedIndex = event.target.value;
            if (selectedIndex === "") return;
      
            const selectedItem = contentData[selectedIndex];
      
            iframe.style.display = 'none';
            video.style.display = 'none';
            video.src = '';
            captionTrack.src = '';
      
            if (selectedItem.type === 'game') {
              iframe.src = selectedItem.src;
              iframe.style.display = 'block';
            } else if (selectedItem.type === 'video') {
              if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(selectedItem.src);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, function () {
                  hls.startLevel = hls.levels.length - 1;
                  hls.loadLevel = hls.levels.length - 1;
                  video.play();
                });
              } else {
                video.src = selectedItem.src;
                video.play();
              }
      
              if (selectedItem.captions) {
                captionTrack.src = selectedItem.captions;
                captionTrack.default = true;
                captionTrack.track.mode = "showing";
              } else {
                captionTrack.src = '';
                captionTrack.track.mode = "disabled";
              }
      
              video.style.display = 'block';
            }
          });
        });
    </script>      
  </body>
</html>`;

    document.body.innerHTML = htmlContent;
});
