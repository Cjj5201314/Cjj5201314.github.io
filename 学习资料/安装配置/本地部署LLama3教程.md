## 本地部署LLama3教程

### 一、安装Ollama

去官网https://ollama.com/download下载

![](https://cdn.jsdelivr.net/gh/Cjj5201314/Picture@main/Data/Pictures/708b0c6b5c94579c99e432744f072f3.bmp)

下载安装好后不用管什么，继续下载其他的东西，我们要做webui版的



### 二、安装Docker Desktop

（https://www.docker.com/products/docker-desktop/）

![](https://cdn.jsdelivr.net/gh/Cjj5201314/Picture@main/Data/Pictures/e25ea566752d0ee86ec7cfb35741d02.png)



### 三、安装 Ollama WebUI

上面两个下载好后去命令行

运行以下 docker 命令以在本地计算机上部署 llama-webui docker 容器。如果您的计算机上有 Ollama，请使用以下命令：

```
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

![](https://cdn.jsdelivr.net/gh/Cjj5201314/Picture@main/Data/Pictures/33b0aa9ea1a1d19a0ebbb69e8b39977.png)



### 四、登录打开 WebUI

这个时候去浏览器打开http://localhost:3000就可以访问Open WebUI，第一次进去需要注册

![](https://cdn.jsdelivr.net/gh/Cjj5201314/Picture@main/Data/Pictures/cf0134005a3708bbda56192fa93fe92.png)

![](https://cdn.jsdelivr.net/gh/Cjj5201314/Picture@main/Data/Pictures/5a0479d03330003db69a75b6791c5a3.png)



### 五、从 Ollama.com 提取模型

点击下角设置，打开设置窗口，如下图，输入型号标签（如：llama3:8b、codeqwen等）点击右侧下载按钮，等待型号待下载。还可以在通用里面设置语言

![](https://cdn.jsdelivr.net/gh/Cjj5201314/Picture@main/Data/Pictures/ea385a0831d5b61810cfe32af51d853.png)



### 六、选择自己想用的模型就可以正常聊天了

![](https://cdn.jsdelivr.net/gh/Cjj5201314/Picture@main/Data/Pictures/9c4c49fde80e8071a2642d4c5a6e11c.png)



## 总结

**在这篇文章中，我介绍如何在 Windows 上安装 Ollama WebUI 的入门基础知识**。**Ollama 以其简单直观的操作界面、智能识别并利用硬件资源的自动加速功能以及提供丰富涵盖各种任务和场景的预训练模型库，独树一帜，成为任何对人工智能和机器学习感兴趣的人的宝贵工具。**

上面需要下载的两个安装包，如果觉得访问网址慢就使用我上传到夸克的安装包

链接：https://pan.quark.cn/s/3b8ad26a1a00
提取码：Cd9Y
