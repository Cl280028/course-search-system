// ====== 假資料：先讓系統可以查詢，之後再接後端 ======
const courses = [
  {
    name: "資料結構",
    code: "CS201",
    teacher: "王大明",
    degree: "四技",
    semester: "113-1",
    department: "資訊管理系",
    grade: "2",
    weekday: "3",           // 星期三
    periods: ["3", "4"],
    timeText: "星期三 10:10–12:00",
    room: "工程館 201",
    credits: 3
  },
  {
    name: "微積分",
    code: "MATH101",
    teacher: "李小華",
    degree: "四技",
    semester: "113-1",
    department: "健康事業管理系",
    grade: "1",
    weekday: "1",           // 星期一
    periods: ["1", "2"],
    timeText: "星期一 08:10–10:00",
    room: "理學館 105",
    credits: 4
  },
  {
    name: "作業系統",
    code: "CS301",
    teacher: "張志強",
    degree: "四技",
    semester: "113-2",
    department: "資訊管理系",
    grade: "3",
    weekday: "5",           // 星期五
    periods: ["7", "8"],
    timeText: "星期五 13:10–15:00",
    room: "工程館 305",
    credits: 3
  }
];

// ====== 把課程資料畫到表格上 ======
function renderTable(list) {
  const tbody = document.getElementById("course-table-body");
  const resultCount = document.getElementById("result-count");

  tbody.innerHTML = "";

  list.forEach(c => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.name}<br><span class="code">${c.code}</span></td>
      <td>${c.teacher}</td>
      <td>${c.timeText}</td>
      <td>${c.room}</td>
      <td><span class="credit-tag">${c.credits}學分</span></td>
      <td><a href="#" class="view-link">👁 查看</a></td>
    `;
    tbody.appendChild(tr);
  });

  resultCount.textContent = list.length;
}

// ====== 讀取畫面上的查詢條件，回傳篩選後的課程 ======
function getFilteredCourses() {
  const keyword = document.getElementById("keyword").value.trim();
  const degree = document.getElementById("degree").value;
  const semester = document.getElementById("semester").value;
  const department = document.getElementById("department").value;
  const grade = document.getElementById("grade").value;
  const weekday = document.getElementById("weekday").value;
  const period = document.getElementById("period").value;

  return courses.filter(c => {
    // 關鍵字：比對課程名稱 / 老師 / 課程代碼
    if (keyword) {
      const hit =
        c.name.includes(keyword) ||
        c.teacher.includes(keyword) ||
        (c.code && c.code.includes(keyword));
      if (!hit) return false;
    }

    if (degree && c.degree !== degree) return false;
    if (semester && c.semester !== semester) return false;
    if (department && c.department !== department) return false;
    if (grade && c.grade !== grade) return false;
    if (weekday && c.weekday !== weekday) return false;

    if (period) {
      if (!c.periods || !c.periods.includes(period)) return false;
    }

    return true;
  });
}

// ====== 重置查詢條件 ======
function resetFilters() {
  document.getElementById("keyword").value = "";
  document.getElementById("degree").value = "";
  document.getElementById("semester").value = "";
  document.getElementById("department").value = "";
  document.getElementById("grade").value = "";
  document.getElementById("weekday").value = "";
  document.getElementById("period").value = "";

  renderTable(courses);
}

// ====== 頁面載入完成後綁定事件 ======
document.addEventListener("DOMContentLoaded", () => {
  // 一開始先顯示全部課程
  renderTable(courses);

  const searchBtn = document.getElementById("search-btn");
  const iconSearchBtn = document.getElementById("icon-search-btn");
  const resetBtn = document.getElementById("reset-btn");

  searchBtn.addEventListener("click", () => {
    const filtered = getFilteredCourses();
    renderTable(filtered);
  });

  iconSearchBtn.addEventListener("click", () => {
    const filtered = getFilteredCourses();
    renderTable(filtered);
  });

  resetBtn.addEventListener("click", resetFilters);
});
function openModal(course) {
  document.getElementById("modal-title").innerText = course.name;
  document.getElementById("modal-code").innerText = course.code;
  document.getElementById("modal-teacher").innerText = course.teacher;
  document.getElementById("modal-time").innerText = course.time;
  document.getElementById("modal-room").innerText = course.room;
  document.getElementById("modal-credits").innerText = course.credits;
  document.getElementById("modal-desc").innerText = course.desc;

  document.getElementById("courseModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("courseModal").style.display = "none";
}

