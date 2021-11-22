import {constants} from "/js/lib/constants.js";
import * as Thumbnail from "/js/lib/thumbnail-functions.js";
import {showTumbnail} from "/js/lib/thumbnail-functions.js";

document.addEventListener("DOMContentLoaded", () => {
    const thumbnailImage = document.querySelector("#" + constants.THUMBNAILINPUT);
    const thumbnailPreview = document.querySelector("#" + constants.THUMBNAILPREVIEW);
    const thumbnailTarget = document.querySelector("#" + constants.THUMBNAILTARGET);
    const thumbnailCropper = document.querySelector("#" + constants.THUMBNAILCROPPER);
    const cropContainer = document.querySelector("#" + constants.CROPCONTAINER);

    const hideButton = document.querySelector("#" + constants.HIDEBUTTON);

    const editForm = document.querySelector("#" + constants.EDITFORM);
    const submitButton = document.querySelector("#" + constants.SUBMITBUTTON);
    const cropButton = document.querySelector("#" + constants.CROPBUTTON);

    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    let croppedImage = undefined;
    let fileType = undefined;
    let cropper = undefined;
    thumbnailImage.addEventListener("input", (evt) => {
        console.log("halo");
        const file = thumbnailImage.files[0];
        if (file) {
            fileType = file['type'];
            if (validImageTypes.includes(fileType)) {
                croppedImage = file;
                console.log(croppedImage);
                if (cropper) {
                    cropper.destroy();
                }

                hideButton.addEventListener("click", () => {
                    Thumbnail.hideCropper(cropContainer);
                })
                Thumbnail.hideCropper(thumbnailTarget);
                Thumbnail.showCropper(cropContainer);
                Thumbnail.showCropper(thumbnailCropper);
                thumbnailPreview.src = URL.createObjectURL(file);
                cropper = new Cropper(thumbnailPreview);


            } else {
                console.log("file is not image");
            }
        }
    })
    cropButton.addEventListener("click", () => {
        Thumbnail.hideCropper(thumbnailCropper);
        Thumbnail.showCropper(thumbnailTarget);

        croppedImage = cropper.getCroppedCanvas();

        showTumbnail(croppedImage, thumbnailTarget);
        if (cropper) {
            cropper.destroy();
        }
    })

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        saveImage(fileType, croppedImage);
    // .then(response => response.json()).then(data => console.log(data))
    })

});

async function saveImage(imageType, canvas) {
    let canvasData = undefined;
    if (canvas.nodeName === "CANVAS") {
        canvasData = canvas.toDataURL(imageType);
        sendImage(imageType, canvasData)
    } else {
        const reader = new FileReader();
        reader.readAsDataURL(canvas);
        reader.addEventListener("load", function () {
            // convert image file to base64 string
            canvasData = reader.result;
            return sendImage(imageType, canvasData)
        }, false);
    }

}

async function sendImage(imageType, canvasData){
    const url = "https://heishi.balsk-development.site/action-page.php";
    return await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            type: '.' + imageType.split('/')[1],
            thumbnail: canvasData,
        }),
    });
}