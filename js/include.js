document.addEventListener("DOMContentLoaded", () => {
  // ヘッダーを読み込み
  fetch("header.html")
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML("afterbegin", html);

      // ヘッダー内スライドショーのスクリプト
      const images = [
        "images/maintenance.jpeg",
        "images/gadget-insta360x4.jpg"
      ];

      let index = 0;
      const imgElement = document.getElementById("slideshow");

      if (imgElement) {
        setInterval(() => {
          index = (index + 1) % images.length;
          imgElement.style.opacity = 0;

          setTimeout(() => {
            imgElement.src = images[index];
            imgElement.style.opacity = 1;
          }, 500);
        }, 10000);
      }
    });
    
  // フッターを読み込み
  fetch("footer.html")
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML("beforeend", html);
    });
});
