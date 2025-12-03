// 假資料：先讓畫面動起來，之後再改成後端資料
const courses = [
  {
    name: "計算機概論",
    teacher: "王教授",
    weekday: "星期一",
    section: "第2-3節",
    room: "R301"
  },
  {
    name: "微積分",
    teacher: "李教授",
    weekday: "星期三",
    section: "第3-5節",
    room: "M201"
  },
  {
    name: "英文閱讀",
    teacher: "陳老師",
    weekday: "星期三",
    section: "第1-2節",
    room: "L105"
  }
];

// 把資料畫到表格上
function renderTable(list) {
  const tbody = document.getElementById("course-table-body");
  tbody.innerHTML = ""; // 先清空

  list.forEach((c) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.name}</td>
      <td>${c.teacher}</td>
      <td>${c.weekday}</td>
      <td>${c.section}</td>
      <td>${c.room}</td>
    `;
    tbody.appendChild(tr);
  });
}

// 一開始先把全部課程顯示出來
renderTable(courses);

// 點「查詢」時，用關鍵字篩選
document.getElementById("search-btn").addEventListener("click", () => {
  const keyword = document.getElementById("keyword").value.trim();
  if (!keyword) {
    renderTable(courses);
    return;
  }

  const filtered = courses.filter((c) =>
    c.name.includes(keyword) || c.teacher.includes(keyword)
  );
  renderTable(filtered);
});
