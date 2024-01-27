const form  = document.querySelector('form');
const fileInput = form.querySelector(".file-input");
const progressArea = document.querySelector(".progress-area");
const uploadedArea = document.querySelector(".uploaded-area");

form.addEventListener('click',()=>{
    fileInput.click();
})