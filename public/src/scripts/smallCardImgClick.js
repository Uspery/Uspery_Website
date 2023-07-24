const articleCards = document.querySelectorAll('.article-card');

const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');

articleCards.forEach(articleCard => {
    console.log(articleCard)
    articleCard.addEventListener('click', () => {
        const imgElement = articleCard.querySelector('img');

        if (imgElement) {
            const imgSrc = imgElement.getAttribute('src');
            
            imageModal.style.display = 'block';
            modalImage.src = imgSrc;
        }
    });
});

imageModal.addEventListener('click', () => {
    imageModal.style.display = 'none';
});
