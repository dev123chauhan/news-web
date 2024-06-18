const apiKey = "4ae1cab4f18947adb088e6847e29ecde";
const apiUrl = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKey}`;

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const articles = data.articles;
    const newsContainer = document.getElementById("news-articles");
    newsContainer.innerHTML = "";

    articles.forEach((article) => {
      const articleElement = document.createElement("div");
      articleElement.classList.add("column");
      articleElement.innerHTML = `
              <img src="${
                article.urlToImage || "https://placehold.it/200x200"
              }" alt="Article Image" class="roundedCorner">
              <h5><a class="titleColor" href="${article.url}" target="_blank">${
        article.title
      }</a></h5>
              <p class="desc">${article.description || "No description available"}</p>
          `;
      newsContainer.appendChild(articleElement);
    });
  })
  .catch((error) => {
    console.error("Error fetching news:", error);
    const newsContainer = document.getElementById("news-articles");
    newsContainer.innerHTML =
      "<p>Error fetching news articles. Please try again later.</p>";
  });
   