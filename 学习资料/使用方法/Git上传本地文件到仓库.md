# 新建Git仓库后！如何将本地项目直接推送上到git仓库中
### 一、在GitHub上面新建一个仓库，这里就不演示了
### 二、来到本地仓库

第一步：鼠标右键 打开Git Bash Here命令框
![G1上传][G1]

[G1]:./img/git上1.png

第二步：依次输出下面的命令

*初始化*

`git init`

![G2上传][G2]

[G2]:./img/git上2.png

*将本地项目 加入本地缓存*

`git add .`

![G3上传][G3]

[G3]:./img/git上3.png

*提交本地 并添加提交的说明*

`git commit -m "初版"`

![G4上传][G4]

[G4]:./img/git上4.png

*切换 分支 到Main*

`git branch -M main`

![G5上传][G5]

[G5]:./img/git上5.png

*与远程git仓库建立关联 (如果已经连接过一次后下一次这个仓库就不用在连接)*

`git remote add origin git@github.com:[你的用户名称]/[你的仓库名称].git`

![G6上传][G6]

[G6]:./img/git上6.png

`**推送**`

`git push -u origin main`

![G7上传][G7]

[G7]:./img/git上7.png

### 到这一步遇到问题，这个错误通常出现在两个不同的 Git 仓库尝试合并历史时，特别是在初始化一个新的本地仓库并尝试将其推送到远程仓库时。

解决方法如下：

*一、将远程的 main 分支与本地的 main 分支关联起来*

`git branch --set-upstream-to=origin/main main`

![G问1上传][G问1]

[G问1]:./img/git问1.png

*然后再执行*

`git pull origin main`

![G问2上传][G问2]

[G问2]:./img/git问2.png

`再尝试推送`

`git push origin main`

![G问3上传][G问3]

[G问3]:./img/git问3.png

#### 但是还是遇到问题，遇到 "refusing to merge unrelated histories" 的问题

*强制将本地分支推送到远程分支，这会强制将本地 main 分支推送到远程 main 分支，覆盖远程分支的历史。*

`git push -u --force origin main`

![G问4上传][G问4]

[G问4]:./img/git问4.png

*然后再次推出送*

`git push -u origin main`

![G问5上传][G问5]

[G问5]:./img/git问5.png

到这就上传成功了，然后我们在去GitHub上面验证一下

![G问6上传][G问6]

[G问6]:./img/git问6.png



