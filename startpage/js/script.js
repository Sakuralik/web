// 获取元素
const searchForm = document.getElementById('search-form');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const searchEngineSelect = document.getElementById('search-engine');

// 检查 localStorage 是否已保存搜索引擎选择
if (localStorage.getItem('searchEngine')) {
  // 如果已保存，将选择恢复到保存的值
  searchEngineSelect.value = localStorage.getItem('searchEngine');
}

// 监听搜索引擎选择框的变更事件
searchEngineSelect.addEventListener('change', function() {
  // 获取当前选定的搜索引擎值
  const selectedSearchEngine = searchEngineSelect.value;

  // 将搜索引擎值保存到 localStorage
  localStorage.setItem('searchEngine', selectedSearchEngine);
});

// 监听搜索按钮的点击事件
searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单默认提交行为

    // 获取选定的搜索引擎值和搜索关键字
    const searchEngineSelect = document.getElementById('search-engine');
    const selectedSearchEngine = searchEngineSelect.value;
    const searchKeyword = searchInput.value.trim();

    // 构建搜索URL
    const searchURL = selectedSearchEngine + encodeURIComponent(searchKeyword);

    // 重定向到搜索URL
    window.location.href = searchURL;
});
function updateTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    
    // 格式化时间，确保显示的数字都是两位数
    var formattedTime = padZero(hours) + ":" + padZero(minutes) + ":" + padZero(seconds);
    
    // 将时间更新到指定的元素中
    document.getElementById("timet").textContent = formattedTime;
  }
  
  function padZero(number) {
    // 如果数字小于10，在前面补零
    return (number < 10 ? "0" : "") + number;
  }
  
  // 每秒更新一次时间
  setInterval(updateTime, 1000);
  const selectElement = document.querySelector('.custom-select');

