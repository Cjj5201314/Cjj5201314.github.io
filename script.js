document.getElementById('toggleButton').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar');
    var content = document.getElementById('content');
    if (sidebar.style.width === '250px') {
        sidebar.style.width = '0';
        sidebar.style.visibility = 'hidden';
        content.style.marginLeft = '0';
    } else {
        sidebar.style.width = '250px';
        sidebar.style.visibility = 'visible';
        content.style.marginLeft = '250px';
    }
});

function fetchRepoFiles() {
    // 仅获取“学习资料”文件夹中的内容
    fetch('https://api.github.com/repos/Cjj5201314/Cjj5201314.github.io/contents/学习资料')
    .then(response => response.json())
    .then(data => {
        let filesList = document.getElementById('repoFiles');
        filesList.innerHTML = ''; // 清空当前内容
        data.forEach(file => {
            let listItem = document.createElement('div');
            listItem.textContent = file.name;
            listItem.className = 'file-item'; // 添加类名以便添加样式
            listItem.addEventListener('click', function() {
                fetchFileContent(file.path);
            });
            filesList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error:', error));
}

function fetchFileContent(filePath) {
    fetch(`https://raw.githubusercontent.com/Cjj5201314/Cjj5201314.github.io/main/${filePath}`)
    .then(response => response.text())
    .then(data => {
        let contentDiv = document.getElementById('content');
        contentDiv.innerHTML = '<pre>' + data + '</pre>'; // 使用 <pre> 标签以保留文件格式
    })
    .catch(error => console.error('Error:', error));
}

// 当页面加载完毕时，获取文件列表
window.onload = fetchRepoFiles;
