(function () {
  'use strict';
  window.BESPOKE = window.BESPOKE || {};

  class Configurator {
    constructor(el = container, args) {
      const defParams = {
        el,
        gallery: '.watch-view__gallery',
        galleryPrev: '.watch-view__gallery-prev',
        galleryNext: '.watch-view__gallery-next',
        galleryPagination: '.watch-view__gallery-pagination',
        case: '.value-case',
        casePrev: '.case-prev',
        caseNext: '.case-next',
        band: '.value-band',
        bandPrev: '.band-prev',
        bandNext: '.band-next',
        caseTab: '.case-item',
        caseContent: '.case__item',
        caseItem: '.case-item-list',
        bandTab: '.band-item',
        bandContent: '.band__item',
        bandItem: '.band-item-list',
      };
      this.opts = UTILS.def(defParams, args || {});
      this.classes = defParams.classes;
      this.el = document.querySelector(el);
      this.init();
    }

    init() {
      this.getCurrentDevice();
      this.setting();
      this.bindEvent();
      this.setGallery();
      this.setCase();
      this.setBand();
    }

    setting() {
      this.gallery = this.el.querySelector(this.opts.gallery);
      this.galleryPrev = this.el.querySelector(this.opts.galleryPrev);
      this.galleryNext = this.el.querySelector(this.opts.galleryNext);
      this.galleryPagination = this.el.querySelector(this.opts.galleryPagination);
      this.case = this.el.querySelector(this.opts.case);
      this.band = this.el.querySelector(this.opts.band);
      this.caseTab = this.el.querySelectorAll(this.opts.caseTab);
      this.caseContent = this.el.querySelectorAll(this.opts.caseContent);
      this.caseItem = this.el.querySelectorAll(this.opts.caseItem);
      this.bandTab = this.el.querySelectorAll(this.opts.bandTab);
      this.bandContent = this.el.querySelectorAll(this.opts.bandContent);
      this.bandItem = this.el.querySelectorAll(this.opts.bandItem);
    }

    bindEvent() {
      this.caseTab.forEach(el => {
        el.addEventListener('click', this.onClickCaseTab.bind(this));
      });
      this.caseItem.forEach(el => {
        el.addEventListener('click', this.onClickCaseItem.bind(this));
      });
      this.bandTab.forEach(el => {
        el.addEventListener('click', this.onClickBandTab.bind(this));
      });
      this.bandItem.forEach(el => {
        el.addEventListener('click', this.onClickBandItem.bind(this));
      });

      this.galleryPrev.addEventListener('click', this.onClickFirst.bind(this));
      this.galleryNext.addEventListener('click', this.onClickLast.bind(this));
      this.galleryPagination.addEventListener('mousedown', this.onMouseDown.bind(this));
      this.galleryPagination.addEventListener('touchstart', this.onMouseDownMobile.bind(this));
      this.galleryPagination.addEventListener('mouseup', this.onMouseUp.bind(this));
      this.galleryPagination.addEventListener('touchend', this.onMouseUp.bind(this));
    }

    setGallery() {
      this.swiperG = {
        instance: null,
        options: {
          loop: true,
          loopedSlides: 1,
          initialSlide: 2,
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          },
          navigation: {
            prevEl: this.galleryPrev,
            nextEl: this.galleryNext
          },
          pagination: {
            el: this.galleryPagination,
            clickable: true,
            renderBullet: function (index, className) {
              return '<button class="' + className + '"></button>';
            }
          },
        },
        build: () => {
          this.swiperG.instance = new Swiper(this.gallery, this.swiperG.options);
          
          const realIndex = this.swiperG.instance.realIndex;
          const paginationItem = this.galleryPagination.children;
          
          for (let i = 0; i < realIndex; i++) {
            paginationItem[i].classList.add('is-active');
          }

          paginationItem[realIndex].innerHTML = '<span class="hover-icon"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 21.998 14"><g transform="translate(-707.902 -709)"><path d="M13.27,3.173l.685.717L7.391,10.173l6.565,6.283-.685.717-7.313-7Z" transform="translate(701.945 705.827)"/><path d="M7.957,3.89l.685-.717,7.313,7-7.313,7-.685-.717,6.565-6.283Z" transform="translate(713.945 705.827)"/></g></svg></span>';
          
          this.swiperG.instance.on('slideChange', function () {
            const changeIndex = this.realIndex;

            for (let i = 0; i < paginationItem.length; i++) {
              paginationItem[i].classList.remove('is-active');
            }

            for (let i = 0; i < changeIndex || i === changeIndex; i++) {
              paginationItem[i].classList.add('is-active');
            }

            paginationItem[changeIndex].innerHTML = '<span class="hover-icon"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 21.998 14"><g transform="translate(-707.902 -709)"><path d="M13.27,3.173l.685.717L7.391,10.173l6.565,6.283-.685.717-7.313-7Z" transform="translate(701.945 705.827)"/><path d="M7.957,3.89l.685-.717,7.313,7-7.313,7-.685-.717,6.565-6.283Z" transform="translate(713.945 705.827)"/></g></svg></span>';
          });
        }
      };
      this.swiperG.build();
    }

    onClickFirst() {
      if (this.swiperG.instance.realIndex === 0) {
        this.swiperG.instance.slideTo(this.swiperG.instance.slides.length - 3);
      }
    }

    onClickLast() {
      if (this.swiperG.instance.realIndex === this.swiperG.instance.slides.length - 3) {
        this.swiperG.instance.slideTo(2);
      }
    }

    onMouseDown(e) {
      const paginationItem = this.galleryPagination.children;
      let activeIndex = null;
      
      for (let i = 0; i < paginationItem.length; i++) {
        if (paginationItem[i].classList.contains('swiper-pagination-bullet-active')) {
          activeIndex = i;
          break;
        }
      }
      
      const startPosition = paginationItem[activeIndex].getBoundingClientRect();

      if (e.clientX >= startPosition.left && e.clientX <= startPosition.right) {
        this.startDrag = e.clientX || e.touches[0].clientX;
      }
    }

    onMouseDownMobile(e) {
      this.startDrag = e.clientX || e.touches[0].clientX;
    }
    
    onMouseUp(e) {
      if (!this.startDrag) return;
    
      const endDrag = e.clientX || e.changedTouches[0].clientX;
      const paginationItem = this.galleryPagination.children;
      let targetBulletIndex = null;

      for (let i = 0; i < paginationItem.length; i++) {
        const bullet = paginationItem[i];
        const bulletRect = bullet.getBoundingClientRect();

        if (endDrag >= bulletRect.left && endDrag <= bulletRect.right) {
          targetBulletIndex = i + 1;
          break;
        }
      }

      if (targetBulletIndex !== null) {
        this.swiperG.instance.slideTo(targetBulletIndex);
      }

      this.startDrag = null;
    }

    setCase() {
      this.swiperC = {
        instance: null,
        options: {
          slidesPerView: 'auto',
          slideToClickedSlide: true,
          navigation: {
            prevEl: this.opts.casePrev,
            nextEl: this.opts.caseNext
          }
        },
        build: () => {
          this.swiperC.instance = new Swiper(this.case, this.swiperC.options);
          const caseContent = Array.from(this.caseContent);

          this.swiperC.instance.on('slideChange', function () {
            const realIndex = this.activeIndex;

            for (let index = 0; index < caseContent.length; index++) {
              caseContent[index].classList.remove('is-active');

              if (index === realIndex) {
                caseContent[index].classList.add('is-active');
              }
            }
          });
        }
      };
      this.swiperC.build();
    }

    setBand() {
      this.swiperB = {
        instance: null,
        options: {
          slidesPerView: 'auto',
          slideToClickedSlide: true,
          draggable: true,
          navigation: {
            prevEl: this.opts.bandPrev,
            nextEl: this.opts.bandNext
          }
        },
        build: () => {
          this.swiperB.instance = new Swiper(this.band, this.swiperB.options);
          const bandContent = Array.from(this.bandContent);

          this.swiperB.instance.on('slideChange', function () {
            const realIndex = this.activeIndex;

            for (let index = 0; index < bandContent.length; index++) {
              bandContent[index].classList.remove('is-active');

              if (index === realIndex) {
                bandContent[index].classList.add('is-active');
              }
            }
          });
        }
      };
      this.swiperB.build();
    }

    onClickCaseTab(e) {
      const i = Array.from(this.caseTab).indexOf(e.target.parentNode);
      
      this.caseTab.forEach(item => {
        item.classList.remove('swiper-slide-active', 'swiper-slide-prev', 'swiper-slide-next');

        this.caseTab[i].className = 'watch-select__value-item case-item swiper-slide swiper-slide-active';
        if (item === this.caseTab[i-1]) {
          this.caseTab[i-1].className = 'watch-select__value-item case-item swiper-slide swiper-slide-prev';
        } else if (item === this.caseTab[i+1]) {
          this.caseTab[i+1].className = 'watch-select__value-item case-item swiper-slide swiper-slide-next';
        }
      });

      this.caseContent.forEach(item => {
        item.classList.remove('is-active');
        this.caseContent[i].classList.add('is-active');
      });
    }

    onClickBandTab(e) {
      const i = Array.from(this.bandTab).indexOf(e.target.parentNode);
      
      this.bandTab.forEach(item => {
        item.classList.remove('swiper-slide-active', 'swiper-slide-prev', 'swiper-slide-next');

        this.bandTab[i].className = 'watch-select__value-item band-item swiper-slide swiper-slide-active';
        if (item === this.bandTab[i-1]) {
          this.bandTab[i-1].className = 'watch-select__value-item band-item swiper-slide swiper-slide-prev';
        } else if (item === this.bandTab[i+1]) {
          this.bandTab[i+1].className = 'watch-select__value-item band-item swiper-slide swiper-slide-next';
        }
      });

      this.bandContent.forEach(item => {
        item.classList.remove('is-active');
        this.bandContent[i].classList.add('is-active');
      });
    }

    onClickCaseItem(e) {
      const clickItem = e.currentTarget;

      this.caseItem.forEach(item => {
        item.classList.remove('is-select');
      });

      clickItem.classList.add('is-select');
    }

    onClickBandItem(e) {
      const clickItem = e.currentTarget;

      this.bandItem.forEach(item => {
        item.classList.remove('is-select');
      });

      clickItem.classList.add('is-select');
    }

    getCurrentDevice() {
      if (window.innerWidth >= UTILS.RESPONSIVE.TABLET.WIDTH) this.currDevice = 'desktop';
      else if (window.innerWidth > UTILS.RESPONSIVE.MOBILE.WIDTH && window.innerWidth < UTILS.RESPONSIVE.TABLET.WIDTH) this.currDevice = 'tablet';
      else this.currDevice = 'mobile';
    }

    onLoadHandler(e) {
      this.onResizeHandler();
      window.removeEventListener('load', this.onLoadHandler.bind(this));
    }

    onResizeHandler() {
      this.getCurrentDevice();

      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.onResponsive();
      }, 100);

      if (this.currDevice != this.prevDevice) {
        this.onResponsiveChange();
        this.prevDevice = this.currDevice;
      }
    }

    onResponsive() {
      
    }

    onResponsiveChange() {
      this.onResponsive();
    }

    outCallback(ing, param) {
      var callbackObj = this.opts.on[ing];
      if (callbackObj == null) return;
      callbackObj(param);
    }
  }

  BESPOKE.Configurator = Configurator;
})();