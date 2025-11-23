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

  // --- マップ ---
  const articles = [
    {
      title: "渋谷カフェ巡り",
      url: "/blog/shibuya-cafe",
      lat: 35.6595,
      lng: 139.7005
    },
    {
      title: "新宿の最新スポット",
      url: "/blog/shinjuku-spot",
      lat: 35.6938,
      lng: 139.7034
    }
  ];
  function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: { lat: 35.6895, lng: 139.6917 } // 東京中心
    });

    // 記事ごとにマーカーを作成
    articles.forEach(article => {
      const marker = new google.maps.Marker({
        position: { lat: article.lat, lng: article.lng },
        map: map,
        title: article.title
      });

      // クリックしたら記事に飛ぶ
      marker.addListener("click", () => {
        window.location.href = article.url;
      });
    });
  }

  // --- フッター読み込み ---
  fetch("/common/footer.html")
    .then(res => res.text())
    .then(html => {
      const processedHtml = html.replaceAll('href="../', 'href="').replaceAll('src="../', 'src="');
      document.body.insertAdjacentHTML("beforeend", processedHtml);
    });
});
