// const open_menu = document.querySelector(".fa-solid fa-bars"); // Fixed typo here
// const close_menu = document.querySelector(".fa-solid fa-x");
// const nav_active = document.querySelectorAll(".side_menu");

// open_menu.addEventListener('click', ()=>{
//     nav_active.forEach((x) => {
//         x.classList.add('active');
//     });
// });

/* Implement of the News API */

const apikey = '7fe7f2756bad485eb046cea605948e4a';
const blogContainer = document.getElementById("blog-container");
const searchInput = document.getElementById("serch-input");
const searchButton = document.getElementById("search-button");

async function CountryTopHeadline(){

    try{ 
        const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}&pageSize=20`;
        const response = await fetch(url);
        const data = await response.json();
        return data.articles;
    }catch(err){
   console.error("Getting error after url call" , err);
   return[];
    }

}

function displayNews(articles){
    blogContainer.innerHTML = "";
    articles.forEach(article => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const image = document.createElement("img");
        image.src = article.urlToImage;
        image.alt = article.title;
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0,30) + "...." : article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        const truncatedDescription = article.description.length > 100 ? article.description.slice(0,100) + "...." : article.description;
        description.textContent = truncatedDescription;
        const link = document.createElement("a");
        link.href = article.url;
        link.textContent = 'Click on the url for more info';


blogCard.appendChild(image);
blogCard.appendChild(title);
blogCard.appendChild(description);
blogCard.addEventListener("click",  ()=>{
   window.open(article.url, "_blank");    
});
blogCard.appendChild(link);
blogContainer.appendChild(blogCard);
    });
}

searchButton.addEventListener("click", async ()=>{
    const query = searchInput.value.trim();
    if(query !== ""){
        try{
      const article = await fetchNewsQuery(query);
      displayNews(article);
        }catch(error){
      console.error("Receiving error at the time of fetching data", error);
        }
    }
})

 async function fetchNewsQuery(query){
    try{
     const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2024-03-11&sortBy=publishedAt&apiKey=${apikey}`;
     const response = await fetch(apiUrl);
     const data = await response.json();
     return data.articles;
    }catch(error){
console.error("Receiving error from the API at the of fetching the data",error);
    }
 }

(async ()=>{
    try{
const articles = await CountryTopHeadline();
displayNews(articles);
    }catch(err){
        console.error("Getting error after url call" , err);
    }
})();