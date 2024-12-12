(function () {
  'use strict';
  window.TAB_S9 = window.TAB_S9 || {};

  const UTILS = TAB_S9.UTILS;
  const RESPONSIVE = UTILS.RESPONSIVE;

  class Compare {
    constructor(el = container, args) {
      const defParams = {
        el,
        compareViewmore: '.view-more__cta',
        viewmore: '.viewmore',
        collapse: '.collapse',
        compareWrapEl: '.wearable-tab-compare__list-wrap',
        compareItemEl: '.wearable-tab-compare__list-item',
        classes: {
          isCollapse: 'is-collapse',
          isExpanded: 'is-expanded',
        },
        matchElements: [
          '.wearable-tab-compare__name-selector',
          '.wearable-tab-compare__cta',
          '.wearable-tab-compare__info-item--display',
          '.wearable-tab-compare__info-item--durability',
          '.wearable-tab-compare__info-item--processor',
          '.wearable-tab-compare__info-item--storage',
          '.wearable-tab-compare__info-item--memory',
          '.wearable-tab-compare__info-item--battery',
          '.wearable-tab-compare__info-item--pen',
          '.wearable-tab-compare__info-item--camera',
          '.wearable-tab-compare__info-item--network',
          '.wearable-tab-compare__info-item--weight',
          '.wearable-tab-compare__info-item--thickness',
        ],
        matchCommonOpts: {
          childElement: '.wearable-tab-compare__list-item',
          useDestroyHeight: false,
          breakpoints: {}
        },
      };
      this.opts = UTILS.def(defParams, args || {});
      this.classes = defParams.classes;
      this.el = document.querySelector(el);
      this.init();
    }

    init() {
      if (this.el === null) return;
      this.setting();
      this.initLayout();
      this.bindEvent();
      this.buildHeightMatch();
      this.buildCompareItem();
      this.updateImageLoader();
    }

    // 초기 viewmore 속성 지정
    initLayout() {
      this.viewmoreOmni = this.compareViewmore.getAttribute('data-omni');
      this.viewmoreTagging = this.compareViewmore.querySelector(this.opts.viewmore).getAttribute('data-tagging');
      this.collapseTagging = this.compareViewmore.querySelector(this.opts.collapse).getAttribute('data-tagging');

      if (this.compareViewmore.classList.contains(this.classes.isCollapse)) {
        this.compareViewmore.setAttribute('data-omni', this.viewmoreOmni + this.collapseTagging);
        this.compareViewmore.setAttribute('ga-la', this.viewmoreOmni + this.collapseTagging);
      } else {
        this.compareViewmore.setAttribute('data-omni', this.viewmoreOmni + this.viewmoreTagging);
        this.compareViewmore.setAttribute('ga-la', this.viewmoreOmni + this.viewmoreTagging);
      }
    }

    setting() {
      this.compareViewmore = this.el.querySelector(this.opts.compareViewmore);
      this.compareItemEl = this.el.querySelectorAll(this.opts.compareItemEl);
    }

    bindEvent() {
      this.compareViewmore.addEventListener('click', this.clickViewmore.bind(this));
    }

    // viewmore 버튼 클릭시
    clickViewmore() {
      if (this.compareViewmore.classList.contains(this.classes.isCollapse)) {
        this.compareViewmore.classList.remove(this.classes.isCollapse);
        this.compareViewmore.setAttribute('data-omni', this.viewmoreOmni + this.viewmoreTagging);
        this.compareViewmore.setAttribute('ga-la', this.viewmoreOmni + this.viewmoreTagging);
        this.el.classList.remove(this.classes.isExpanded);
      } else {
        this.compareViewmore.classList.add(this.classes.isCollapse);
        this.compareViewmore.setAttribute('data-omni', this.viewmoreOmni + this.collapseTagging);
        this.compareViewmore.setAttribute('ga-la', this.viewmoreOmni + this.collapseTagging);
        this.el.classList.add(this.classes.isExpanded);
        this.heightMatch.reInit();
      }
    }

    // compareItem 생성
    buildCompareItem() {
      this.compareItem = {
        instance: [],
        build: () => {
          if (!this.compareItem.instance.length) {
            this.compareItemEl.forEach(el => {
              this.compareItem.instance.push(new TAB_S9.CompareItem(el, {
                el: this.opts.compareItemEl,
                on: {
                  updateHeightMatch: () => {
                    this.heightMatch.reInit()
                  },
                  updateImageLoader: el => {
                    this.updateImageLoader(el)
                  }
                }
              }));
            });
          }
        }
      };
      this.compareItem.build();
    }

    buildHeightMatch() {
      this.heightMatch = {
        instance: [],
        reInit: () => {
          if (!this.heightMatch.instance.length) return;
          this.heightMatch.instance.forEach((instance) => {
            instance.reInit();
          });
        },
        initLayout: () => {
          for (let i = 0, max = this.opts.matchElements.length; i < max; i++) {
            const sTarget = this.opts.matchElements[i];
            const sJsClass = 'js-' + sTarget.split('.')[1];

            for (let j = 0, jmax = this.compareItemEl.length; j < jmax; j++) {
              const listTarget = this.compareItemEl[j];
              const usedJsClass = listTarget.querySelector('.' + sJsClass);

              if (usedJsClass === null) {
                const tag = document.createElement('div');
                const targetHTML = listTarget.querySelector(sTarget);

                tag.innerHTML = targetHTML.innerHTML;
                tag.classList.add(sJsClass);
                targetHTML.innerHTML = '';
                targetHTML.appendChild(tag);
              }
            }
          }
        },
        build: () => {
          this.heightMatch.initLayout();

          const callbackFunc = {
            column: this.compareItemEl.length
          };
          UTILS.def(this.opts.matchCommonOpts, callbackFunc);

          for (let i = 0, max = this.opts.matchElements.length; i < max; i++) {
            const sTarget = this.opts.matchElements[i];
            const personOpts = {
              pushElement: '.' + sTarget.split('.')[1],
              childElement: this.opts.compareItemEl,
              matchElement: '.js-' + sTarget.split('.')[1]
            };

            const matchCommonOpts = JSON.parse(JSON.stringify(this.opts.matchCommonOpts));

            UTILS.def(matchCommonOpts, personOpts);
            this.heightMatch.instance.push(new TAB_S9.HeightMatch(this.opts.compareWrapEl, matchCommonOpts));
          }
        }
      };
      this.heightMatch.build();
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

  TAB_S9.Compare = Compare;
})();