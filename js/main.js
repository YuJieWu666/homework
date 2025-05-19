document.addEventListener("DOMContentLoaded", () => {
  // 获取DOM元素
  const pptPlayer = document.querySelector(".ppt-player");
  const slidesContainer = document.querySelector(".slides-container");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  const slideCounter = document.getElementById("slideCounter");
  let isFullscreen = false;

  // 初始化幻灯片
  function initializeSlides() {
    // 清空幻灯片容器
    slidesContainer.innerHTML = "";

    // 创建所有幻灯片
    slidesManager.slides.forEach((slideData, index) => {
      const slide = document.createElement("div");
      slide.className = "slide";
      if (index === slidesManager.getCurrentIndex()) {
        slide.classList.add("active");
      }

      // 根据幻灯片类型创建不同的内容
      if (slideData.type === "iframe") {
        // 创建iframe幻灯片
        createIframeSlide(slide, slideData);
      } else if (slideData.type === "cover") {
        // 创建封面幻灯片
        createCoverSlide(slide, slideData);
      } else {
        // 创建标准幻灯片
        createStandardSlide(slide, slideData);
      }

      slidesContainer.appendChild(slide);
    });

    // 更新计数器
    updateSlideCounter();

    // 更新按钮状态
    updateButtonStates();
  }

  // 创建iframe幻灯片
  function createIframeSlide(slide, slideData) {
    const iframe = document.createElement("iframe");
    iframe.src = slideData.src;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.position = "absolute";
    iframe.style.top = "0";
    iframe.style.left = "0";

    slide.appendChild(iframe);
    slide.style.padding = "0";
  }

  // 创建封面幻灯片
  function createCoverSlide(slide, slideData) {
    // 设置背景
    if (slideData.background) {
      slide.style.backgroundImage = `url('${slideData.background}')`;
      slide.style.backgroundSize = "cover";
      slide.style.backgroundPosition = "center";
    }

    // 创建一个容器用于放置内容
    const coverContent = document.createElement("div");
    coverContent.className = "cover-content";

    // 添加Logo
    if (slideData.logo) {
      const logoContainer = document.createElement("div");
      logoContainer.className = "logo-container";

      const logo = document.createElement("img");
      logo.src = slideData.logo;
      logo.alt = "Temu Logo";
      logo.className = "temu-logo";

      logoContainer.appendChild(logo);
      coverContent.appendChild(logoContainer);
    }

    // 添加标题
    const title = document.createElement("h1");
    title.innerHTML = slideData.title;
    title.className = "cover-title";
    coverContent.appendChild(title);

    // 添加副标题
    if (slideData.subtitle) {
      const subtitle = document.createElement("h2");
      subtitle.innerHTML = slideData.subtitle;
      subtitle.className = "cover-subtitle";
      coverContent.appendChild(subtitle);
    }

    // 添加小组信息和日期
    const infoContainer = document.createElement("div");
    infoContainer.className = "cover-info";

    if (slideData.groupInfo) {
      const groupInfo = document.createElement("p");
      groupInfo.innerHTML = slideData.groupInfo;
      groupInfo.className = "group-info";
      infoContainer.appendChild(groupInfo);
    }

    if (slideData.date) {
      const date = document.createElement("p");
      date.innerHTML = slideData.date;
      date.className = "date";
      infoContainer.appendChild(date);
    }

    coverContent.appendChild(infoContainer);
    slide.appendChild(coverContent);
  }

  // 创建标准幻灯片
  function createStandardSlide(slide, slideData) {
    const title = document.createElement("h1");
    title.innerHTML = slideData.title;

    const content = document.createElement("div");
    content.className = "slide-content";
    content.innerHTML = slideData.content || "";

    slide.appendChild(title);
    slide.appendChild(content);
  }

  // 更新幻灯片显示
  function updateSlideDisplay() {
    const slides = document.querySelectorAll(".slide");

    // 为当前活动的幻灯片添加退出动画
    slides.forEach((slide, index) => {
      if (slide.classList.contains("active")) {
        const direction =
          index < slidesManager.getCurrentIndex() ? "left" : "right";
        slide.classList.add("slide-out-" + direction);
        setTimeout(() => {
          slide.classList.remove("active", "slide-out-left", "slide-out-right");
        }, 800); // 动画持续时间
      }
    });

    // 等待动画完成后显示新幻灯片
    setTimeout(() => {
      slides.forEach((slide, index) => {
        if (index === slidesManager.getCurrentIndex()) {
          slide.classList.add("active");
        } else {
          slide.classList.remove("active");
        }
      });

      // 更新计数器
      updateSlideCounter();

      // 更新按钮状态
      updateButtonStates();
    }, 300);
  }

  // 更新幻灯片计数器
  function updateSlideCounter() {
    slideCounter.textContent = `${
      slidesManager.getCurrentIndex() + 1
    } / ${slidesManager.getSlideCount()}`;
  }

  // 更新按钮状态（禁用/启用）
  function updateButtonStates() {
    prevBtn.disabled = slidesManager.getCurrentIndex() === 0;
    nextBtn.disabled =
      slidesManager.getCurrentIndex() === slidesManager.getSlideCount() - 1;
  }

  // 下一张幻灯片
  function goToNextSlide() {
    if (slidesManager.goToNextSlide()) {
      updateSlideDisplay();
    }
  }

  // 上一张幻灯片
  function goToPrevSlide() {
    if (slidesManager.goToPrevSlide()) {
      updateSlideDisplay();
    }
  }

  // 全屏切换功能
  function toggleFullscreen() {
    if (!isFullscreen) {
      if (pptPlayer.requestFullscreen) {
        pptPlayer.requestFullscreen();
      } else if (pptPlayer.mozRequestFullScreen) {
        // Firefox
        pptPlayer.mozRequestFullScreen();
      } else if (pptPlayer.webkitRequestFullscreen) {
        // Chrome, Safari
        pptPlayer.webkitRequestFullscreen();
      } else if (pptPlayer.msRequestFullscreen) {
        // IE/Edge
        pptPlayer.msRequestFullscreen();
      }
      fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    }
    isFullscreen = !isFullscreen;
  }

  // 监听全屏变化事件
  document.addEventListener("fullscreenchange", handleFullscreenChange);
  document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
  document.addEventListener("mozfullscreenchange", handleFullscreenChange);
  document.addEventListener("MSFullscreenChange", handleFullscreenChange);

  function handleFullscreenChange() {
    isFullscreen = !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );

    fullscreenBtn.innerHTML = isFullscreen
      ? '<i class="fas fa-compress"></i>'
      : '<i class="fas fa-expand"></i>';
  }

  // 自动隐藏控制栏
  let controlsTimeout;
  pptPlayer.addEventListener("mousemove", () => {
    const controls = document.querySelector(".controls");
    controls.style.opacity = "1";

    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => {
      if (!controls.matches(":hover")) {
        controls.style.opacity = "0.3";
      }
    }, 3000);
  });

  // 事件监听器
  nextBtn.addEventListener("click", goToNextSlide);
  prevBtn.addEventListener("click", goToPrevSlide);
  fullscreenBtn.addEventListener("click", toggleFullscreen);

  // 键盘快捷键支持
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowRight":
      case " ": // 空格键
        goToNextSlide();
        break;
      case "ArrowLeft":
        goToPrevSlide();
        break;
      case "f": // f键切换全屏
      case "F":
        toggleFullscreen();
        break;
      case "Escape": // ESC退出全屏
        if (isFullscreen) {
          toggleFullscreen();
        }
        break;
    }
  });

  // 初始化幻灯片
  initializeSlides();
});
