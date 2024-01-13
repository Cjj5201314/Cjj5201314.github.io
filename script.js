function buildDirectoryTree(data, parentPath = '') {
    let tree = document.createElement('ul');

    data.forEach(item => {
        let listItem = document.createElement('li');
        let textNode = document.createTextNode(item.name);
        listItem.appendChild(textNode);
        listItem.className = item.type === 'file' ? 'file-item' : 'dir-item';

        if (item.type === 'dir') {
            listItem.addEventListener('click', function(e) {
                e.stopPropagation();
                if (!listItem.classList.contains('expanded')) {
                    fetchRepoFiles(`${parentPath}/${item.name}`, listItem);
                } else {
                    let subTree = listItem.getElementsByTagName('ul')[0];
                    listItem.removeChild(subTree);
                    listItem.classList.remove('expanded');
                }
            });
        } else if (item.name.endsWith('.md')) {
            listItem.addEventListener('click', function() {
                fetchFileContent(`${parentPath}/${item.name}`);
            });
        }

        tree.appendChild(listItem);
    });

    return tree;
}

function fetchRepoFiles(path = '学习资料', parentElement) {
    const apiUrl = `https://api.github.com/repos/Cjj5201314/Cjj5201314.github.io/contents/${path}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let filesList = document.getElementById('repoFiles');
            filesList.innerHTML = '';

            if (Array.isArray(data)) {
                let directoryTree = buildDirectoryTree(data, path);
                if (parentElement) {
                    parentElement.appendChild(directoryTree);
                    parentElement.classList.add('expanded');
                } else {
                    filesList.appendChild(directoryTree);
                }
            } else {
                console.error('Data is not an array:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching directory:', error);
        });
}

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

window.onload = function() {
    fetchRepoFiles();
};
