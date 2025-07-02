let data = null;

async function fetchData() {
    try {
        const response = await fetch("data.json");
        data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}

(async function () {
    data = await fetchData();
    console.log(JSON.stringify(data, null, 2));
})();

const stars = document.querySelectorAll(
    ".main-content .rating-container .stars"
);

const oneStar = document.querySelector(".main-content .one-star.stars");
const twoStar = document.querySelector(".main-content .two-star.stars");
const threeStar = document.querySelector(".main-content .three-star.stars");
const fourStar = document.querySelector(".main-content .four-star.stars");
const fiveStar = document.querySelector(".main-content .five-star.stars");

const ones = document.querySelectorAll(".main-content .rating-container .one");
const twos = document.querySelectorAll(".main-content .rating-container .two");
const threes = document.querySelectorAll(
    ".main-content .rating-container .three"
);
const fours = document.querySelectorAll(
    ".main-content .rating-container .four"
);
const fives = document.querySelectorAll(
    ".main-content .rating-container .five"
);

ones.forEach((element) => {
    element.addEventListener("click", () => {
        stars.forEach((star) => {
            star.style.display = "none";
        });
        oneStar.style.display = "block";
    });
});
twos.forEach((element) => {
    element.addEventListener("click", () => {
        stars.forEach((star) => {
            star.style.display = "none";
        });
        twoStar.style.display = "block";
    });
});
threes.forEach((element) => {
    element.addEventListener("click", () => {
        stars.forEach((star) => {
            star.style.display = "none";
        });
        threeStar.style.display = "block";
    });
});
fours.forEach((element) => {
    element.addEventListener("click", () => {
        stars.forEach((star) => {
            star.style.display = "none";
        });
        fourStar.style.display = "block";
    });
});
fives.forEach((element) => {
    element.addEventListener("click", () => {
        stars.forEach((star) => {
            star.style.display = "none";
        });
        fiveStar.style.display = "block";
    });
});
