### 在ubuntu上面部署llama.cpp

**克隆 llama.cpp 仓库并构建**：

git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp

**使用 `CMake` 构建，可以按照以下步骤进行：**

mkdir build
cd build
cmake ..
cmake --build . --config Release

等待编译即可