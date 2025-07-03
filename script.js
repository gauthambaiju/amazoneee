let data = null;
let displayData = [];
let filters = {
    stars: 0,
    brands: new Set(),
    price: [165, 145500],
};
const brands = document.querySelectorAll(".main-content .left .brand-checkbox");

const container = document.querySelector(
    ".main-content .right .right-inner .right-inner-2"
);

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

const firstPart = `<div class="desc">
                        <h2>Results</h2>
                        <p>Check each product page for other buying options.</p>
                    </div>`;

const lastPart = `<div class="pagination-container">
                        <div class="pagination-strip">
                            <div class="previous disabled">
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" focusable="false" aria-hidden="true"><path d="M5.874.35a1.28 1.28 0 011.761 0 1.165 1.165 0 010 1.695L3.522 6l4.113 3.955a1.165 1.165 0 010 1.694 1.28 1.28 0 01-1.76 0L0 6 5.874.35z"></path></svg>
                                    Previous
                                </p>
                            </div>
                            <div class="selected">1</div>
                            <div>2</div>
                            <div>3</div>
                            <div class="disabled">...</div>
                            <div class="disabled">33</div>
                            <div class="next">
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" focusable="false" aria-hidden="true"><path d="M2.126.35a1.28 1.28 0 00-1.761 0 1.165 1.165 0 000 1.695L4.478 6 .365 9.955a1.165 1.165 0 000 1.694 1.28 1.28 0 001.76 0L8 6 2.126.35z"></path></svg>
                                    Next
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="help-container">
                        <div class="help">
                            <h2>Need help?</h2>
                            <p>Visit the help section or contact us</p>
                        </div>
                    </div>`;

let middlePart = "";

(async function () {
    try {
        const response = await fetch("data.json");
        data = await response.json();
    } catch (err) {
        console.error(err);
    }

    for (let key in data) {
        data[key].forEach((productDetails) => {
            displayData.push(productDetails);
        });
    }
    setData();
    container.innerHTML = `${firstPart}${middlePart}${lastPart}`;

    brands.forEach((brand) => {
        brand.addEventListener("change", (event) => {
            if (event.target.checked) {
                filters.brands.add(event.target.value);
            } else {
                filters.brands.delete(event.target.value);
            }
            if (filters.brands.size > 0) {
                displayData = [];
                // try debugging here
                for (let brand of filters.brands) {
                    data[brand].forEach((productDetails) => {
                        displayData.push(productDetails);
                    });
                }
            }
            console.log("Workingggg");
            console.log(filters.brands);
            middlePart = "";
            setData();
            container.innerHTML = `${firstPart}${middlePart}${lastPart}`;
        });
    });

    function setData() {
        for (let i of displayData) {
            const {
                title,
                numReviews,
                numBuys,
                originalPrice,
                discountedPrice,
                deliveryDetails,
                isPrime,
                imagePath,
                rating,
            } = i;

            middlePart += `<div class="card-container">
                        <div class="card-container-2">
                            <div class="card">
                                <div class="img-container">
                                    <div class="img-wrapper">
                                        <img src="${imagePath}" alt="">
                                    </div>
                                </div>
                                <div class="desc-container">
                                    <div class="title-container">
                                        <h2>${title}</h2>
                                    </div>
                                    <div class="review-container">
                                        <div class="product-stars-wrapper">
                                            <a class="product-stars">
                                                <i class="star-img"></i>
                                                <i class="down-arrow"></i>
                                            </a>
                                            <a class="review-number">${numReviews}</a>
                                        </div>
                                        <div class="buy-container">
                                            <a class="buys-number">
                                                <p>${numBuys}</p>
                                            </a>
                                        </div>
                                        <div class="price-wrapper">
                                            <div class="price-container">
                                                <span id="p1">&#8377;</span>
                                                <span id="p2">${Number(
                                                    discountedPrice
                                                ).toLocaleString()}</span>
                                                <span id="p3">M.R.P:</span>
                                                <span id="p4">&#8377;${Number(
                                                    originalPrice
                                                ).toLocaleString()}</span>
                                                <span id="space"></span>
                                                <span id="p5">(35% off)</span>
                                            </div>
                                            <span>Up to 5% back with Amazon Pay ICICI card</span>
                                        </div>
                                        <div class="delivery-wrapper">
                                            <div class="prime-logo-container">
                                                <i class="prime-logo"></i>
                                            </div>
                                            <div class="delivery-details d1">
                                                <span class="text-1">${
                                                    deliveryDetails[0]
                                                }</span>
                                                <span class="text-2">${
                                                    deliveryDetails[1]
                                                }</span>
                                            </div>
                                            <div class="delivery-details d2">
                                                <span class="text-1">${
                                                    deliveryDetails[2]
                                                }</span>
                                                <span class="text-2">${
                                                    deliveryDetails[3]
                                                }</span>
                                            </div>
                                            <div class="cart-button-container">
                                                <button class="cart-button">Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        }
    }

    // console.log(JSON.stringify(displayData, null, 2));
})();
