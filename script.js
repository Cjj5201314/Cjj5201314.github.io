<<<<<<< HEAD
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

function fetchRepoFiles() {
    fetch('https://api.github.com/repos/Cjj5201314/Cjj5201314.github.io/contents/')
    .then(response => response.json())
    .then(data => {
        let filesList = document.getElementById('repoFiles');
        filesList.innerHTML = ''; // 清空当前内容
        data.forEach(file => {
            let listItem = document.createElement('div');
            listItem.textContent = file.name;
            // 可以根据需要为不同类型的文件添加不同的处理方式或样式
            filesList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error:', error));
}

// 当页面加载完毕时，获取文件列表
window.onload = fetchRepoFiles;
=======
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

function fetchRepoFiles() {
    fetch('https://api.github.com/repos/Cjj5201314/Cjj5201314.github.io/contents/')
    .then(response => response.json())
    .then(data => {
        let filesList = document.getElementById('repoFiles');
        filesList.innerHTML = ''; // 清空当前内容
        data.forEach(file => {
            let listItem = document.createElement('div');
            listItem.textContent = file.name;
            // 可以根据需要为不同类型的文件添加不同的处理方式或样式
            filesList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error:', error));
}

// 当页面加载完毕时，获取文件列表
window.onload = fetchRepoFiles;
>>>>>>> 87fa5fe7c1deeecb68c07bb60d01e61528842cc1
