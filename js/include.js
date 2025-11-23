document.addEventListener("DOMContentLoaded", () => {
  // --- ヘッダー読み込み ---
  fetch("/common/header.html")
    .then(res => res.text())
    .then(html => {
      const processedHtml = html.replaceAll('href="../', 'href="').replaceAll('src="../', 'src="');
      document.body.insertAdjacentHTML("afterbegin", processedHtml);

      // --- スライド用要素 ---
      const imgElement = document.getElementById("slideshow");
      const linkElement = document.getElementById("slideLink");
      const titleElement = document.getElementById("slideTitle");

      if (!imgElement || !linkElement) return;

      // --- post-card.html からカード情報取得 ---
      fetch("/common/post-card.html")
        .then(res => res.text())
        .then(html => {
          const container = document.createElement("div");
          container.innerHTML = html;

          const items = Array.from(container.querySelectorAll(".item")).map(item => {
            const a = item.querySelector("a");
            const img = item.querySelector("img");
            const title = item.querySelector("p");
            return {
              href: a.getAttribute("href"),
              img: img.getAttribute("src"),
              title: title ? title.textContent : ""
            };
          });

          // --- 初期表示 ---
          let index = 0;
          imgElement.src = items[0].img;
          linkElement.href = items[0].href;
          titleElement.textContent = items[0].title;

          // --- スライド切り替え ---
          setInterval(() => {
            index = (index + 1) % items.length;

            imgElement.style.opacity = 0;

            setTimeout(() => {
              imgElement.src = items[index].img;
              linkElement.href = items[index].href;
              titleElement.textContent = items[index].title;
              imgElement.style.opacity = 1;
            }, 500);
          }, 5000); // 5秒ごとに切替
        });
    });

  // --- ポストカード本体の読み込み ---
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
