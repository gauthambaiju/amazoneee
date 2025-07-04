let data = null;
let displayData = [];
let displayDataCopy = [];
let filters = {
    stars: 1,
    brands: new Set(),
    price: [165, 145100],
};
const starsMap = {
    "1.0": "-18px -400px",
    1.5: "-18px -400px",
    "2.0": "-18px -400px",
    2.5: "-34px -400px",
    "3.0": "-18px -400px",
    3.5: "-18px -400px",
    "4.0": "-210px -468px",
    4.5: "-2px -400px",
    "5.0": "-194px -468px",
};

const minPriceSlider = document.querySelector(
    ".main-content .left .price-slider .lower"
);
const maxPriceSlider = document.querySelector(
    ".main-content .left .price-slider .upper"
);

const minPriceLabel = document.querySelector(
    ".main-content .left .price-container #min-price"
);
const maxPriceLabel = document.querySelector(
    ".main-content .left .price-container #max-price"
);

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

let middlePart = "";

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

(async function () {
    try {
        const response = await fetch("data.json");
        data = await response.json();
    } catch (err) {
        console.error(err);
    }

    for (let key in data) {
        displayData.push(...data[key]);
        displayDataCopy.push(...data[key]);
    }

    function setDisplayData() {
        for (let productDetails of displayData) {
            let {
                title,
                numReviews,
                numBuys,
                originalPrice,
                discountedPrice,
                deliveryDetails,
                isPrime,
                imagePath,
                rating,
            } = productDetails;

            numReviews = Number(numReviews).toLocaleString();
            discountedPrice = Number(discountedPrice);
            originalPrice = Number(originalPrice);
            let discountPercentage = Math.ceil(
                ((originalPrice - discountedPrice) / originalPrice) * 100
            );
            discountedPrice = discountedPrice.toLocaleString();
            originalPrice = originalPrice.toLocaleString();

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
                                                <i class="star-img" style="background-position: ${
                                                    starsMap[rating]
                                                };"></i>
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
                                                <span id="p2">${discountedPrice}</span>
                                                <span id="p3">M.R.P:</span>
                                                <span id="p4">&#8377;${originalPrice}</span>
                                                <span id="space"></span>
                                                <span id="p5">(${discountPercentage}% off)</span>
                                            </div>
                                            <span>Up to 5% back with Amazon Pay ICICI card</span>
                                        </div>
                                        <div class="delivery-wrapper">
                                            ${
                                                isPrime
                                                    ? `<div class="prime-logo-container">
                                                            <i class="prime-logo"></i>
                                                        </div>`
                                                    : ``
                                            }
                                            
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

    function filterDisplayData() {
        displayData = [...displayDataCopy];

        if (filters.brands.size > 0) {
            displayData = [];
            for (let brand of filters.brands) {
                if (data[brand]) {
                    displayData.push(...data[brand]);
                }
            }
        }

        displayData = displayData.filter(
            (productDetails) => Number(productDetails.rating) >= filters.stars
        );

        displayData = displayData.filter((productDetails) => {
            return (
                Number(productDetails.discountedPrice) >= filters.price[0] &&
                Number(productDetails.discountedPrice) <= filters.price[1]
            );
        });
    }

    function updateDisplayData() {
        middlePart = "";
        filterDisplayData();
        setDisplayData();
        container.innerHTML = `${firstPart}${middlePart}${lastPart}`;
    }

    updateDisplayData();

    brands.forEach((brand) => {
        brand.addEventListener("change", (event) => {
            if (event.target.checked) {
                filters.brands.add(event.target.value);
            } else {
                filters.brands.delete(event.target.value);
            }
            updateDisplayData();
        });
    });

    ones.forEach((element) => {
        element.addEventListener("click", () => {
            stars.forEach((star) => (star.style.display = "none"));
            oneStar.style.display = "block";
            filters.stars = 1;
            updateDisplayData();
        });
    });
    twos.forEach((element) => {
        element.addEventListener("click", () => {
            stars.forEach((star) => (star.style.display = "none"));
            twoStar.style.display = "block";
            filters.stars = 2;
            updateDisplayData();
        });
    });
    threes.forEach((element) => {
        element.addEventListener("click", () => {
            stars.forEach((star) => (star.style.display = "none"));
            threeStar.style.display = "block";
            filters.stars = 3;
            updateDisplayData();
        });
    });
    fours.forEach((element) => {
        element.addEventListener("click", () => {
            stars.forEach((star) => (star.style.display = "none"));
            fourStar.style.display = "block";
            filters.stars = 4;
            updateDisplayData();
        });
    });
    fives.forEach((element) => {
        element.addEventListener("click", () => {
            stars.forEach((star) => (star.style.display = "none"));
            fiveStar.style.display = "block";
            filters.stars = 5;
            updateDisplayData();
        });
    });

    minPriceSlider.addEventListener("input", (event) => {
        minPriceLabel.textContent = `₹${event.target.value.toLocaleString(
            "en-US"
        )}`;
        filters.price[0] = Number(event.target.value);
    });
    maxPriceSlider.addEventListener("input", (event) => {
        maxPriceLabel.textContent = `₹${event.target.value.toLocaleString(
            "en-US"
        )}`;
        filters.price[1] = Number(event.target.value);
    });

    minPriceSlider.addEventListener("change", () => {
        updateDisplayData();
    });
    maxPriceSlider.addEventListener("change", () => {
        updateDisplayData();
    });
})();
