import { default as galleryItems } from "./gallery-items.js";

// console.table(galleryItems);
const body = document.querySelector('body');
const galleryRef = document.querySelector('.js-gallery');
const modalImgRef = document.querySelector('.lightbox__image');
const modalRef = document.querySelector('.js-lightbox');
const modalCloseBntRef = document.querySelector('[data-action="close-lightbox"]');
const modalOverlayRef = document.querySelector('.lightbox__overlay');
// const galleryItemsRef = document.querySelectorAll('.gallery__image');


const galleryItemsMarkup = galleryItems.map(galleryItem => {
    const imgRef = document.createElement('img');
    const anchorRef = document.createElement('a');
    const liRef = document.createElement('li');

    imgRef.classList.add('gallery__image');
    imgRef.src = galleryItem.preview;
    imgRef.dataset.source = galleryItem.original;
    imgRef.dataset.index = ''
    imgRef.alt = galleryItem.description;

    anchorRef.classList.add('gallery__link');
    anchorRef.href = galleryItem.original
    imgRef.dataset.index = ''
    anchorRef.append(imgRef)

    liRef.classList.add('gallery__item');
    liRef.append(anchorRef)
    return liRef
})
  
function onGalleryItemClick(event) {
    event.preventDefault()
    if(event.target.nodeName !== 'IMG') {
        return
    };
    modalImgRef.src = event.target.dataset.source
    modalImgRef.alt = event.target.alt
    modalRef.classList.add('is-open')
    window.addEventListener('keydown', onEscPress)
}

function closingModal(event) {
    modalRef.classList.remove('is-open')
    modalImgRef.src = '#'
    modalImgRef.alt = ''
    window.removeEventListener('keydown', onEscPress)
}

function onEscPress(event) {
    if (event.code === 'Escape')
    closingModal()
   
}

function setIndex (array) { 
    for( let i = 0; i < array.length; i +=1) {
        array[i].dataset.index = i;
        console.log(array[i].dataset.index);
    }
}

galleryRef.append(...galleryItemsMarkup)

const galleryLinksRef = document.querySelectorAll('.gallery__link');
setIndex(galleryLinksRef)

galleryRef.addEventListener('click', onGalleryItemClick)
modalCloseBntRef.addEventListener('click', closingModal)
modalOverlayRef.addEventListener('click', (event)=> {
    if (event.target.nodeName !== 'DIV'){ 
        return
    } 
        closingModal()
})






