document.addEventListener("DOMContentLoaded", () => {
  // --- ヘッダー読み込み ---
  fetch("/common/header.html")
    .then(res => res.text())
    .then(html => {
      const processedHtml = html.replaceAll('href="../', 'href="').replaceAll('src="../', 'src="');
      document.body.insertAdjacentHTML("afterbegin", processedHtml);

      const imgElement = document.getElementById("slideshow");
      const linkElement = document.getElementById("slideLink");
      const titleElement = document.getElementById("slideTitle");
      const dateElement = document.getElementById("slideDate");
      if (!imgElement || !linkElement) return;

      // --- 投稿カード情報取得 ---
      fetch("/common/post-card.html")
        .then(res => res.text())
        .then(html => {
          const container = document.createElement("div");
          container.innerHTML = html;

          const slides = Array.from(container.querySelectorAll(".item")).map(item => ({
            href: item.querySelector(".card-images a").href,
            img: item.querySelector(".card-images img").src,
            title: item.querySelector(".card-text p").textContent,
            date: item.querySelector(".card-date")?.textContent.trim() || ""
          }));

          let index = 0;

          const updateSlide = () => {
            // フェードアウト
            imgElement.style.opacity = 0;

            setTimeout(() => {
              const slide = slides[index];
              imgElement.src = slide.img;
              linkElement.href = slide.href;
              titleElement.textContent = slide.title;
              dateElement.textContent = slide.date;
              // フェードイン
              imgElement.style.opacity = 1;
            }, 500);

            index = (index + 1) % slides.length;
          };

          // 初期表示
          updateSlide();

          // 5秒ごとに切替
          setInterval(updateSlide, 5000);
        });
    });

  // --- ポストカード本体を読み込み ---
  fetch("/common/post-card.html")
    .then(res => res.text())
    .then(html => {
      document.querySelector("#postcard")?.insertAdjacentHTML("beforeend", html);
    });

  // --- フッター読み込み ---
  fetch("/common/footer.html")
    .then(res => res.text())
    .then(html => {
      const processedHtml = html.replaceAll('href="../', 'href="').replaceAll('src="../', 'src="');
      document.body.insertAdjacentHTML("beforeend", processedHtml);
    });
});
