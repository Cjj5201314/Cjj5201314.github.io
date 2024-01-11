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
let currentPath = '学习资料'; // 添加全局变量记录当前路径

function fetchRepoFiles(path = currentPath) {
    const apiUrl = `https://api.github.com/repos/Cjj5201314/Cjj5201314.github.io/contents/${path}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let filesList = document.getElementById('repoFiles');
            filesList.innerHTML = '';
            if (Array.isArray(data)) {
                if (currentPath !== '学习资料') {
                    // 添加返回上级目录按钮
                    let backBtn = document.createElement('div');
                    backBtn.textContent = '返回上级目录';
                    backBtn.className = 'dir-item';
                    backBtn.addEventListener('click', () => {
                        let parts = currentPath.split('/');
                        parts.pop(); // 移除最后一级目录
                        currentPath = parts.join('/');
                        fetchRepoFiles(currentPath);
                    });
                    filesList.appendChild(backBtn);
                }

                data.forEach(item => {
                    let listItem = document.createElement('div');
                    listItem.textContent = item.name;
                    listItem.className = item.type === 'file' ? 'file-item' : 'dir-item';
                    listItem.addEventListener('click', () => {
                        if (item.type === 'file') {
                            fetchFileContent(item.path);
                        } else {
                            currentPath = item.path;
                            fetchRepoFiles(item.path);
                        }
                    });
                    filesList.appendChild(listItem);
                });
            } else {
                console.error('Data is not an array:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching files:', error);
        });
}

// 获取并显示文件内容
function fetchFileContent(filePath) {
    const apiUrl = `https://api.github.com/repos/Cjj5201314/Cjj5201314.github.io/contents/${filePath}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                // 如果是目录，递归获取内容
                fetchRepoFiles(filePath);
            } else {
                // 如果是文件，获取文件内容
                const downloadUrl = data.download_url;
                return fetch(downloadUrl);
            }
        })
        .then(response => response.text())
        .then(content => {
            let contentDiv = document.getElementById('content');
            contentDiv.innerHTML = '<pre>' + content + '</pre>';
        })
        .catch(error => {
            console.error('Error fetching file content:', error);
        });
}

// 初始加载学习资料
fetchRepoFiles();
