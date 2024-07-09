function openModal(imgElement) {
    var modal = document.getElementById("myModal");
	var img = document.getElementById('myImg');
    var modalImg = document.getElementById("img01");
	var span = document.getElementsByClassName("close")[0];

    modal.style.display = "flex";
    modalImg.src = imgElement.src;
    modalImg.style.maxWidth = "100%"; // Set a responsive width
    modalImg.style.maxHeight = "80vh"; // Set a responsive height
	
	img.onclick = function(){
            modal.style.display = "block";
            modalImg.src = this.src;
            document.body.style.overflow = 'hidden'; // Line 8: Disable scroll when modal is opened
}
	span.onclick = function() {
            modal.style.display = "none";
            document.body.style.overflow = 'auto'; // Line 13: Enable scroll when modal is closed
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

