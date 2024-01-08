// 切换侧边栏的显示和隐藏
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

// 获取仓库中“学习资料”文件夹的内容
function fetchRepoFiles() {
    fetch('https://api.github.com/repos/Cjj5201314/Cjj5201314.github.io/contents/学习资料')
    .then(response => response.json())
    .then(data => {
        let filesList = document.getElementById('repoFiles');
        filesList.innerHTML = ''; // 清空当前内容
        data.forEach(file => {
            if(file.type === 'file'){ // 确保只处理文件
                let listItem = document.createElement('div');
                listItem.textContent = file.name;
                listItem.className = 'file-item';
                listItem.addEventListener('click', function() {
                    fetchFileContent(file.path);
                });
                filesList.appendChild(listItem);
            }
        });
    })
    .catch(error => console.error('Error:', error));
}

// 获取并显示文件内容
function fetchFileContent(filePath) {
    fetch(`https://raw.githubusercontent.com/Cjj5201314/Cjj5201314.github.io/main/${filePath}`)
    .then(response => response.text())
    .then(data => {
        let contentDiv = document.getElementById('content');
        contentDiv.innerHTML = '<pre>' + data + '</pre>'; // 使用 <pre> 标签以保留文件格式
    })
    .catch(error => console.error('Error:', error));
}

// 页面加载完成后，调用fetchRepoFiles
window.onload = fetchRepoFiles;
