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

// 递归构建树形结构
function buildTree(data, parentElement) {
    let tree = document.createElement('ul');

    data.forEach(item => {
        let listItem = document.createElement('li');
        let textNode = document.createTextNode(item.name);
        listItem.appendChild(textNode);
        listItem.className = item.type === 'file' ? 'file-item' : 'dir-item';

        listItem.addEventListener('click', () => {
            if (item.type === 'file') {
                fetchFileContent(item.path);
            } else {
                fetchRepoFiles(item.path, listItem);
            }
        });

        if (item.type === 'dir' && item.children && item.children.length > 0) {
            let subTree = buildTree(item.children, listItem);
            listItem.appendChild(subTree);
        }

        tree.appendChild(listItem);
    });

    parentElement.appendChild(tree);
}

// 获取仓库中“学习资料”文件夹的内容
function fetchRepoFiles(path = '学习资料', parentElement) {
    const apiUrl = `https://api.github.com/repos/Cjj5201314/Cjj5201314.github.io/contents/${path}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let filesList = document.getElementById('repoFiles');
            filesList.innerHTML = '';

            if (Array.isArray(data)) {
                buildTree(data, filesList);
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
            if (typeof marked === 'function') {
                const fileDirectory = filePath.substring(0, filePath.lastIndexOf('/'));
                const absoluteImagePath = `https://raw.githubusercontent.com/Cjj5201314/Cjj5201314.github.io/master/${fileDirectory}/img/`;

                content = content.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, path) => {
                    const absolutePath = `${absoluteImagePath}${path}`;
                    return `![${alt}](${absolutePath})`;
                });

                let contentDiv = document.getElementById('content');
                contentDiv.innerHTML = marked(content);
                contentDiv.classList.add('markdown-content');
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
