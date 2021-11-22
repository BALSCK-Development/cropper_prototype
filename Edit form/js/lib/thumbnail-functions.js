export function showCropper(cropper) {
    cropper.style.display = "block";
}

export function hideCropper(cropper) {
    cropper.style.display = "none";
}

export function showTumbnail(thumbnail, thumbnailTarget) {
    thumbnailTarget.innerHTML = "";
    thumbnailTarget.appendChild(thumbnail);
    thumbnailTarget.style.display = "block";
}
