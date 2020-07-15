console.warn('Project 3');

let newsBox = document.getElementById('accordion');

api = 'Your Key';

const xhr = new XMLHttpRequest();
xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=in&apiKey=${api}`, true);

function showNews(){
    xhr.onload = function () {
        if (this.status === 200) {
            let json = JSON.parse(this.responseText);
            articles = json.articles;
            let newsHtml = '';
            articles.forEach(function (element, index) {
                let con = element['content'] ;
                if(element['content'] == null){
                    con = element['description'];
                    if(con == null){
                        con = element['title'] + '. Visit the given site to read more..';
                    }
                }
                let image = element['urlToImage'];
                if(image==null){
                    image = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS1iKPijPolDCEWyx9OnscOFqrxgkjEvdX6Gg&usqp=CAU";
                }
                let html = `
                <div class="card" id="card">
                    <div class="card-header" id="heading${index}">
                        <h5 class="mb-0">
                            <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse${index}"
                                aria-controls="collapse${index}">
                                <span class="badge badge-primary">News${index + 1}:</span>
                                <p>${element['title']}</p>
                            </button>
                        </h5>
                    </div>
                    <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#accordion">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-4">
                                    <img src="${image}" style="height: 200px; width: 300px;"></img></div>
                                <div class="col-md-8">
                                ${con}<br><a href="${element['url']}" target="_blank">Read more..</a><br>
                                <b>Published At: </b>${element['publishedAt']}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                newsHtml += html;
            });
            newsBox.innerHTML = newsHtml;
        }
        else {
            console.log('OOPS !! Some error occured');
        }
    }
}

showNews();

xhr.send();

let search = document.getElementById('searchTxt');
search.addEventListener('input', function(){
    let text = search.value.toLowerCase();
    let card = document.getElementsByClassName('card');
    Array.from(card).forEach(function(element){
        cardText = element.innerText.toLowerCase();
        if(cardText.includes(text)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    });
    showNews();
})