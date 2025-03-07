
        var nextBtn = document.querySelector('.next'),
            prevBtn = document.querySelector('.prev'),
            carousel = document.querySelector('.carousel'),
            list = document.querySelector('.list'),
            runningTime = document.querySelector('.carousel .timeRunning'),
            favoritesContainer = document.querySelector('.favorites-container'),
            favoritesGrid = document.querySelector('.favorites-grid'),
            fullScreenImage = document.getElementById('fullScreenImage');

        let timeRunning = 3000;
        let timeAutoNext = 6000;

        nextBtn.onclick = function () {
            showSlider('next');
        };
        prevBtn.onclick = function () {
            showSlider('prev');
        };

        let runTimeOut;
        let runNextAuto = setTimeout(() => {
            nextBtn.click();
        }, timeAutoNext);

        function resetTimeAnimation() {
            runningTime.style.animation = 'none';
            runningTime.offsetHeight;
            runningTime.style.animation = null;
            runningTime.style.animation = 'runningTime 6s linear 1 forwards';
        }

        function showSlider(type) {
            let sliderItemsDom = list.querySelectorAll('.carousel .list .item');
            if (type === 'next') {
                list.appendChild(sliderItemsDom[0]);
                carousel.classList.add('next');
            } else {
                list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
                carousel.classList.add('prev');
            }

            clearTimeout(runTimeOut);
            runTimeOut = setTimeout(() => {
                carousel.classList.remove('next');
                carousel.classList.remove('prev');
            }, timeRunning);

            clearTimeout(runNextAuto);
            runNextAuto = setTimeout(() => {
                nextBtn.click();
            }, timeAutoNext);
            resetTimeAnimation();
        }
        resetTimeAnimation();

        // Add Image Button Functionality
        document.getElementById('addImageBtn').addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default button behavior
            document.getElementById('imageUpload').click(); // Trigger the file input
        });

        // Handle Image Upload
        document.getElementById('imageUpload').addEventListener('change', function (event) {
            const files = event.target.files; // Get all selected files
            if (files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const newItem = document.createElement('div');
                        newItem.classList.add('item');
                        newItem.style.backgroundImage = `url(${e.target.result})`;
                        newItem.innerHTML = `
                            <div class="content">
                                <div class="btn">
                                    <button>Like</button>
                                    <button onclick="addToFavorites()">Add Favorite</button>
                                </div>
                            </div>
                        `;
                        list.appendChild(newItem);
                    };
                    reader.readAsDataURL(file);
                }
            }
        });

        // Add to Favorites Functionality
        function addToFavorites() {
            const currentItem = list.querySelector('.item:nth-child(2)'); // Get the currently displayed item
            const imageUrl = currentItem.style.backgroundImage.slice(5, -2); // Extract the image URL

            // Save the image URL to localStorage
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            favorites.push(imageUrl);
            localStorage.setItem('favorites', JSON.stringify(favorites));

            // Update the favorites grid
            updateFavoritesGrid();
        }

        // Toggle Favorites Container Visibility
        function toggleFavorites() {
            favoritesContainer.style.display = favoritesContainer.style.display === 'none' ? 'block' : 'none';
        }

        // Update Favorites Grid
        function updateFavoritesGrid() {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            favoritesGrid.innerHTML = ''; // Clear the grid
            favorites.forEach((imageUrl, index) => {
                const favoriteItem = document.createElement('div');
                favoriteItem.classList.add('favorite-item');
                favoriteItem.style.backgroundImage = `url(${imageUrl})`;
                favoriteItem.innerHTML = `
                    <button class="delete-btn" onclick="deleteFavorite(${index})">×</button>
                `;
                favoritesGrid.appendChild(favoriteItem);
            });
        }

        // Delete Favorite Functionality
        function deleteFavorite(index) {
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            favorites.splice(index, 1); // Remove the image at the specified index
            localStorage.setItem('favorites', JSON.stringify(favorites));
            updateFavoritesGrid(); // Update the favorites grid
        }

        // Load Favorites on Page Load
        updateFavoritesGrid();

        // Show Owner Image in Full Screen
        function showOwnerImage() {
            fullScreenImage.style.display = 'flex';
        }

        // Close Full Screen Image
        function closeFullScreenImage() {
            fullScreenImage.style.display = 'none';
        }
    
