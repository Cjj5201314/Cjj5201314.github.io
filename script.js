function buildDirectoryTree(data, parentPath = '') {
  let tree = document.createElement('ul');

  data.forEach(item => {
    let listItem = document.createElement('li');
    let textNode = document.createTextNode(item.name);
    listItem.appendChild(textNode);
    listItem.className = item.type === 'file' ? 'file-item' : 'dir-item';

    if (item.type === 'dir') {
      listItem.addEventListener('click', function(e) {
        e.stopPropagation(); // 防止事件冒泡到父元素
        if (!listItem.classList.contains('expanded')) {
          // 如果目录未展开，则获取内容并展开
          fetchRepoFiles(`${parentPath}/${item.name}`, listItem);
        } else {
          // 如果目录已展开，则折叠
          let subTree = listItem.getElementsByTagName('ul')[0];
          listItem.removeChild(subTree);
          listItem.classList.remove('expanded');
        }
      });
    } else {
      listItem.addEventListener('click', function() {
        fetchFileContent(`${parentPath}/${item.name}`);
      });
    }

    tree.appendChild(listItem);
  });

  return tree;
}

function fetchRepoFiles(path, parentElement) {
  const apiUrl = `https://api.github.com/repos/Cjj5201314/Cjj5201314.github.io/contents${path}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) {
        let directoryTree = buildDirectoryTree(data, path);
        if (parentElement) {
          // 如果传入了父元素，则将目录树附加为子元素，并标记为已展开
          parentElement.appendChild(directoryTree);
          parentElement.classList.add('expanded');
        } else {
          // 如果没有传入父元素，则这是顶级目录
          let filesList = document.getElementById('repoFiles');
          filesList.innerHTML = '';
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

// 初始化顶级目录“学习资料”
window.onload = function() {
  fetchRepoFiles('/学习资料'); // 调整路径以匹配GitHub API的期望格式
};
