let saturate = document.querySelector('#saturate')
let contrast = document.querySelector('#contrast')
let brightness = document.querySelector('#brightness')
let sepia = document.querySelector('#sepia')
let grayscale = document.querySelector('#grayscale')
let blur = document.querySelector('#blur')
let hueRotate = document.querySelector('#hue-rotate')

let upload = document.querySelector("#upload")
let download = document.querySelector("#download")
let settings = document.querySelector(".download-settings")
let ok = document.querySelector(".done")
let radio = document.querySelectorAll("input[type='radio']")

let img = document.querySelector("#img")
// canvas 
let photo = document.getElementById("photo")
let ctx = photo.getContext("2d");


let reset=document.querySelector("#reset")
let imgBox = document.querySelector(".img-box")

function resetValue() { 
    img.style.filter = 'none'
    saturate.value='100'
    contrast.value ='100'
    brightness.value = '100'
    sepia.value = '0'
    grayscale.value = '0'
    blur.value = '0'
    hueRotate.value = '0'
}

window.onload = function() {
    download.style.display = 'none'
    reset.style.display = 'none'
    imgBox.style.display = 'none'
}
upload.onchange = function () { 
    resetValue()
    download.style.display = 'block'
    reset.style.display = 'block'
    imgBox.style.display = 'block'
    settings.classList.remove("hidden");
    let file = new FileReader()
    file.readAsDataURL(upload.files[0])
    file.onload = function () { 
        img.src = file.result
    }
   img.onload = function () { 
        photo.width = img.width
        photo.height = img.height
        ctx.drawImage(img, 0, 0, photo.width, photo.height)
        img.style.display = 'none';
    }
}

let filters = document.querySelectorAll("ul li input")
filters.forEach( filter => {
    filter.addEventListener("input",function(){
        ctx.filter = `
            saturate(${saturate.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value})
            blur(${blur.value}px)
            hue-rotate(${hueRotate.value}deg)
        `
        ctx.drawImage(img, 0, 0, photo.width, photo.height)
    })
} )

var whatChecked = 'png';
download.onclick = function () { 
    // download.href = img.src // wrong -- this will download the source image without filters
    // download.href = photo.toDataURL() // png
    let alert = document.querySelector("#alert")
    
    if(download.href == ""){
        // alert("")
        alert.style.visibility = "visible"
        setTimeout(function () { 
            alert.style.visibility = "hidden"
        },2000)
    }
}

radio.forEach(r =>{
    
    r.onchange = function (e) { 
        whatChecked =  e.target.id || ''
        whatChecked === "png"  ? download.href = photo.toDataURL() : download.href = photo.toDataURL('image/jpeg')
    }
    
})
// ok.onclick = function () { 
//     if(whatChecked){
        
//     }
// }