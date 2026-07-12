let clickedcnt =0;

const btn = document.getElementById("btn");
const title = document.getElementById("title");
const container = document.getElementById("container");

btn.addEventListener("click", () => {
  clickedcnt++;
  if(clickedcnt == 1)
  {
    title.textContent = "Bạn vừa click nút!";
    btn.textContent = "OK";
  }
  if(clickedcnt == 2)
  {
    title.textContent = "OK?";
    btn.textContent = "OK✔️";
  }
  if(clickedcnt == 3)
  {
    title.textContent = "Mày bị Gay ";
    btn.remove();

    createNew();
  }
})

function createNew() {
  const btnNormal = document.createElement("button");
  btnNormal.id = "btnNormal";
  btnNormal.textContent = "OK TAO GAY ĐƯỢC CHƯA?";
  container.appendChild(btnNormal);

  const btnRunaway = document.createElement("button");
  btnRunaway.id = "btnRunaway";
  btnRunaway.textContent = "TAO KO GAY. MÀY MỚI GAY!";
  container.appendChild(btnRunaway);

  btnNormal.addEventListener("click", () => {
    title.textContent = "ĐÈO MẸ SỐC VẬY CU";
    btnNormal.remove();
    btnRunaway.remove();

    Shocked();
  });

  // Chỉ chạy 1 LẦN DUY NHẤT khi hover lần đầu
  let hasEscaped = false;

  btnRunaway.addEventListener("mouseover", () => {
    if (!hasEscaped) {
      // Lấy vị trí HIỆN TẠI của nút (đang được flexbox căn giữa)
      const rect = btnRunaway.getBoundingClientRect();

      // Gán lại đúng vị trí đó bằng tọa độ tuyệt đối TRƯỚC KHI đổi position
      // để nút không bị "nhảy giật" về góc màn hình lúc chuyển sang fixed
      btnRunaway.style.position = "fixed";
      btnRunaway.style.left = rect.left + "px";
      btnRunaway.style.top = rect.top + "px";
      btnRunaway.style.margin = "0"; // tránh lệch do margin/gap cũ của flex

      hasEscaped = true; // đánh dấu đã thoát khỏi flexbox, không quay lại nữa
    }

    // Từ lần hover thứ 2 trở đi, chỉ đổi tọa độ ngẫu nhiên như cũ
    const randomX = Math.random() * (window.innerWidth - 150);
    const randomY = Math.random() * (window.innerHeight - 100);
    btnRunaway.style.left = randomX + "px";
    btnRunaway.style.top = randomY + "px";
  });
}

function Shocked()
{
  const img = document.createElement("img");
  img.src = "https://c.tenor.com/vWK04T5bh4kAAAAd/tenor.gif";
  img.alt = "CÚT MẸ ĐI THẰNG GAY";
  img.style.width = "250px";
  img.style.marginTop = "20px";
  container.appendChild(img);
}