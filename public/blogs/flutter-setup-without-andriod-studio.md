# Flutter + Android SDK (CLI-only) Setup on Linux

After a month of procrastination, I finally got into the mood to install Flutter on my Arch Linux system. This guide walks you through installing **Flutter without Android Studio**, using **only the command line**, and is applicable to **any Linux distribution** with minor package-manager changes.

> **Note**: Commands shown here are **Arch Linux–specific**. If you’re on another distro, replace package-manager commands accordingly.

---

## Step 0: Install Java (Required)

Flutter’s Android toolchain **requires Java 17**. Newer Java versions may be installed on your system, but Flutter + Gradle are most stable with Java 17.

### 0.1 Install Java 17 (Arch Linux)

```bash
sudo pacman -S jdk17-openjdk
```

---

### 0.2 Set Java 17 as the default version

Arch Linux may have multiple JDKs installed. Use `archlinux-java` to switch safely.

List installed Java versions:

```bash
archlinux-java status
```

Set Java 17 as default:

```bash
sudo archlinux-java set java-17-openjdk
```

Verify:

```bash
java -version
```

Expected output:

```bash
openjdk version "17.x.x"
```

---

## Step 1: Install Flutter (via Git)

Flutter is distributed as a **Git repository**, not a static binary. This means:

* Flutter versions are controlled using **Git tags**
* Upgrading/downgrading Flutter can be done via Git commands

### 1.1 Clone Flutter

```bash
sudo git clone https://github.com/flutter/flutter.git /opt/flutter
```

---

### 3.2 Download Command Line Tools (Linux)

From the official page:

[https://developer.android.com/studio#command-tools](https://developer.android.com/studio#command-tools)

Download **Command line tools only – Linux**.

---

### 3.3 Extract and place correctly

```bash
cd ~/Downloads
unzip commandlinetools-linux-*.zip
mv cmdline-tools $HOME/Android/Sdk/cmdline-tools/latest
```

Required directory structure:

```bash
Android/Sdk/
└── cmdline-tools/
    └── latest/
        └── bin/sdkmanager
```

---

## Step 4: Configure Android SDK environment variables

Add the following to `.zshrc`:

```bash
export ANDROID_SDK_ROOT="$HOME/Android/Sdk"
export ANDROID_HOME="$ANDROID_SDK_ROOT"
export PATH="$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin"
export PATH="$PATH:$ANDROID_SDK_ROOT/platform-tools"
```

Reload:

```bash
source ~/.zshrc
```

Verify:

```bash
sdkmanager --version
```

---

## Step 5: Install required Android SDK components

Flutter requires **specific versions**, not necessarily the latest.

### Example (as required by Flutter at the time of writing):

```bash
sdkmanager --install \
  "platform-tools" \
  "platforms;android-36" \
  "build-tools;28.0.3"
```

You can list installed versions anytime:

```bash
ls $ANDROID_SDK_ROOT/platforms
ls $ANDROID_SDK_ROOT/build-tools
```

---

## Step 6: Accept Android SDK licenses

```bash
yes | sdkmanager --licenses
```

---

## Step 7: Accept Flutter Android licenses

Tell Flutter where the Android SDK is (explicit and safe):

```bash
flutter config --android-sdk $ANDROID_SDK_ROOT
```

Accept Flutter licenses:

```bash
flutter doctor --android-licenses
```

---

## Step 8: Verify everything

```bash
flutter doctor
```

Expected output:

```bash
[✓] Android toolchain - develop for Android devices
```

At this point, Flutter apps will build and run correctly.

---

# Bonus: Controlling Flutter Version using Git

Because Flutter itself is a Git repository, **version control is built in**.

---

## Check current Flutter channel & version

```bash
flutter --version
flutter channel
```

---

## Switch Flutter channels

```bash
flutter channel stable
flutter upgrade
```

Available channels:

* `stable`
* `beta`
* `dev`
* `master`

---

## Lock Flutter to a specific version (example)

List available tags:

```bash
cd /opt/flutter
git tag
```

Checkout a specific version:

```bash
sudo git checkout 3.24.5
flutter doctor
```

Flutter will now remain **pinned** to that version until you change it.

---

## Upgrade Flutter later

```bash
flutter upgrade
```

Or reset to the latest stable release:

```bash
git checkout stable
flutter upgrade
```

---
