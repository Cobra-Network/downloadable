document.addEventListener("DOMContentLoaded", function () {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Genesis</title>
    <link rel="stylesheet" href="https://downloadable.pages.dev/styles.css">
    <script src="https://downloadable.pages.dev/new.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
  </head>
  <body>
    <h1>Genesis Downloadable File</h1>
    <center>
      <div class="dropdown">
          <button onclick="toggleDropdown()" class="dropbtn">Select a Game or Movie <span class="arrow">▼</span></button>
          <div id="myDropdown" class="dropdown-content">
            <input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()">
            <div id="games-section">
              <div class="section-title">Games</div>
            </div>
            <div id="movies-section">
              <div class="section-title">Movies</div>
            </div>
          </div>
      </div>
    </center>

    <p id="game-count">Game Count: 0</p>
    <p id="movie-count">Movie Count: 0</p>

    <div id="content-container">
      <iframe id="content-iframe" class="game" src="" scrolling="no"></iframe>
      <video id="content-video" class="game" controls>
        <track id="video-caption" kind="subtitles" srclang="en" label="English">
      </video>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", async function () {
          const dropdown = document.getElementById('myDropdown');
          const gamesSection = document.getElementById('games-section');
          const moviesSection = document.getElementById('movies-section');
          const iframe = document.getElementById('content-iframe');
          const video = document.getElementById('content-video');
          const captionTrack = document.getElementById('video-caption');
          const gameCountElement = document.getElementById('game-count');
          const movieCountElement = document.getElementById('movie-count');

          let gameCount = 0;
          let movieCount = 0;
          let contentData = [];

          try {
            const response = await fetch('https://downloadable.pages.dev/data.json');
            contentData = await response.json();

            localStorage.setItem("contentData", JSON.stringify(contentData));
            
            contentData.forEach((item, index) => {
              const option = document.createElement('a');
              option.textContent = item.title;
              option.href = "#";
              option.onclick = function() { selectContent(index); };

              if (item.type === 'game') {
                gamesSection.appendChild(option);
                gameCount++;
              } else if (item.type === 'video') {
                moviesSection.appendChild(option);
                movieCount++;
              }
            });

            gameCountElement.textContent = `Game Count: ${gameCount}`;
            movieCountElement.textContent = `Movie Count: ${movieCount}`;
          } catch (error) {
            console.error("Failed to load content data:", error);
          }
        });

        function toggleDropdown() {
            const dropdown = document.getElementById("myDropdown");
            const arrow = document.querySelector(".arrow");
            dropdown.classList.toggle("show");
            arrow.classList.toggle("open");
        }

        function filterFunction() {
            var input, filter, div, a, i;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            div = document.getElementById("myDropdown");
            a = div.getElementsByTagName("a");
            for (i = 0; i < a.length; i++) {
                txtValue = a[i].textContent || a[i].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    a[i].style.display = "";
                } else {
                    a[i].style.display = "none";
                }
            }
        }

        function selectContent(index) {
    const contentData = JSON.parse(localStorage.getItem("contentData"));
    if (!contentData || !contentData[index]) return;

    const selectedItem = contentData[index];
    const dropbtn = document.querySelector('.dropbtn');
    
    // Update the button text to reflect the selected content
    dropbtn.innerHTML = `${selectedItem.title} <span class="arrow">▼</span>`;

    document.getElementById("content-iframe").style.display = 'none';
    document.getElementById("content-video").style.display = 'none';
    document.getElementById("content-video").src = '';
    document.getElementById("video-caption").src = '';

    if (selectedItem.type === 'game') {
        document.getElementById("content-iframe").src = selectedItem.src;
        document.getElementById("content-iframe").style.display = 'block';
    } else if (selectedItem.type === 'video') {
        if (selectedItem.src.endsWith(".m3u8")) {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(selectedItem.src);
                hls.attachMedia(document.getElementById("content-video"));
            } else {
                document.getElementById("content-video").src = selectedItem.src;
            }
        } else {
            document.getElementById("content-video").src = selectedItem.src;
        }
        document.getElementById("content-video").style.display = 'block';
        document.getElementById("content-video").play();
    }

    document.getElementById("myDropdown").classList.remove("show");
    document.querySelector(".arrow").classList.remove("open");
}
    </script>
  </body>
</html>
`;

    // Inject the HTML content into the body of the page
    document.body.innerHTML = htmlContent;
});
