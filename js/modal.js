const modal = document.querySelector('.modal');
const openBtn = document.querySelector('#btn-get');
const closeBtn = document.querySelector('.modal_close');

const modalClose = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}
const modalOpen = () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

openBtn.onclick = modalOpen;

closeBtn.onclick = modalClose;

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modalClose();
    }
});

setTimeout(() => {
    modalOpen();
}, 10000);


const showModalByScroll = () => {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 5) {

        modalOpen();
        window.removeEventListener('scroll', showModalByScroll);
    }
};

window.addEventListener('scroll', showModalByScroll);