document.addEventListener("DOMContentLoaded", () => {
  // ヘッダーを読み込み
  fetch("/common/header.html")
    .then(res => res.text())
    .then(html => {
      const processedHtml = html.replaceAll('href="../', 'href="').replaceAll('src="../', 'src="');
      document.body.insertAdjacentHTML("afterbegin", processedHtml);
      
fetch("/common/post-card.html")
  .then(res => res.text())
  .then(html => {
    // 仮のコンテナに入れて DOM として扱う
    const container = document.createElement("div");
    container.innerHTML = html;

fetch("/common/post-card.html")
  .then(res => res.text())
  .then(html => {
    // 仮のコンテナに入れて DOM として扱う
    const container = document.createElement("div");
    container.innerHTML = html;

    // .item ごとに情報を取得
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

    return items;
  })
  .then(items => {
    // スライドショーに反映
    const imgElement = document.getElementById("slideshow");
    const linkElement = document.getElementById("slideLink");
    const titleElement = document.getElementById("slideTitle"); // タイトル用

    if (!imgElement || !linkElement) return;

    let index = 0;

    // 初期表示
    imgElement.src = items[0].img;
    linkElement.href = items[0].href;
    if (titleElement) titleElement.textContent = items[0].title;

    // ループで切り替え
    setInterval(() => {
      index = (index + 1) % items.length;

      imgElement.style.opacity = 0;

      setTimeout(() => {
        imgElement.src = items[index].img;
        linkElement.href = items[index].href;
        if (titleElement) titleElement.textContent = items[index].title;
        imgElement.style.opacity = 1;
      }, 500);
    }, 5000); // 5秒ごとに切替
  });



  // ポストカード読み込み
  console.log("post-card fetch start");
  fetch("/common/post-card.html")
    .then(res => res.text())
    .then(html => {
      console.log("post-card loaded!");
      document.querySelector("#postcard")?.insertAdjacentHTML("beforeend", html);
    });

    
  // フッターを読み込み
  fetch("/common/footer.html")
    .then(res => res.text())
    .then(html => {
      const processedHtml = html.replaceAll('href="../', 'href="').replaceAll('src="../', 'src="');
      document.body.insertAdjacentHTML("beforeend", processedHtml);
    });
});
