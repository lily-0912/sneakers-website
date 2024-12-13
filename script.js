//　ハンバーガー

const hamburgerParent = document.querySelector("#js__l-header"),
      hamburger = document.querySelector("#js__hamburger"),
      hamburgerBackground = document.querySelector("#js__hamburger-background"),
      hamburgerNav = document.querySelector("#js__l-header-nav")

hamburger.addEventListener("click" , function(){
  hamburgerParent.classList.toggle("nav-open");
})

hamburgerBackground.addEventListener("click" , function(){
  hamburgerParent.classList.remove("nav-open");
});

hamburgerNav.addEventListener("click" , function(){
  hamburgerParent.classList.remove("nav-open");
});



// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓質問部分↓↓↓↓↓↓↓↓↓↓↓↓


// 無限スライダー

const sliderContainer = document.querySelector("#js__slider-container");
const sliderImages = Array.from(sliderContainer.children);

const duplicateImages = () => {

  let parentIndex = 0;
    if(parentIndex <= sliderImages.length){
      for(let index = 0; index <= sliderImages.length; index++){   
        sliderImages.forEach((sliderImage) => {
          const sliderImageClone = sliderImage.cloneNode("true");
          sliderContainer.appendChild(sliderImageClone);
      });
      }
    } else {
      let parentIndex = 0;
    };
};

duplicateImages();

let currentX = 0;

const animateSlider = () => {
  currentX -= 2; // 1pxずつ移動
  sliderContainer.style.transform = `translateX(${currentX}px)`;
  requestAnimationFrame(animateSlider);
};

animateSlider(); 

const removeImages = () => {
  const innerWidth = window.innerWidth;

  sliderImages.forEach((sliderImage) => {
    // スタイル情報を取得
    const computedStyle = window.getComputedStyle(sliderImage);
    const sliderImageTransform = computedStyle.getPropertyValue('transform');

    // transform の値を解析
    const sliderImageMatrix = sliderImageTransform.match(/^matrix\((.+)\)$/);
    if (!sliderImageMatrix) return; // matrix が存在しない場合スキップ
    const sliderImageX = parseFloat(sliderImageMatrix[1].split(', ')[4]); // X座標を取得

    // 指定範囲を超えた場合に削除
    if (sliderImageX > innerWidth + 500) {
      sliderImage.remove(); // 要素を削除
    }
  });
};

removeImages();



// featureフェードイン

const feadIns = document.querySelectorAll(".js__fead-in");

const callback = function(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
        entry.target.classList.add("fead-in");
      observer.unobserve(entry.target); // 必要に応じて監視を解除
    }
  });
};

const io = new IntersectionObserver(callback);

feadIns.forEach((feadIn) => {
  io.observe(feadIn);
});
