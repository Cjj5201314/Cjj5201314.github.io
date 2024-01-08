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
    fetch(`https://api.github.com/repos/Cjj5201314/Cjj5201314.github.io/contents/${filePath}`)
    .then(response => response.json())
    .then(data => {
        let contentDiv = document.getElementById('content');
        // 注意：GitHub Content API 返回的内容经过 Base64 编码，需要解码
        let decodedContent = atob(data.content);
        contentDiv.innerHTML = '<pre>' + decodedContent + '</pre>';
    })
    .catch(error => console.error('Error:', error));
}

