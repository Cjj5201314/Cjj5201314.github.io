// 切换侧边栏的显示和隐藏
document.getElementById('toggleButton').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar');
    var content = document.getElementById('content');
    sidebar.classList.toggle('collapsed');
    if (sidebar.classList.contains('collapsed')) {
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
        listItem.textContent = item.name;
        listItem.className = item.type === 'file' ? 'file-item' : 'dir-item';

        if (item.type === 'dir') {
            listItem.classList.add('expandable');
            listItem.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleExpand(listItem, item);
            });
        } else if (item.name.endsWith('.md')) {
            listItem.addEventListener('click', function(e) {
                e.stopPropagation(); // 防止事件冒泡
                highlightSelectedFile(listItem);
                fetchFileContent(item.path);
            });
        }

        tree.appendChild(listItem);
    });

    if (parentElement) {
        parentElement.appendChild(tree);
        parentElement.classList.add('expanded');
    } else {
        document.getElementById('repoFiles').appendChild(tree);
    }
}

function toggleExpand(listItem, item) {
    let expanded = listItem.classList.toggle('expanded');
    if (expanded) {
        if (!listItem.querySelector('ul')) {
            fetchRepoFiles(item.path, listItem);
        }
    } else {
        let subTree = listItem.querySelector('ul');
        if (subTree) {
            listItem.removeChild(subTree);
        }
    }
}

function highlightSelectedFile(selectedItem) {
    let previouslySelected = document.querySelector('.file-item.selected');
    if (previouslySelected) {
        previouslySelected.classList.remove('selected');
    }
    selectedItem.classList.add('selected');
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
