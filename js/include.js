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

  const posts = [
      {
          title: "記事タイトル1",
          url: "/article1.html",
          image: "/images/article1.jpg",
          date: "2025/01/01"
      },
      {
          title: "記事タイトル2",
          url: "/article2.html",
          image: "/images/article2.jpg",
          date: "2025/01/10"
      }
  ];

  let index = 0;

  function updateSlideshow() {
      document.getElementById("slideshow").src = posts[index].image;
      document.getElementById("slideTitle").textContent = posts[index].title;
      document.getElementById("slideLink").href = posts[index].url;

      // ★追加：日付を反映
      document.getElementById("slideDate").textContent = posts[index].date;
  }

  setInterval(() => {
      index = (index + 1) % posts.length;
      updateSlideshow();
  }, 5000);

  updateSlideshow();

  // --- フッター読み込み ---
  fetch("/common/footer.html")
    .then(res => res.text())
    .then(html => {
      const processedHtml = html.replaceAll('href="../', 'href="').replaceAll('src="../', 'src="');
      document.body.insertAdjacentHTML("beforeend", processedHtml);
    });
});
