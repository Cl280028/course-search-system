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
    weekday: "3",
    periods: ["3", "4"],
    timeText: "星期三 10:10–12:00",
    room: "工程館 201",
    credits: 3,
    description: "介紹基本資料結構概念，如陣列、串列、堆疊、佇列與樹狀結構。"
  },
  {
    name: "微積分",
    code: "MATH101",
    teacher: "李小華",
    degree: "四技",
    semester: "113-1",
    department: "健康事業管理系",
    grade: "1",
    weekday: "1",
    periods: ["1", "2"],
    timeText: "星期一 08:10–10:00",
    room: "理學館 105",
    credits: 4,
    description: "涵蓋極限、微分與積分的基本概念與應用。"
  },
  {
    name: "作業系統",
    code: "CS301",
    teacher: "張志強",
    degree: "四技",
    semester: "113-2",
    department: "資訊管理系",
    grade: "3",
    weekday: "5",
    periods: ["7", "8"],
    timeText: "星期五 13:10–15:00",
    room: "工程館 305",
    credits: 3,
    description: "介紹作業系統核心概念，如行程管理、記憶體管理與檔案系統。"
  }
];

// ====== 把課程資料畫到表格上（重點在這）======
function renderTable(list) {
  const tbody = document.getElementById("course-table-body");
  const resultCount = document.getElementById("result-count");

  tbody.innerHTML = "";
  resultCount.textContent = list.length;

  list.forEach(c => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        ${c.name}<br>
        <span class="code">${c.code}</span>
      </td>
      <td>${c.teacher}</td>
      <td>${c.timeText}</td>
      <td>${c.room}</td>
      <td><span class="credit-tag">${c.credits}學分</span></td>
      <td>
        <a href="javascript:void(0)" class="view-link"
           onclick='openModal({
             name: "${c.name}",
             code: "${c.code}",
             teacher: "${c.teacher}",
             time: "${c.timeText}",
             room: "${c.room}",
             credits: "${c.credits} 學分",
             desc: "${c.description}"
           })'>
           👁 查看
        </a>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// ====== 讀取畫面上的查詢條件 ======
function getFilteredCourses() {
  const keyword = document.getElementById("keyword").value.trim();
  const degree = document.getElementById("degree").value;
  const semester = document.getElementById("semester").value;
  const department = document.getElementById("department").value;
  const grade = document.getElementById("grade").value;
  const weekday = document.getElementById("weekday").value;
  const period = document.getElementById("period").value;

  return courses.filter(c => {
    if (keyword) {
      const hit =
        c.name.includes(keyword) ||
        c.teacher.includes(keyword) ||
        c.code.includes(keyword);
      if (!hit) return false;
    }

    if (degree && c.degree !== degree) return false;
    if (semester && c.semester !== semester) return false;
    if (department && c.department !== department) return false;
    if (grade && c.grade !== grade) return false;
    if (weekday && c.weekday !== weekday) return false;
    if (period && !c.periods.includes(period)) return false;

    return true;
  });
}

// ====== 重置 ======
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

// ====== Modal ======
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

// ====== 初始化 ======
document.addEventListener("DOMContentLoaded", () => {
  renderTable(courses);

  document.getElementById("search-btn")
    .addEventListener("click", () => renderTable(getFilteredCourses()));

  document.getElementById("icon-search-btn")
    .addEventListener("click", () => renderTable(getFilteredCourses()));

  document.getElementById("reset-btn")
    .addEventListener("click", resetFilters);
});
