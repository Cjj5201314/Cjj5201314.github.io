# 安装及配置Git教程

### 1、下载git
Git官网：https://git-scm.com/

### 2、安装git
下载好Git后去安装，在这个安装过程中只需要修改下面图片的地方，其他一路next（文件路径看个人喜好）

![2上传][2]

[2]:./img/git安装2.png

### 3、配置
桌面右键——>显示更多选项——>git bash here

![3上传][3]

[3]:./img/git配置1.png

配置邮箱和用户名(–global表示全局配置)

```
#配置用户名，"test"换成你的git用户名字
git config --global user.name "test"

#配置邮箱，abc@163.com 换成你的git邮箱
git config --global user.email  abc@163.com
```

![4上传][4]

[4]:./img/git配置2.png

查询配置：`git config --global --list`

![5上传][5]

[5]:./img/git配置3.png

生成ssh文件夹（生成ssh秘钥）（输入$ ssh-keygen -t rsa，敲击三次回车键），文件目录-C:\Users\用户名.ssh；

![6上传][6]

[6]:./img/git配置4.png

文件存放的位置

`默认是C:\Users\当前用户名\.ssh`

如果看不到.ssh文件夹，查看文件夹属性，勾选显示隐藏文件夹

![7上传][7]

[7]:./img/git配置5.png
将ssh文件夹中的公钥（ id_rsa.pub）添加到GitHub管理平台中（添加后会收到邮件提示。
按照下面步骤来添加

1、在浏览器中打开你的GitHub管理平台，点击头像，找到“设置”

![8上传][8]

[8]:./img/git配置6.png
2、进入“设置”后找到“SSH Keys”

![9上传][9]

[9]:./img/git配置7.png
3、输入复制的密钥

![10上传][10]

[10]:./img/git配置8.png
### 到这里就Git配置就成功了

如果想看git如何创建本地版本库就去下面链接
https://zhuanlan.zhihu.com/p/597447255

