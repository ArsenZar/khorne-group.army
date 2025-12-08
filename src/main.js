// src/main.js
import 'normalize.css';
import './css/styles.css';
import { API_BASE_URL } from "./config";

const items = document.querySelectorAll('.donate_left_cT_item');

items.forEach(item => {
  item.addEventListener('click', () => {
    const category = item.dataset.category;
    loadCategory(category);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  loadCategory("drones"); // або будь-яка дефолтна
});

async function loadCategory(category) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/articles?filters[category][$eq]=${category}&populate=image`
    );



    const json = await response.json();
    const data = json.data;

    if (!data || !data.length) {
      console.warn("No data for this category:", category);
      return;
    }

    const article = data[0];


    const donateTitle = document.getElementById("donate-title");
    const donateDesription = document.getElementById("donate-description");
    const donateImage = document.getElementById("donate-img");

    // Текст
    donateTitle.textContent = article.title;
    donateDesription.textContent = article.content;

    // Картинка
    const imgUrl = data[0].image.url;
    console.log(imgUrl);

    if (imgUrl) {
      donateImage.style.backgroundImage = `url(${imgUrl})`;
    }

  } catch (err) {
    console.error("Error loading category:", category, err);
  }
}
