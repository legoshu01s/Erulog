document.addEventListener("DOMContentLoaded", () => {
  // ヘッダーを読み込み
  fetch("/common/header.html")
    .then(res => res.text())
    .then(html => {
      const processedHtml = html.replaceAll('href="../', 'href="').replaceAll('src="../', 'src="');
      document.body.insertAdjacentHTML("afterbegin", processedHtml);
      
// スライド画像
const images = [
  "images/maintenance.jpeg",
  "images/gadget-insta360x4.jpg",
  "images/html-css-javascript1.png",
  "images/test1s.png"
];

// 各スライドのリンク先
const links = [
  "index.html",
  "insta360-x4.html",
  "html-css-javascript.html",
  "desk-introduce.html"
];

let index = 0;

const imgElement = document.getElementById("slideshow");
const linkElement = document.getElementById("slideLink");

if (imgElement && linkElement) {
  setInterval(() => {
    index = (index + 1) % images.length;

    // フェードアウト
    imgElement.style.opacity = 0;

    setTimeout(() => {
      imgElement.src = images[index];   // 画像変更
      linkElement.href = links[index];  // リンク変更
      imgElement.style.opacity = 1;     // フェードイン
    }, 500);
  }, 10000);
}
    });

  // ポストカード読み込み
  fetch("/common/post-card.html")
  .then(res => res.text())
  .then(html => {
    const processedHtml = html.replaceAll('href="../', 'href="').replaceAll('src="../', 'src="');
    document.querySelector("#postcard")?.insertAdjacentHTML("beforeend", processedHtml);
  });
    
  // フッターを読み込み
  fetch("/common/footer.html")
    .then(res => res.text())
    .then(html => {
      const processedHtml = html.replaceAll('href="../', 'href="').replaceAll('src="../', 'src="');
      document.body.insertAdjacentHTML("beforeend", processedHtml);
    });
});
