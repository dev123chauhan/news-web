const ApiKey = "4ae1cab4f18947adb088e6847e29ecde"; // Replace with your News API key
const latestStoriesUrl = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${ApiKey}`;
const articlesPerPage = 5;
const maxPageNumbersToShow = 5;
let currentPage = 1;
let articles = [];

fetch(latestStoriesUrl)
  .then((response) => response.json())
  .then((data) => {
    articles = data.articles;
    renderArticles();
    setupPagination();
  })
  .catch((error) => {
    console.error("Error fetching latest stories:", error);
    const latestStoriesContainer =
      document.getElementById("latest-stories");
    latestStoriesContainer.innerHTML =
      "<p>Error fetching latest stories. Please try again later.</p>";
  });

function renderArticles() {
  const latestStoriesContainer =
    document.getElementById("latest-stories");
  latestStoriesContainer.innerHTML = "";

  const start = (currentPage - 1) * articlesPerPage;
  const end = start + articlesPerPage;
  const currentArticles = articles.slice(start, end);

  currentArticles.forEach((article) => {
    const articleElement = document.createElement("div");
    articleElement.classList.add("large-12");

    articleElement.innerHTML = `
<article>
  <div class="row">
    <div class="large-6 columns">
      <img src="${
        article.urlToImage ||
        "https://placehold.it/600x370&text=Look at me!"
      }" alt="Article Image" class="roundedCorner">
    </div>
    <div class="large-6 columns">
      <h5><a class="titleColor" href="${article.url}" target="_blank">${
      article.title
    }</a></h5>
      <p class="textAlignment"><i class="fi-torso"></i> By ${
        article.author || "Unknown"
      } <span><i class="fi-calendar"></i> ${new Date(
      article.publishedAt
    ).toLocaleDateString()}</span> <span><i class="fi-comments"></i> 6 comments</span></p>
      <p class="desc">${article.description || "No description available"}</p>
    </div>
  </div>
</article>
<hr />
`;

    latestStoriesContainer.appendChild(articleElement);
  });

  const paginationHTML = `
<div class="pagination-container">
<button id="prev-page" ${
  currentPage === 1 ? "disabled" : ""
}>Previous</button>
<div id="page-numbers" class="page-numbers"></div>
<button id="next-page" ${
  currentPage === Math.ceil(articles.length / articlesPerPage)
    ? "disabled"
    : ""
}>Next</button>
</div>
`;

  latestStoriesContainer.innerHTML += paginationHTML;
  setupPagination();
}

function setupPagination() {
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const pageNumbersContainer = document.getElementById("page-numbers");
  pageNumbersContainer.innerHTML = "";

  const startPage = Math.max(
    1,
    currentPage - Math.floor(maxPageNumbersToShow / 2)
  );
  const endPage = Math.min(
    totalPages,
    startPage + maxPageNumbersToShow - 1
  );

  for (let i = startPage; i <= endPage; i++) {
    const pageNumberElement = document.createElement("span");
    pageNumberElement.innerText = i;
    pageNumberElement.classList.add("page-number");
    if (i === currentPage) {
      pageNumberElement.classList.add("active");
    }
    pageNumberElement.addEventListener("click", () => {
      currentPage = i;
      renderArticles();
      updatePagination();
    });
    pageNumbersContainer.appendChild(pageNumberElement);
  }

  updatePagination();
}

function updatePagination() {
  const pageNumbersContainer = document.getElementById("page-numbers");
  const pageNumbers = pageNumbersContainer.children;

  for (let i = 0; i < pageNumbers.length; i++) {
    pageNumbers[i].classList.remove("active");
    if (parseInt(pageNumbers[i].innerText) === currentPage) {
      pageNumbers[i].classList.add("active");
    }
  }

  document.getElementById("prev-page").disabled = currentPage === 1;
  document.getElementById("next-page").disabled =
    currentPage === Math.ceil(articles.length / articlesPerPage);
}

document.addEventListener("click", (event) => {
  if (event.target.id === "prev-page") {
    if (currentPage > 1) {
      currentPage--;
      renderArticles();
      updatePagination();
    }
  } else if (event.target.id === "next-page") {
    if (currentPage < Math.ceil(articles.length / articlesPerPage)) {
      currentPage++;
      renderArticles();
      updatePagination();
    }
  }
});
