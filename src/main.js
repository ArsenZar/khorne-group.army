// src/main.js
import 'normalize.css';
import './css/styles.css';
import { API_BASE_URL } from "./config";

const btnMenu = document.querySelector(".hero_menu");
const heroNav = document.querySelector(".hero_nav");
const heroNavClose = document.querySelector(".hero_nav_menu");

btnMenu.addEventListener('click', function () {
  heroNav.classList.add("hero_nav_active");
});

heroNavClose.addEventListener('click', function () {
  heroNav.classList.remove("hero_nav_active");
});

// donateActive



async function loadLandingContent() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/articles?sort=order:asc&populate=image`
    );

    if (!response.ok) {
      console.error("Failed to fetch landing page data");
      return;
    }

    const json = await response.json();
    const data = json.data;

    console.log(data);

    if (!data) {
      console.warn("No landing page data received");
      return;
    }

    const donateTitle = document.getElementById("donate-title");
    const donateDesription = document.getElementById("donate-description");
    const donateImage = document.getElementById("donate-img");

    if (donateTitle && data[0].title) {
      donateTitle.textContent = data[0].title;
    }

    if (donateDesription && data[0].content) {
      donateDesription.textContent = data[0].content;
    }

    if (donateImage && data[0].image && data[0].image.url) {
      const linkImg = data[0].image.url; // типу "/uploads/..."
      donateImage.style.backgroundImage = `url(${linkImg})`;
      console.log(`url(${API_BASE_URL}${data[0].image.url})`);
    }
  } catch (error) {
    console.error("Error loading landing content:", error);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadLandingContent();
});
