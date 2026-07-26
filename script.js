// ============================================
// KHAI BÁO BIẾN
// ============================================
let clickedcnt = 0;
let playerName = "";
let hasSaved = false; // đảm bảo chỉ lưu Firebase đúng 1 lần / người chơi

const title = document.getElementById("title");
const container = document.getElementById("container");
const nameInput = document.getElementById("name");
const nameWrapper = document.querySelector(".inp");
const btn = document.getElementById("btn");

// ============================================
// NÚT "CLICK ME" CHÍNH
// ============================================
btn.addEventListener("click", () => {
  if (clickedcnt === 0) {
    playerName = nameInput.value.trim();

    if (playerName === "") {
      alert("Bạn chưa nhập tên kìa!");
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
    title.textContent = `${playerName} MÀY BỊ GAY?`;
    btn.remove();
    createNew();
  }
});

// ============================================
// TẠO 2 NÚT: "THỪA NHẬN" và "NÉ MÃI MÃI"
// ============================================
function createNew() {
  const btnNormal = document.createElement("button");
  btnNormal.id = "btnNormal";
  btnNormal.textContent = "OK TAO GAY ĐƯỢC CHƯA?";
  container.appendChild(btnNormal);

  const btnRunaway = document.createElement("button");
  btnRunaway.id = "btnRunaway";
  btnRunaway.textContent = "TAO KO GAY. MÀY MỚI GAY!";
  container.appendChild(btnRunaway);

  let escapeCount = 0; // số lần "cố gắng để không bị gay" (số lần hover/chạm hụt)
  let hasEscaped = false;

  // --- Bấm btnNormal = THỪA NHẬN ---
  btnNormal.addEventListener("click", () => {
    title.textContent = "ĐÈO MẸ SỐC VẬY CU";
    btnNormal.remove();
    btnRunaway.remove();
    Shocked();

    recordResult(true); // caught = true → thừa nhận
  });

  // --- btnRunaway CHỈ NÉ, KHÔNG BAO GIỜ BẤM ĐƯỢC (desktop hover) ---
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

  // --- Né cảm ứng (mobile) ---
  document.addEventListener("touchmove", (e) => {
    if (!btnRunaway.isConnected) return;

    const touch = e.touches[0];
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
    e.preventDefault(); // chặn tap trúng, luôn né trước khi kịp chạm
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

  // --- Nếu rời trang mà CHƯA từng bấm btnNormal = KHÔNG THỪA NHẬN ---
  function handleLeave() {
    if (!hasSaved && btnNormal.isConnected) {
      recordResult(false); // caught = false → gay nhưng ko chịu thừa nhận
    }
  }

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      handleLeave();
    }
  });

  window.addEventListener("beforeunload", handleLeave);

  // --- Hàm dùng chung để lưu kết quả lên Firebase ---
  function recordResult(admitted) {
    if (hasSaved) return; // chặn lưu trùng lặp
    hasSaved = true;

    const deviceType = /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop";
    saveVictim(playerName, escapeCount, admitted, deviceType);
  }
}

// ============================================
// GIF KHI THỪA NHẬN
// ============================================
function Shocked() {
  const img = document.createElement("img");
  img.src = "https://c.tenor.com/vWK04T5bh4kAAAAd/tenor.gif";
  img.alt = "CÚT MẸ ĐI THẰNG GAY";
  img.style.width = "250px";
  img.style.marginTop = "20px";
  container.appendChild(img);
}