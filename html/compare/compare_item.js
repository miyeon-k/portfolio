(function () {
  'use strict';
  window.TAB_S9 = window.TAB_S9 || {};

  const UTILS = TAB_S9.UTILS;
  const RESPONSIVE = UTILS.RESPONSIVE;

  class CompareItem {
    constructor(el = container, args) {
      const defParams = {
        el,
        compare: '.wearable-tab-compare',
        compareName: '.wearable-tab-compare__name',
        compareNameSelector: '.wearable-tab-compare__name-selector',
        compareNameSelectorText: '.wearable-tab-compare__name-selector-txt',
        compareDropdownItem: '.wearable-tab-compare__dropdown-item',
        compareDropdownDevice: '.wearable-tab-compare__dropdown-device',
        compareProduct: '.wearable-tab-compare__product',
        compareProductImage: '.wearable-tab-compare__product-image',
        compareColor: '.wearable-tab-compare__color',
        compareColorChip: '.wearable-tab-compare__color-chip',
        compareCtaItem: '.wearable-tab-compare__cta-item',
        compareInfo: '.wearable-tab-compare__info',
        compareInfoItem: '.wearable-tab-compare__info-item',
        sTitle: '.s-title',
        sValue: '.s-value',
        buyCta: '.buy__cta',
        buyCtaText: '.buy__cta span',
        learnmoreCta: '.learn-more__cta',
        learnmoreCtaText: '.learn-more__cta span',
        initIndex: 0,
        classes: {
          isActive: 'is-active',
          isSelected: 'is-selected'
        },
      };
      this.opts = UTILS.def(defParams, args || {});
      this.classes = defParams.classes;
      this.el = el;
      this.init();
    }

    init() {
      if (this.el === null) return;
      this.setting();
      this.initOpts();
      this.bindEvent();
      this.initLayout();
    }

    initOpts() {
      this.targetIndex = this.opts.initIndex;
      this.baseImageSrc = this.compare.dataset.imageSrc;
    }

    setting() {
      this.compare = document.querySelector(this.opts.compare);
      this.compareName = this.el.querySelector(this.opts.compareName);
      this.compareNameAll = this.el.querySelectorAll(this.opts.compareName);
      this.compareNameSelector = this.el.querySelectorAll(this.opts.compareNameSelector);
      this.compareNameSelectorText = this.el.querySelector(this.opts.compareNameSelectorText);
      this.compareDropdownItem = this.el.querySelectorAll(this.opts.compareDropdownItem);
      this.compareProduct = this.el.querySelector(this.opts.compareProduct);
      this.compareProductImage = this.el.querySelectorAll(this.opts.compareProductImage);      
      this.compareColor = this.el.querySelector(this.opts.compareColor);
      this.compareColorChip = this.el.querySelectorAll(this.opts.compareColorChip);
      this.compareInfo = this.el.querySelector(this.opts.compareInfo);
      this.compareInfoItem = this.compareInfo.querySelectorAll(this.opts.compareInfoItem);
      this.buyCta = this.el.querySelector(this.opts.buyCta);
      this.buyCtaText = this.el.querySelector(this.opts.buyCtaText);
      this.learnmoreCta = this.el.querySelector(this.opts.learnmoreCta);
      this.learnmoreCtaText = this.el.querySelector(this.opts.learnmoreCtaText);
    }

    bindEvent() {
      this.compareNameAll.forEach(el => {
        el.addEventListener('click', this.clickCompareName.bind(this));
      });
      this.compareDropdownItem.forEach(el => {
        el.addEventListener('click', this.clickDropdownItem.bind(this));
      });
      this.compareColorChip.forEach((el, index) => {
        el.addEventListener('click', () => this.clickColor(index));
      });
      document.body.addEventListener('click', this.clickOutside.bind(this));
    }

    initLayout() {
      this.compareDropdownItem.forEach((el, index) => {
        // 레퍼런스 사이트에서 없는 모델명
        if (index === 3 || index === 4) {
          el.remove();
          return;
        }

        // 초기 is-selected된 제품
        if (el.classList.contains(this.classes.isSelected)) {
          this.currentProduct = el.dataset.modelName;
          el.querySelector(this.opts.compareDropdownDevice).setAttribute('title', 'selected');
          this.compareNameSelectorText.innerText = el.querySelector(this.opts.compareDropdownDevice).innerText;
        } else {
          el.querySelector(this.opts.compareDropdownDevice).removeAttribute('title');
        }
      });

      // 현재 선택된(is-selected) 제품이 없을 때
      if (!this.currentProduct && this.compareDropdownItem.length > 0) {
        const firstItem = this.compareDropdownItem[0];
        this.currentProduct = firstItem.dataset.modelName;
        firstItem.classList.add(this.classes.isSelected);
        firstItem.querySelector(this.opts.compareDropdownDevice).setAttribute('title', 'selected');
        this.compareNameSelectorText.innerText = firstItem.querySelector(this.opts.compareDropdownDevice).innerText;
      }

      this.DATA = LOCAL_DATA[this.currentProduct];
      this.updateLayout();
    }

    updateLayout() {
      this.targetIndex = this.opts.initIndex;
      this.setImage();
      this.setColor();
      this.setCta();
      this.setInfo();
      this.updateImageLoader();
    }

    setImage() {
      const html = [];
      this.DATA.colors.forEach((el, index) => {
        const isActive = this.targetIndex === index ? this.classes.isActive : '';
        const src = this.baseImageSrc + "/" + el.thumnailSrc;
        html.push(
          `<div class="wearable-tab-compare__product-image ${isActive}">
            <img src="${src}" class="js-start-img-src js-res-img" data-src-pc="${src}" data-src-tablet="${src}?imwidth=1080" data-src-mobile="${src}" alt="${el.alt}">
          </div>`
        );
      });
      const innerHtml = html.join('');
      this.compareProduct.innerHTML = innerHtml;

      // clickColor()에서 이미지 동작으로 필요
      this.compareProductImage = this.el.querySelectorAll(this.opts.compareProductImage);
    }

    setColor() {
      const html = [];
      this.DATA.colors.forEach((el, index) => {
        const isActive = this.targetIndex === index ? this.classes.isActive : '';
        html.push(
          `<li class="wearable-tab-compare__color-item" role="listitem">
            <button type="button" class="wearable-tab-compare__color-chip ${isActive}" data-omni-type="microsite_gallery" data-omni="${el.tagging}" ga-ca="gallery" ga-ac="feature gallery" ga-la="${el.tagging}">
              <span class="color-chip" style="background-color:${el.chip}"></span>
              <span class="color-name">${el.name}</span>
            </button>
          </li>`
        );
      });
      const innerHtml = html.join('');
      this.compareColor.innerHTML = innerHtml;

      // clickColor()가 동작하기 위함
      this.compareColorChip = this.el.querySelectorAll(this.opts.compareColorChip);
      this.compareColorChip.forEach((el, index) => {
        el.addEventListener('click', () => this.clickColor(index));
      });

      // 초기 is-active 클래스를 가진 컬러칩 속성
      this.compareColorChip.forEach(el => {
        if (el.classList.contains(this.classes.isActive)) {
          el.setAttribute('title', 'selected');
        }
      });
    }

    setCta() {
      this.DATA.colors.forEach((el, index) => {
        if (this.targetIndex === index) {
          const cta = el.cta;
          const buyNow = cta.buynow;
          const learnMore = cta.learnmore;

          const buyItem = this.buyCta.closest(this.opts.compareCtaItem);
          const learnmareItem = this.learnmoreCta.closest(this.opts.compareCtaItem);
          
          // buynow 값이 있을 경우 if (buynow) 없을 경우 else
          if (buyNow) {
            buyItem.style.display = 'block';
            this.buyCta.setAttribute('href', buyNow.url);
            this.buyCta.setAttribute('target', '_blank');
            this.buyCta.setAttribute('aria-label', buyNow.aria);
            this.buyCta.setAttribute('data-omni', buyNow.tagging + buyNow.sku);
            this.buyCta.setAttribute('ga-la', buyNow.tagging);
            this.buyCtaText.innerText = buyNow.name || 'BUY NOW';
          } else {
            buyItem.style.display = 'none';
          }

          // learnmore 값이 있을 경우 if (buynow) 없을 경우 else
          if (learnMore) {
            learnmareItem.style.display = 'block';
            this.learnmoreCta.setAttribute('href', learnMore.url);
            this.learnmoreCta.setAttribute('target', '_blank');
            this.learnmoreCta.setAttribute('aria-label', learnMore.aria);
            this.learnmoreCta.setAttribute('data-omni', learnMore.tagging);
            this.learnmoreCta.setAttribute('ga-la', learnMore.tagging);
            this.learnmoreCtaText.innerText = learnMore.name || 'LEARN MORE';
          } else {
            learnmareItem.style.display = 'none';
          }
        }
      });
    }

    setInfo() {
      this.compareInfoItem.forEach(el => {
        const infoTitle = el.dataset.infoTitle;
        const sTitle = el.querySelector(this.opts.sTitle);
        const sValue = el.querySelector(this.opts.sValue);
        const dataInfo = this.DATA[infoTitle];
    
        // 데이터가 있을 경우 if (dataInfo), 없을 경우 else
        if (dataInfo) {
          sTitle.style.display = 'block';
          sValue.innerHTML = dataInfo;
        } else {
          sTitle.style.display = 'none';
          sValue.innerHTML = '';
        }
      });
    }

    // compareName 클릭시 dropdown 메뉴 동작
    clickCompareName(e) {
      const name = e.currentTarget.closest(this.opts.compareName);

      if (name.classList.contains(this.classes.isActive)) {
        name.classList.remove(this.classes.isActive);
        name.querySelector(this.opts.compareNameSelector).setAttribute('title', 'collapse');
      } else {
        this.compareNameAll.forEach(el => {
          el.classList.remove(this.classes.isActive);
        });
  
        name.classList.add(this.classes.isActive);
        name.querySelector(this.opts.compareNameSelector).setAttribute('title', 'expanded');
      }
    }

    // compareName 영역 밖 클릭시
    clickOutside(e) {
      if (!this.compareName.contains(e.target)) {
        this.compareNameAll.forEach(el => {
          el.classList.remove(this.classes.isActive);
        });

        this.compareNameSelector.forEach(el => {
          el.setAttribute('title', 'collapse');
        })
      }
    }

    // dropdown 메뉴 아이템 클릭시
    clickDropdownItem(e) {
      const targetItem = e.currentTarget;
      const innerText = targetItem.querySelector(this.opts.compareDropdownDevice).innerText;

      this.compareDropdownItem.forEach(el => {
        el.classList.remove(this.classes.isSelected);
        el.querySelector(this.opts.compareDropdownDevice).removeAttribute('title');
      });
      targetItem.classList.add(this.classes.isSelected);
      targetItem.querySelector(this.opts.compareDropdownDevice).setAttribute('title', 'selected');
      this.compareNameSelectorText.innerText = innerText;
      this.currentProduct = targetItem.dataset.modelName;
      this.DATA = LOCAL_DATA[this.currentProduct];
      this.updateLayout();
    }
    
    // 컬러칩 클릭시 컬러칩, 이미지, cta값 변경
    clickColor(selectedIndex) {
      this.targetIndex = selectedIndex;

      this.compareColorChip.forEach((el, index) => {
        if (index === selectedIndex) {
          el.classList.add(this.classes.isActive);
          el.setAttribute('title', 'selected');
        } else {
          el.classList.remove(this.classes.isActive);
          el.removeAttribute('title');
        }
      });

      this.compareProductImage = Array.from(this.compareProductImage);
      this.compareProductImage.forEach((el, index) => {
        if (index === selectedIndex) {
          el.classList.add(this.classes.isActive);
          el.removeAttribute('aria-hidden');
          el.removeAttribute('tabindex');
        } else {
          el.classList.remove(this.classes.isActive);
          el.setAttribute('aria-hidden', true);
          el.setAttribute('tabindex', '-1');
        }
      });

      this.setCta();
    }

    updateImageLoader() {
      const el = this.el.querySelectorAll('.js-start-img-src');
      this.outCallback('updateImageLoader', el);
    }

    outCallback(ing, param) {
      var callbackObj = this.opts.on[ing];
      if (callbackObj == null) return;
      callbackObj(param);
    }
  }

  TAB_S9.CompareItem = CompareItem;
})();