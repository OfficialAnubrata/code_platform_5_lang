# code_platform_5_lang

java : openjdk<br>
python : python3<br>
c: gcc<br>
cpp: g++<br>
javascript: nodejs<br>

```platform: Ubuntu```

### Step 1: Go to Super User
```bash
sudo su
apt update
apt upgrade -y
```
### Step 2: Install Node.js and Npm
```bash
apt install curl -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install --lts
node -v
npm -v
```
### Step 3: Install JDK
```bash
apt install default-jdk -y
```

### Step 4: Install GCC
```bash
apt install gcc -y
```
### Step 5: Install G++
```bash
apt install g++ -y
```
### Step 6: Install python
```bash
apt install python3 -y
```
### step 7: After Entering Directory
```bash
cd "directory_name"
npm i
npm start
```
