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

// GitHub API 认证令牌
const accessToken = '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';

// 当前路径的历史记录
let pathHistory = ['学习资料'];

// 获取仓库中指定路径的内容
function fetchRepoFiles(path) {
    const apiUrl = `https://api.github.com/repos/Cjj5201314/Cjj5201314.github.io/contents/${path}`;

    fetch(apiUrl, {
        headers: {
            'Authorization': `token ${accessToken}`
        }
    })
        .then(response => response.json())
        .then(data => {
            let filesList = document.getElementById('repoFiles');
            filesList.innerHTML = '';

            // 添加面包屑导航
            let breadcrumb = document.createElement('div');
            breadcrumb.className = 'breadcrumb';
            breadcrumb.textContent = '当前路径：';
            pathHistory.forEach((pathItem, index) => {
                let pathLink = document.createElement('span');
                pathLink.className = 'breadcrumb-item';
                pathLink.textContent = pathItem;
                pathLink.addEventListener('click', () => {
                    navigatePath(index);
                });
                breadcrumb.appendChild(pathLink);
                if (index < pathHistory.length - 1) {
                    breadcrumb.appendChild(document.createTextNode(' > '));
                }
            });
            filesList.appendChild(breadcrumb);

            if (Array.isArray(data)) {
                data.forEach(item => {
                    let listItem = document.createElement('div');
                    listItem.textContent = item.name;
                    listItem.className = item.type === 'file' ? 'file-item' : 'dir-item';
                    listItem.addEventListener('click', () => {
                        if (item.type === 'file') {
                            fetchFileContent(item.path);
                        } else {
                            navigateToPath(item.path);
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

// 导航到指定路径
function navigateToPath(path) {
    pathHistory.push(path);
    fetchRepoFiles(path);
}

// 导航到历史记录中的某一项路径
function navigatePath(index) {
    let pathToNavigate = pathHistory.slice(0, index + 1).join('/');
    fetchRepoFiles(pathToNavigate);
}

// 获取并显示文件内容
function fetchFileContent(filePath) {
    const apiUrl = `https://api.github.com/repos/Cjj5201314/Cjj5201314.github.io/contents/${filePath}`;

    fetch(apiUrl, {
        headers: {
            'Authorization': `token ${accessToken}`
        }
    })
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                // 如果是目录，递归获取内容
                navigateToPath(filePath);
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
fetchRepoFiles('学习资料');
