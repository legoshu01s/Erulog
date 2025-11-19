document.addEventListener("DOMContentLoaded", () => {
  // ヘッダーを読み込み
  fetch("header.html")
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML("afterbegin", html);
      
// HTML エスケープ関数
function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// ページ読み込み時に rawCode の内容を反映
document.addEventListener("DOMContentLoaded", () => {
    const raw = document.getElementById("rawCode").textContent;
    document.getElementById("escapedOutput").innerText = escapeHtml(raw.trim());
});

// コピー機能
function copyCode(button) {
    const code = button.nextElementSibling.innerText;
    navigator.clipboard.writeText(code).then(() => {
        button.innerText = "コピーしました！";
        setTimeout(() => (button.innerText = "コピー"), 1500);
    });
}

// スライド画像
const images = [
  "images/maintenance.jpeg",
  "images/gadget-insta360x4.jpg",
  "images/html-css-javascript1.png"
];

// 各スライドのリンク先
const links = [
  "index.html",
  "insta360-x4.html",
  "html-css-javascript.html"
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
    
  // フッターを読み込み
  fetch("footer.html")
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML("beforeend", html);
    });
});
