// 定义幻灯片内容
const slidesData = [
  {
    type: "iframe",
    src: "slide1.html",
  },
  {
    type: "iframe",
    src: "slide2.html",
  },
  {
    type: "iframe",
    src: "slide_chapter1.html",
  },
  {
    type: "iframe",
    src: "slide3.html",
  },
  {
    type: "iframe",
    src: "slide4.html",
  },
  {
    type: "iframe",
    src: "slide5.html",
  },
  {
    type: "iframe",
    src: "slide7.html",
  },
  {
    type: "iframe",
    src: "slide_chapter2.html",
  },
  {
    type: "iframe",
    src: "slide8.html",
  },
  {
    type: "iframe",
    src: "slide9.html",
  },
  {
    type: "iframe",
    src: "slide10.html",
  },
  {
    type: "iframe",
    src: "slide11.html",
  },
  {
    type: "iframe",
    src: "slide_chapter3.html",
  },
  {
    type: "iframe",
    src: "slide13.html",
  },
  {
    type: "iframe",
    src: "slide14.html",
  },
  {
    type: "iframe",
    src: "slide15.html",
  },
  {
    type: "iframe",
    src: "slide16.html",
  },
  {
    type: "iframe",
    src: "slide17.html",
  },
  {
    type: "iframe",
    src: "slide_chapter4.html",
  },
  {
    type: "iframe",
    src: "slide19.html",
  },
  {
    type: "iframe",
    src: "slide20.html",
  },
  {
    type: "iframe",
    src: "slide21.html",
  },
  {
    type: "iframe",
    src: "slide_chapter5.html",
  },
  {
    type: "iframe",
    src: "slide23.html",
  },
  {
    type: "iframe",
    src: "slide24.html",
  },
  {
    type: "iframe",
    src: "slide25.html",
  },
  {
    type: "iframe",
    src: "slide26.html",
  },
  {
    type: "iframe",
    src: "slide27.html",
  },
  {
    type: "iframe",
    src: "slide28.html",
  },
  {
    type: "iframe",
    src: "slide29.html",
  },
  {
    type: "iframe",
    src: "slide30.html",
  },
  {
    type: "iframe",
    src: "slide31.html",
  },
  {
    type: "iframe",
    src: "slide22.html",
  },

  // 这里将添加其他幻灯片内容
];

// 幻灯片数据相关的函数
class SlidesManager {
  constructor(slidesData) {
    this.slides = slidesData;
    this.currentIndex = 0;
  }

  getCurrentSlide() {
    return this.slides[this.currentIndex];
  }

  getSlideCount() {
    return this.slides.length;
  }

  goToNextSlide() {
    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
      return true;
    }
    return false;
  }

  goToPrevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return true;
    }
    return false;
  }

  goToSlide(index) {
    if (index >= 0 && index < this.slides.length) {
      this.currentIndex = index;
      return true;
    }
    return false;
  }

  getCurrentIndex() {
    return this.currentIndex;
  }
}

// 导出幻灯片管理器
const slidesManager = new SlidesManager(slidesData);
