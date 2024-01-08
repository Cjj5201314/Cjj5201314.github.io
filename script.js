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
    const apiUrl = 'https://api.github.com/repos/Cjj5201314/Cjj5201314.github.io/contents/学习资料';
    console.log('Fetching files from:', apiUrl); // 输出URL以便检查
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log('Files fetched:', data); // 输出获取到的文件列表
        let filesList = document.getElementById('repoFiles');
        filesList.innerHTML = '';
        data.forEach(file => {
            if(file.type === 'file'){
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
    .catch(error => {
        console.error('Error fetching files:', error);
    });
}

// 获取并显示文件内容
function fetchFileContent(filePath) {
    const apiUrl = `https://api.github.com/repos/Cjj5201314/Cjj5201314.github.io/contents/${filePath}`;
    console.log('Fetching content from:', apiUrl); // 输出URL以便检查
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log('File content fetched:', data); // 输出获取到的文件内容
        let contentDiv = document.getElementById('content');
        let decodedContent = atob(data.content);
        contentDiv.innerHTML = '<pre>' + decodedContent + '</pre>';
    })
    .catch(error => {
        console.error('Error fetching file content:', error);
    });
}

