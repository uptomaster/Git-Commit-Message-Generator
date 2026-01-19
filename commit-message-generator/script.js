// ===============================
// 날짜 / 시간 생성 (YYMMDD HH:MM)
// ===============================
function getNow() {
  const now = new Date();

  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");

  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");

  return {
    date: `${yy}${mm}${dd}`,
    time: `${hh}:${min}`
  };
}

// ===============================
// 상태별 스타일 적용
// ===============================
function applyStatusStyle(status) {
  const resultArea = document.getElementById("result");

  resultArea.classList.remove("working", "done");

  if (status === "작업중") {
    resultArea.classList.add("working");
  } else if (status === "완료") {
    resultArea.classList.add("done");
  }
}

// ===============================
// 토스트 알림
// ===============================
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

// ===============================
// git commit 명령어 생성 (ALL-IN-ONE)
// ===============================
document.getElementById("generate").addEventListener("click", () => {
  const author = document.getElementById("author").value.trim();
  const branch = document.getElementById("branch").value.trim();
  const status = document.getElementById("status").value;
  const work = document.getElementById("work").value.trim();
  const resultArea = document.getElementById("result");

  if (!author || !work) {
    showToast("이름과 작업 내용은 필수입니다.");
    return;
  }

  const { date, time } = getNow();

  let commitMessage = `${date} ${time} ${author} `;

  if (branch) {
    commitMessage += `${branch}브랜치에서 `;
  }

  commitMessage += `${work} ${status}`;

  // 최종 산출물
  const gitCommand = `git commit -m "${commitMessage}"`;

  resultArea.value = gitCommand;
  applyStatusStyle(status);
});

// ===============================
// 복사
// ===============================
document.getElementById("copy").addEventListener("click", () => {
  const resultArea = document.getElementById("result");

  if (!resultArea.value) {
    showToast("복사할 명령어가 없습니다.");
    return;
  }

  navigator.clipboard.writeText(resultArea.value)
    .then(() => showToast("git commit 명령어가 복사되었습니다."))
    .catch(() => showToast("복사에 실패했습니다."));
});
