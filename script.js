
var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'),
    runningTime = document.querySelector('.carousel .timeRunning');

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
                        <button>Add Favorate</button>
                    </div>
                    </div>
                `;
                list.appendChild(newItem);
            };
            reader.readAsDataURL(file);
        }
    }
});