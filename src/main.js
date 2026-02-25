// src/main.js
import 'normalize.css';
import './css/styles.css';
import { API_BASE_URL } from "./config";

const items = document.querySelectorAll('.donate_left_cT_item');
const donateTitle = document.getElementById("donate-title");
const donateDesription = document.getElementById("donate-description");
const donateImage = document.getElementById("donate-img");

// Menu button START
const btnMenu = document.querySelector(".hero_menu");
const heroNav = document.querySelector(".hero_nav");
const heroNavClose = document.querySelector(".hero_nav_menu");

btnMenu.addEventListener('click', function () {
  heroNav.classList.add("hero_nav_active");
});

heroNavClose.addEventListener('click', function () {
  heroNav.classList.remove("hero_nav_active");
});
// Menu button FINISH


let articles = null; // тут буде наш кеш

// 1) Один раз тягнемо всі статті і нормалізуємо
async function loadAllArticles() {
  if (articles) return articles; // вже є в памʼяті

  const res = await fetch(`${API_BASE_URL}/api/articles?populate=image`);
  if (!res.ok) {
    throw new Error("Failed to load articles: " + res.status);
  }

  const json = await res.json();
  const data = json.data || [];

  console.log(data);


  // Нормалізуємо структуру Strapi → в прості обʼєкти
  articles = data.map(item => {
    const attrs = item || {};
    const imgData = item.image.url;

    return {
      category: attrs.category || "",   // важливо: це має збігатися з data-category
      title: attrs.title || "",
      content: attrs.content || "",
      imageUrl: imgData || ""
    };
  });

  console.log(articles);


  console.log("Normalized articles:", articles);
  return articles;
}

// 2) Функція, яка оновлює DOM за категорією
async function loadCategory(category) {
  try {
    const list = await loadAllArticles();
    const article = list.find(a => a.category === category);

    if (!article) {
      console.warn("No article for category:", category);
      return;
    }

    if (donateTitle) donateTitle.textContent = article.title;
    if (donateDesription) donateDesription.textContent = article.content;

    if (donateImage) {
      if (article.imageUrl) {
        donateImage.style.backgroundImage = `url(${article.imageUrl})`;
      } else {
        donateImage.style.backgroundImage = "";
      }
    }
  } catch (err) {
    console.error("Error loading category", category, err);
  }
}

// 3) Вішаємо обробники
items.forEach(item => {
  item.addEventListener('click', () => {
    const category = item.dataset.category;
    loadCategory(category);
  });
});

// 4) Дефолтна категорія при завантаженні сторінки
window.addEventListener("DOMContentLoaded", () => {
  loadCategory("drones");
});

const hiro_wrapper = document.querySelector('.hiro_wrapper');
const start = 150;
const end = 700;

window.addEventListener('scroll', () => {
  let scroll = window.scrollY;

  let progress = (scroll - start) / (end - start);
  progress = Math.min(Math.max(progress, 0), 1);

  const scale = 1 + 0.7 * progress;
  const blur = 5 * progress;
  const brightness = 1 - 0.7 * progress;

  hiro_wrapper.style.transform = `scale(${scale})`;
  hiro_wrapper.style.filter = `
    blur(${blur}px)
    brightness(${brightness})
  `;
});


// function update() {
//   let scroll = window.scrollY;
//   scroll = Math.min(Math.max(scroll, 0), maxScroll);

//   const progress = scroll / maxScroll;

//   const blur = 5 * progress;

//   hiro_wrapper.style.filter = `
//     blur(${blur}px)
//   `;
// }