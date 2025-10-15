

// ====== Sidebar Buttons Click Highlight ======
const sideButtons = document.querySelectorAll(".left_bar .items span");

sideButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    sideButtons.forEach((b) => b.classList.remove("active-btn"));
    btn.classList.add("active-btn");
  });
});

// ====== Like + Save States ======
const likeIcons = document.querySelectorAll(".engagement .left span:nth-child(1)");
const saveIcons = document.querySelectorAll(".engagement .right span");

// Load saved likes/saves from localStorage
const savedLikes = JSON.parse(localStorage.getItem("likes")) || {};
const savedSaves = JSON.parse(localStorage.getItem("saves")) || {};

likeIcons.forEach((icon, index) => {
  if (savedLikes[index]) {
    icon.classList.add("liked");
    icon.style.color = "red";
  }
  icon.addEventListener("click", () => toggleLike(icon, index));
});

saveIcons.forEach((icon, index) => {
  if (savedSaves[index]) {
    icon.classList.add("saved");
    icon.style.color = "yellow";
  }
  icon.addEventListener("click", () => toggleSave(icon, index));
});

function toggleLike(icon, index) {
  if (icon.classList.contains("liked")) {
    icon.classList.remove("liked");
    icon.style.color = "white";
    savedLikes[index] = false;
  } else {
    icon.classList.add("liked");
    icon.style.color = "red";
    savedLikes[index] = true;
  }
  localStorage.setItem("likes", JSON.stringify(savedLikes));
}

function toggleSave(icon, index) {
  if (icon.classList.contains("saved")) {
    icon.classList.remove("saved");
    icon.style.color = "white";
    savedSaves[index] = false;
  } else {
    icon.classList.add("saved");
    icon.style.color = "yellow";
    savedSaves[index] = true;
  }
  localStorage.setItem("saves", JSON.stringify(savedSaves));
}

// ====== Double Click Post Image to Like ======
const postImages = document.querySelectorAll(".main_post .img img");

postImages.forEach((img, index) => {
  img.addEventListener("dblclick", () => {
    const likeIcon = img.closest(".main_post").querySelector(".engagement .left span:nth-child(1)");
    likeIcon.classList.add("liked");
    likeIcon.style.color = "red";
    savedLikes[index] = true;
    localStorage.setItem("likes", JSON.stringify(savedLikes));
    showHeart(img);
  });
});

function showHeart(img) {
  const heart = document.createElement("div");
  heart.innerHTML = "❤️";
  heart.style.position = "absolute";
  heart.style.top = "50%";
  heart.style.left = "50%";
  heart.style.transform = "translate(-50%, -50%) scale(2)";
  heart.style.opacity = "0.8";
  heart.style.transition = "all 0.5s ease";
  heart.style.fontSize = "3rem";
  heart.style.pointerEvents = "none";
  img.parentElement.style.position = "relative";
  img.parentElement.appendChild(heart);

  setTimeout(() => {
    heart.style.opacity = "0";
    heart.style.transform = "translate(-50%, -50%) scale(0)";
  }, 400);
  setTimeout(() => heart.remove(), 800);
}

// ====== Comment System ======
const commentButtons = document.querySelectorAll(".engagement .left span:nth-child(2)");
const commentAreas = document.querySelectorAll(".comment_area");

commentButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const commentBox = document.createElement("div");
    commentBox.innerHTML = `
      <input type="text" placeholder="Add a comment..." class="comment-input" />
      <button class="comment-btn">Post</button>
    `;
    commentBox.classList.add("comment-box");

    const postContainer = btn.closest(".main_post");
    const existingBox = postContainer.querySelector(".comment-box");
    if (existingBox) existingBox.remove();

    postContainer.appendChild(commentBox);

    const input = commentBox.querySelector(".comment-input");
    const postBtn = commentBox.querySelector(".comment-btn");

    postBtn.addEventListener("click", () => {
      const text = input.value.trim();
      if (text === "") return;

      let comments = JSON.parse(localStorage.getItem(`comments-${index}`)) || [];
      comments.push(text);
      localStorage.setItem(`comments-${index}`, JSON.stringify(comments));

      showComments(index, postContainer);
      input.value = "";
    });

    showComments(index, postContainer);
  });
});

function showComments(index, container) {
  const oldList = container.querySelector(".comment-list");
  if (oldList) oldList.remove();

  const comments = JSON.parse(localStorage.getItem(`comments-${index}`)) || [];
  if (comments.length > 0) {
    const commentList = document.createElement("div");
    commentList.classList.add("comment-list");
    comments.forEach((c) => {
      const p = document.createElement("p");
      p.textContent = `💬 ${c}`;
      commentList.appendChild(p);
    });
    container.appendChild(commentList);
  }
}

// ====== Share Button ======
const shareButtons = document.querySelectorAll(".engagement .left span:nth-child(3)");
shareButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    alert("📤 Shared to your story!");
  });
});

// ====== Follow Button Toggle ======
const followButtons = document.querySelectorAll(".follow");
const savedFollows = JSON.parse(localStorage.getItem("follows")) || {};

followButtons.forEach((btn, index) => {
  if (savedFollows[index]) {
    btn.textContent = "Following";
    btn.style.color = "#000";
    btn.style.backgroundColor = "#ccc";
  }

  btn.addEventListener("click", () => {
    if (btn.textContent.toLowerCase() === "follow") {
      btn.textContent = "Following";
      btn.style.color = "#000";
      btn.style.backgroundColor = "#ccc";
      savedFollows[index] = true;
    } else {
      btn.textContent = "Follow";
      btn.style.color = "#0095f6";
      btn.style.backgroundColor = "transparent";
      savedFollows[index] = false;
    }
    localStorage.setItem("follows", JSON.stringify(savedFollows));
  });
});

// ====== Story Click Event ======
const stories = document.querySelectorAll(".story .profile img");
stories.forEach((story) => {
  story.addEventListener("click", () => {
    alert(`📸 Viewing story of ${story.parentElement.nextElementSibling.textContent}`);
  });
});
