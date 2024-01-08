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
function fetchRepoFiles(path = '学习资料') {
    const apiUrl = `https://api.github.com/repos/Cjj5201314/Cjj5201314.github.io/contents/${path}`;
    console.log('Fetching files from:', apiUrl); // 输出URL以便检查
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log('Data fetched:', data); // 输出获取到的数据
        let filesList = document.getElementById('repoFiles');
        filesList.innerHTML = ''; // 清空当前内容
        data.forEach(item => {
            let listItem = document.createElement('div');
            listItem.textContent = item.name;
            listItem.className = item.type === 'file' ? 'file-item' : 'dir-item';
            listItem.addEventListener('click', () => {
                if (item.type === 'file') {
                    // 是文件，获取内容
                    fetchFileContent(item.path);
                } else {
                    // 是目录，获取目录内的文件
                    fetchRepoFiles(item.path);
                }
            });
            filesList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error fetching files:', error);
    });
}

// 获取并显示文件内容
function fetchFileContent(filePath) {
    const apiUrl = `https://raw.githubusercontent.com/Cjj5201314/Cjj5201314.github.io/main/${filePath}`;
    console.log('Fetching content from:', apiUrl); // 输出URL以便检查
    fetch(apiUrl)
    .then(response => response.text()) // 直接获取文本，不用json()
    .then(content => {
        console.log('File content fetched:', content); // 输出获取到的文件内容
        let contentDiv = document.getElementById('content');
        contentDiv.innerHTML = '<pre>' + content + '</pre>'; // 显示文件内容
    })
    .catch(error => {
        console.error('Error fetching file content:', error);
    });
}
