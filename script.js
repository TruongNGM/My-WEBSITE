let clickedcnt = 0;
let playerName = "";

const title = document.getElementById("title");
const container = document.getElementById("container");
const nameInput = document.getElementById("name");
const nameWrapper = document.querySelector(".inp");
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  // Lần đầu bấm "Click me" cũng chính là lúc lấy tên
  if (clickedcnt === 0) {
    playerName = nameInput.value.trim();

    if (playerName === "") {
      alert("Bạn chưa nhập tên kìa!"); // popup mặc định của trình duyệt
    nameInput.focus();
    return;
    }

    nameWrapper.style.display = "none";

  }

  clickedcnt++;
  if (clickedcnt == 1) {
    title.textContent = `Chào ${playerName}, bạn vừa click nút!`;
    btn.textContent = "OK";
  }
  if (clickedcnt == 2) {
    title.textContent = "OK?";
    btn.textContent = "OK✔️";
  }
  if (clickedcnt == 3) {
    title.textContent = `${playerName} MÀY BỊ GAY`;
    btn.remove();
    createNew();
  }
});
function createNew() {
  const btnNormal = document.createElement("button");
  btnNormal.id = "btnNormal";
  btnNormal.textContent = "OK TAO GAY ĐƯỢC CHƯA?";
  container.appendChild(btnNormal);

  const btnRunaway = document.createElement("button");
  btnRunaway.id = "btnRunaway";
  btnRunaway.textContent = "TAO KO GAY. MÀY MỚI GAY!";
  container.appendChild(btnRunaway);

  let escapeCount = 0; // đếm số lần né được, dùng để lưu vào Firebase

  // --- Bấm trúng nút bình thường = thua ngay, không kịp né ---
  btnNormal.addEventListener("click", () => {
    title.textContent = "ĐÈO MẸ SỐC VẬY CU";
    btnNormal.remove();
    btnRunaway.remove();
    Shocked();

    const deviceType = /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop";
    saveVictim(playerName, escapeCount, true, deviceType);
  });

  // --- Nút chạy trốn khi hover (desktop) ---
  let hasEscaped = false;

  btnRunaway.addEventListener("mouseover", () => {
    escapeCount++;

    if (!hasEscaped) {
      const rect = btnRunaway.getBoundingClientRect();
      btnRunaway.style.position = "fixed";
      btnRunaway.style.left = rect.left + "px";
      btnRunaway.style.top = rect.top + "px";
      btnRunaway.style.margin = "0";
      hasEscaped = true;
    }

    const randomX = Math.random() * (window.innerWidth - 150);
    const randomY = Math.random() * (window.innerHeight - 100);
    btnRunaway.style.left = randomX + "px";
    btnRunaway.style.top = randomY + "px";
  });
  // --- Phần né cảm ứng (mobile) ---
  document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    if (!btnRunaway.isConnected) return; // nút đã bị xóa thì bỏ qua

    const rect = btnRunaway.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    const distance = Math.hypot(touch.clientX - btnCenterX, touch.clientY - btnCenterY);

    if (distance < 80) {
      escapeCount++;
      if (!hasEscaped) {
        btnRunaway.style.position = "fixed";
        btnRunaway.style.margin = "0";
        hasEscaped = true;
      }
      const randomX = Math.random() * (window.innerWidth - 150);
      const randomY = Math.random() * (window.innerHeight - 100);
      btnRunaway.style.left = randomX + "px";
      btnRunaway.style.top = randomY + "px";
      if (navigator.vibrate) navigator.vibrate(50);
    }
  });

  btnRunaway.addEventListener("touchstart", (e) => {
    e.preventDefault();
    escapeCount++;
    if (!hasEscaped) {
      btnRunaway.style.position = "fixed";
      btnRunaway.style.margin = "0";
      hasEscaped = true;
    }
    const randomX = Math.random() * (window.innerWidth - 150);
    const randomY = Math.random() * (window.innerHeight - 100);
    btnRunaway.style.left = randomX + "px";
    btnRunaway.style.top = randomY + "px";
  });
}

function Shocked() {
  const img = document.createElement("img");
  img.src = "https://c.tenor.com/vWK04T5bh4kAAAAd/tenor.gif";
  img.alt = "CÚT MẸ ĐI THẰNG GAY";
  img.style.width = "250px";
  img.style.marginTop = "20px";
  container.appendChild(img);
}