const tabBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');

let currentIndex = 0;

const hideBlocks = () => {
    tabBlocks.forEach(item => item.style.display = 'none');
    tabs.forEach(item => item.classList.remove('tab_content_item_active'));
};

const showBlock = (index = 0) => {
    tabBlocks[index].style.display = 'block';
    tabs[index].classList.add('tab_content_item_active');
};

hideBlocks();
showBlock(currentIndex);

tabsParent.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() === 'button') {
        tabs.forEach((item, index) => {
            if (event.target === item) {
                currentIndex = index;
                hideBlocks();
                showBlock(currentIndex);
            }
        });
    }
});

setInterval(() => {
    currentIndex++;
    if (currentIndex >= tabBlocks.length) {
        currentIndex = 0;
    }
    hideBlocks();
    showBlock(currentIndex);
}, 2000);


const somInput = document.querySelector("#som");
const usdInput = document.querySelector("#usd");
const eurInput = document.querySelector("#eur");

const requester = (method, url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();

    xhr.onload = () => {
        if (xhr.status === 200) {
            callback(JSON.parse(xhr.response));
        } else {
            console.error("Ошибка запроса:", xhr.status);
        }
    };
};

const convertor = (element) => {
    element.addEventListener("input", () => {
        requester("GET", "../data/converter.json", (data) => {

            if (element.value === "") {
                somInput.value = "";
                usdInput.value = "";
                eurInput.value = "";
                return;
            }

            if (element.id === "som") {
                usdInput.value = (element.value / data.usd).toFixed(2);
                eurInput.value = (element.value / data.eur).toFixed(2);
            }

            if (element.id === "usd") {
                somInput.value = (element.value * data.usd).toFixed(2);
                eurInput.value = ((element.value * data.usd) / data.eur).toFixed(2);
            }

            if (element.id === "eur") {
                somInput.value = (element.value * data.eur).toFixed(2);
                usdInput.value = ((element.value * data.eur) / data.usd).toFixed(2);
            }
        });
    });
};

convertor(somInput);
convertor(usdInput);
convertor(eurInput);



const btnNext = document.querySelector("#btn-next")
const btnPrev = document.querySelector("#btn-prev")
const card = document.querySelector(".card")
let cardId = 1

function getData(id) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${cardId}`)
        .then(res => res.json())
        .then(data => {
            const {title, id,completed} = data;
            card.innerHTML = `
            <p>${title}</p>
            <p>${completed}</p>
            <span> ${id}</span>
            `
        })
}
btnNext.onclick = () => {
    cardId = cardId >= 200 ? 1 : cardId +1;
    getData(cardId)
}

btnPrev.onclick = () => {
    cardId = cardId <= 1 ? 200 : cardId - 1;
    getData(cardId)
}
getData()



function getPosts() {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
        .then(res => res.json())
        .then(data => {
        console.log(data)
    })
}
getPosts()
