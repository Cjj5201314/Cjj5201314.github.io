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

// 构建树形结构
function buildTree(data, parentElement) {
    let tree = document.createElement('ul');
    tree.className = 'tree';

    data.forEach(item => {
        let listItem = document.createElement('li');
        let textNode = document.createTextNode(item.name);
        listItem.appendChild(textNode);
        listItem.className = item.type === 'file' ? 'file-item' : 'dir-item';

        if (item.type === 'dir') {
            listItem.addEventListener('click', function(e) {
                e.stopPropagation();
                if (!listItem.classList.contains('expanded')) {
                    fetchRepoFiles(item.path, listItem);
                } else {
                    let subTree = listItem.getElementsByTagName('ul')[0];
                    listItem.removeChild(subTree);
                    listItem.classList.remove('expanded');
                }
            });

            // 如果目录下有子目录或文件，递归构建树形结构
            if (item.children && item.children.length > 0) {
                let subTree = buildTree(item.children, listItem);
                listItem.appendChild(subTree);
            }
        } else if (item.name.endsWith('.md')) {
            listItem.addEventListener('click', function() {
                fetchFileContent(item.path);
            });
        }

        tree.appendChild(listItem);
    });

    if (parentElement) {
        parentElement.appendChild(tree);
        parentElement.classList.add('expanded');
    } else {
        let filesList = document.getElementById('repoFiles');
        filesList.innerHTML = '';
        filesList.appendChild(tree);
    }

    return tree;
}

// 获取仓库中“学习资料”文件夹的内容
function fetchRepoFiles(path = '学习资料', parentElement) {
    const apiUrl = `https://api.github.com/repos/Cjj5201314/Cjj5201314.github.io/contents/${path}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                buildTree(data, parentElement);
            } else {
                console.error('Data is not an array:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching directory:', error);
        });
}

// 获取并显示文件内容
function fetchFileContent(filePath) {
    const apiUrl = `https://api.github.com/repos/Cjj5201314/Cjj5201314.github.io/contents/${filePath}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                fetchRepoFiles(filePath);
            } else {
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
