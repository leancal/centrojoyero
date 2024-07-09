function openModal(imgElement) {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");

    modal.style.display = "flex";
    modalImg.src = imgElement.src;
    modalImg.style.maxWidth = "100%"; // Set a responsive width
    modalImg.style.maxHeight = "80vh"; // Set a responsive height
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// Close modal when clicking anywhere outside the image
document.getElementById("myModal").addEventListener("click", function(event) {
    if (event.target === this) {
        closeModal();
    }
});

