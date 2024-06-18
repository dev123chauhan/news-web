(function () {
    const apiKeyTrending = "4ae1cab4f18947adb088e6847e29ecde";
    const apiUrlTrending = `https://newsapi.org/v2/everything?q=trending&apiKey=${apiKeyTrending}`;
    let trendingArticles = [];
    let trendingCurrentIndex = 0;
    const trendingItemsPerPage = 6;
  
    function fetchTrendingPosts() {
      fetch(apiUrlTrending)
        .then((response) => response.json())
        .then((data) => {
          trendingArticles = data.articles;
          displayTrendingArticles();
        })
        .catch((error) => {
          console.error("Error fetching news:", error);
          const trendingPostsContainer =
            document.getElementById("trending-posts");
          trendingPostsContainer.innerHTML =
            "<p>Error fetching trending posts. Please try again later.</p>";
        });
    }
  
    // function displayTrendingArticles() {
    //   const trendingPostsContainer = document.getElementById("trending-posts");
    //   const nextTrendingArticles = trendingArticles.slice(
    //     trendingCurrentIndex,
    //     trendingCurrentIndex + trendingItemsPerPage
    //   );
    //   nextTrendingArticles.forEach((article) => {
    //     const mediaObject = document.createElement("div");
    //     mediaObject.classList.add("media-object");
  
    //     let imgSection = "";
    //     if (article.urlToImage) {
    //       imgSection = `
    //           <div class="media-object-section">
    //             <img class="thumbnail" src="${article.urlToImage}" alt="Article Image">
    //           </div>
    //         `;
    //     }
  
    //     mediaObject.innerHTML = `
    //         ${imgSection}
    //         <div class="media-object-section">
    //           <h5><a href="${article.url}" target="_blank">${article.title}</a></h5>
    //         </div>
    //       `;
    //     trendingPostsContainer.appendChild(mediaObject);
    //   });
    //   trendingCurrentIndex += trendingItemsPerPage;
  
    //   // Hide the "Load more" button if there are no more articles to load
    //   if (trendingCurrentIndex >= trendingArticles.length) {
    //     document.getElementById("load-more").style.display = "none";
    //   }
    // }

    function displayTrendingArticles() {
        const trendingPostsContainer = document.getElementById("trending-posts");
        const nextTrendingArticles = trendingArticles
          .slice(trendingCurrentIndex, trendingCurrentIndex + trendingItemsPerPage)
          .filter(article => !article.title.includes("[Removed]")); // Filter out articles with specific criteria (e.g., title includes "[Removed]")
      
        nextTrendingArticles.forEach((article) => {
          const mediaObject = document.createElement("div");
          mediaObject.classList.add("media-object");
      
          let imgSection = "";
          if (article.urlToImage) {
            imgSection = `
                <div class="media-object-section">
                  <img class="thumbnail" src="${article.urlToImage}" alt="Article Image">
                </div>
              `;
          }
      
          mediaObject.innerHTML = `
              ${imgSection}
              <div class="media-object-section">
                <h5><a class="titleColor" href="${article.url}" target="_blank">${article.title}</a></h5>
              </div>
            `;
          trendingPostsContainer.appendChild(mediaObject);
        });
        trendingCurrentIndex += trendingItemsPerPage;
      
        // Hide the "Load more" button if there are no more articles to load
        if (trendingCurrentIndex >= trendingArticles.length) {
          document.getElementById("load-more").style.display = "none";
        }
      }
      
  
    document
      .getElementById("load-more")?.addEventListener("click", displayTrendingArticles);
  
    // Fetch and display the initial set of articles
    fetchTrendingPosts();
  })();
  