window.onload = function() {
  fetchRepoFiles('/学习资料'); // 调整路径以匹配GitHub API的期望格式
};
上面这个js代码有目录列表结构，下面的js代码没有但是可以读取文件内容
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

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let filesList = document.getElementById('repoFiles');
            filesList.innerHTML = '';

            if (Array.isArray(data)) {
                // 移除了添加返回上级目录按钮的代码块
                data.forEach(item => {
                    let listItem = document.createElement('div');
                    listItem.textContent = item.name;
                    listItem.className = item.type === 'file' ? 'file-item' : 'dir-item';

                    listItem.addEventListener('click', () => {
                        if (item.type === 'file') {
                            fetchFileContent(item.path);
                        } else {
                            currentPath = item.path; // 更新currentPath为点击的目录
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
            // 使用 marked.js 转换 Markdown
            if (typeof marked === 'function') {
                // 获取文件所在目录路径
                const fileDirectory = filePath.substring(0, filePath.lastIndexOf('/'));

                // 将图片的相对路径转换为绝对路径
                const absoluteImagePath = `https://raw.githubusercontent.com/Cjj5201314/Cjj5201314.github.io/master/${fileDirectory}/img/`;

                // 替换 Markdown 中的图片路径
                content = content.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, path) => {
                    // 将相对路径转换为绝对路径
                    const absolutePath = `${absoluteImagePath}${path}`;
                    return `![${alt}](${absolutePath})`;
                });

                let contentDiv = document.getElementById('content');
                contentDiv.innerHTML = marked(content);
                contentDiv.classList.add('markdown-content'); // 添加类名用于样式
            } else {
                console.error('marked is not available');
            }
        })
        .catch(error => {
            console.error('Error fetching file content:', error);
        });
}


// 初始加载学习资料
window.onload = function() {
    fetchRepoFiles();
};
