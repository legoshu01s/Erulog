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

      // --- post-card.html から情報取得 ---
      fetch("/common/post-card.html")
        .then(res => res.text())
        .then(html => {
          const container = document.createElement("div");
          container.innerHTML = html;

          // ★ card-date を含む item 構造に完全対応
          const items = Array.from(container.querySelectorAll(".item")).map(item => {
            return {
              href: item.querySelector(".card-images a").getAttribute("href"),
              img: item.querySelector(".card-images img").getAttribute("src"),
              title: item.querySelector(".card-text p").textContent,
              date: item.querySelector(".card-date").textContent.trim()
            };
          });

          let index = 0;

          function updateSlide() {
            imgElement.style.opacity = 0;

            setTimeout(() => {
              imgElement.src = items[index].img;
              linkElement.href = items[index].href;
              titleElement.textContent = items[index].title;
              dateElement.textContent = items[index].date; // ★日付反映

              imgElement.style.opacity = 1;
            }, 500);
          }

          // 初期表示
          updateSlide();

          // 5秒ごと切替
          setInterval(() => {
            index = (index + 1) % items.length;
            updateSlide();
          }, 5000);
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
