// 切换侧边栏的显示和隐藏
document.getElementById('toggleButton').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar');
    var content = document.getElementById('content');
    var repoFiles = document.getElementById('repoFiles');
    var toggleButton = document.getElementById('toggleButton');

    if (sidebar.style.width === '250px') {
        sidebar.style.width = '0';
        repoFiles.style.visibility = 'hidden'; // 仅隐藏文件列表
        content.style.marginLeft = '0';
        toggleButton.textContent = '展开'; // 设置按钮文本为展开
    } else {
        sidebar.style.width = '250px';
        repoFiles.style.visibility = 'visible'; // 使文件列表可见
        content.style.marginLeft = '250px';
        toggleButton.textContent = '收缩'; // 设置按钮文本为收缩
    }
});


// 构建树形结构
function buildTree(data, parentElement) {
    let tree = document.createElement('ul');
    tree.className = 'tree';

    data.forEach(item => {
        let listItem = document.createElement('li');
        let textNode = document.createTextNode(item.name);

        // 添加箭头图标
        if (item.type === 'dir' && item.children && item.children.length > 0) {
            let arrowSpan = document.createElement('span');
            arrowSpan.innerHTML = '&#9654;'; // 右箭头表示可以展开
            arrowSpan.classList.add('expandable');
            listItem.appendChild(arrowSpan);
        }

        listItem.appendChild(textNode);
        listItem.className = item.type === 'file' ? 'file-item' : 'dir-item';

        if (item.type === 'dir') {
            listItem.addEventListener('click', function(e) {
                e.stopPropagation();
                if (!listItem.classList.contains('expanded')) {
                    listItem.classList.add('expanded');
                    fetchRepoFiles(item.path, listItem);
                } else {
                    listItem.classList.remove('expanded');
                    let subTree = listItem.getElementsByTagName('ul')[0];
                    if (subTree) {
                        listItem.removeChild(subTree);
                    }
                }
            });

            // 如果目录下有子目录或文件，递归构建树形结构
            if (item.children && item.children.length > 0) {
                let subTree = buildTree(item.children, listItem);
                listItem.appendChild(subTree);
            }
        } else if (item.name.endsWith('.md')) {
            listItem.addEventListener('click', function(e) {
                e.stopPropagation();

                // 移除所有已选中项的样式
                document.querySelectorAll('.file-item.selected').forEach(el => {
                    el.classList.remove('selected');
                });

                // 为当前点击项添加选中样式
                listItem.classList.add('selected');
                fetchFileContent(item.path);
            });
        }

        tree.appendChild(listItem);
    });

    if (parentElement) {
        parentElement.appendChild(tree);
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

     // 设置初始按钮文本
     var toggleButton = document.getElementById('toggleButton');
     if (document.getElementById('sidebar').style.width === '250px') {
         toggleButton.textContent = '收缩';
     } else {
         toggleButton.textContent = '展开';
     }

};
