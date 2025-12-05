// src/main.js

async function loadLandingContent() {
  try {
    const response = await fetch(
      "http://localhost:1337/api/articles?populate=image"
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

    // Дістаємо елементи з DOM
    const donateTitle = document.getElementById("donate-title");
    const donateDesription = document.getElementById("donate-description");
    const donateImage = document.getElementById("donate-img");

    // Підставляємо текст
    if (donateTitle && data[0].title) {
      donateTitle.textContent = data[0].title;
    }

    if (donateDesription && data[0].content) {
      donateDesription.textContent = data[0].content;
    }

    // Підставляємо картинку
    if (donateImage && data[0].image && data[0].image.url) {
      // Strapi віддає шлях типу "/uploads/..."
      const baseUrl = "http://localhost:1337";
      const linkImg = data[0].image.url;

      donateImage.style.backgroundImage = `url(${baseUrl}${linkImg})`;

      console.log(`url(${baseUrl}${data[0].image.url})`);


    }
  } catch (error) {
    console.error("Error loading landing content:", error);
  }
}

// Запускаємо, коли DOM завантажений
window.addEventListener("DOMContentLoaded", () => {
  loadLandingContent();
});
