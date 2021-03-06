var Teleport = (function (exports) {
  'use strict';

  //
  //
  //
  //
  //
  //

  var script = {
    name: 'teleport',
    props: {
      to: {
        type: String,
        required: true,
      },
      where: {
        type: String,
        default: 'after',
      },
      disabled: Boolean,
    },
    data: function data() {
      return {
        nodes: [],
        waiting: false,
        observer: null,
        parent: null,
      };
    },
    watch: {
      to: 'maybeMove',
      where: 'maybeMove',
      disabled: function disabled(value) {
        if (value) {
          this.disable();
          this.teardownObserver();
        } else {
          this.bootObserver();
          this.move();
        }
      },
    },
    mounted: function mounted() {
      // Store a reference to the nodes
      this.nodes = Array.from(this.$el.childNodes);

      if (!this.disabled) {
        this.bootObserver();
      }

      // Move slot content to target
      this.maybeMove();
    },
    beforeDestroy: function beforeDestroy() {
      // Move back
      this.disable();

      // Stop observing
      this.teardownObserver();
    },
    computed: {
      classes: function classes() {
        if (this.disabled) {
          return ['teleporter'];
        }

        return ['teleporter', 'hidden'];
      },
    },
    methods: {
      maybeMove: function maybeMove() {
        if (!this.disabled) {
          this.move();
        }
      },
      move: function move() {
        this.waiting = false;

        this.parent = document.querySelector(this.to);

        if (!this.parent) {
          this.disable();

          this.waiting = true;

          return;
        }

        if (this.where === 'before') {
          this.parent.prepend(this.getFragment());
        } else {
          this.parent.appendChild(this.getFragment());
        }
      },
      disable: function disable() {
        this.$el.appendChild(this.getFragment());
        this.parent = null;
      },
      // Using a fragment is faster because it'll trigger only a single reflow
      // See https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
      getFragment: function getFragment() {
        var fragment = document.createDocumentFragment();

        this.nodes.forEach(function (node) { return fragment.appendChild(node); });

        return fragment;
      },
      onMutations: function onMutations(mutations) {
        var this$1 = this;

        // Makes sure the move operation is only done once
        var shouldMove = false;

        for (var i = 0; i < mutations.length; i++) {
          var mutation = mutations[i];
          var filteredAddedNodes = Array.from(mutation.addedNodes).filter(function (node) { return !this$1.nodes.includes(node); });

          if (Array.from(mutation.removedNodes).includes(this.parent)) {
            this.disable();
            this.waiting = !this.disabled;
          } else if (this.waiting && filteredAddedNodes.length > 0) {
            shouldMove = true;
          }
        }

        if (shouldMove) {
          this.move();
        }
      },
      bootObserver: function bootObserver() {
        var this$1 = this;

        if (this.observer) {
          return;
        }

        this.observer = new MutationObserver(function (mutations) { return this$1.onMutations(mutations); });

        this.observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: false,
          characterData: false,
        });
      },
      teardownObserver: function teardownObserver() {
        if (this.observer) {
          this.observer.disconnect();
          this.observer = null;
        }
      },
    },
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true;
      // functional template
      if (isFunctionalTemplate) {
        options.functional = true;
      }
    }
    // scopedId
    if (scopeId) {
      options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
      // server build
      hook = function (context) {
        // 2.3 injection
        context =
          context || // cached call
          (this.$vnode && this.$vnode.ssrContext) || // stateful
          (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
        // 2.2 with runInNewContext: true
        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        }
        // inject component styles
        if (style) {
          style.call(this, createInjectorSSR(context));
        }
        // register component module identifier for async chunk inference
        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      };
      // used by ssr in case component is cached and beforeCreate
      // never gets called
      options._ssrRegister = hook;
    }
    else if (style) {
      hook = shadowMode
        ? function (context) {
          style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        }
        : function (context) {
          style.call(this, createInjector(context));
        };
    }
    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;
        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      }
      else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
    return script;
  }

  var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
  }
  var HEAD;
  var styles = {};
  function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
      style.ids.add(id);
      var code = css.source;
      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
        // http://stackoverflow.com/a/26603875
        code +=
          '\n/*# sourceMappingURL=data:application/json;base64,' +
          btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
          ' */';
      }
      if (!style.element) {
        style.element = document.createElement('style');
        style.element.type = 'text/css';
        if (css.media)
        { style.element.setAttribute('media', css.media); }
        if (HEAD === undefined) {
          HEAD = document.head || document.getElementsByTagName('head')[0];
        }
        HEAD.appendChild(style.element);
      }
      if ('styleSheet' in style.element) {
        style.styles.push(code);
        style.element.styleSheet.cssText = style.styles
          .filter(Boolean)
          .join('\n');
      }
      else {
        var index = style.ids.size - 1;
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index])
        { style.element.removeChild(nodes[index]); }
        if (nodes.length)
        { style.element.insertBefore(textNode, nodes[index]); }
        else
        { style.element.appendChild(textNode); }
      }
    }
  }

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { class: _vm.classes }, [_vm._t("default")], 2)
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-d4e6e290_0", { source: ".hidden[data-v-d4e6e290] {\n  visibility: hidden;\n  display: none;\n}\n\n/*# sourceMappingURL=Teleport.vue.map */", map: {"version":3,"sources":["/Users/shodan/Projects/vue2-teleport/src/Teleport.vue","Teleport.vue"],"names":[],"mappings":"AAuJA;EACA,kBAAA;EACA,aAAA;ACtJA;;AAEA,uCAAuC","file":"Teleport.vue","sourcesContent":["<template>\n  <div :class=\"classes\">\n    <slot/>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'teleport',\n  props: {\n    to: {\n      type: String,\n      required: true,\n    },\n    where: {\n      type: String,\n      default: 'after',\n    },\n    disabled: Boolean,\n  },\n  data() {\n    return {\n      nodes: [],\n      waiting: false,\n      observer: null,\n      parent: null,\n    };\n  },\n  watch: {\n    to: 'maybeMove',\n    where: 'maybeMove',\n    disabled(value) {\n      if (value) {\n        this.disable();\n        this.teardownObserver();\n      } else {\n        this.bootObserver();\n        this.move();\n      }\n    },\n  },\n  mounted() {\n    // Store a reference to the nodes\n    this.nodes = Array.from(this.$el.childNodes);\n\n    if (!this.disabled) {\n      this.bootObserver();\n    }\n\n    // Move slot content to target\n    this.maybeMove();\n  },\n  beforeDestroy() {\n    // Move back\n    this.disable();\n\n    // Stop observing\n    this.teardownObserver();\n  },\n  computed: {\n    classes() {\n      if (this.disabled) {\n        return ['teleporter'];\n      }\n\n      return ['teleporter', 'hidden'];\n    },\n  },\n  methods: {\n    maybeMove() {\n      if (!this.disabled) {\n        this.move();\n      }\n    },\n    move() {\n      this.waiting = false;\n\n      this.parent = document.querySelector(this.to);\n\n      if (!this.parent) {\n        this.disable();\n\n        this.waiting = true;\n\n        return;\n      }\n\n      if (this.where === 'before') {\n        this.parent.prepend(this.getFragment());\n      } else {\n        this.parent.appendChild(this.getFragment());\n      }\n    },\n    disable() {\n      this.$el.appendChild(this.getFragment());\n      this.parent = null;\n    },\n    // Using a fragment is faster because it'll trigger only a single reflow\n    // See https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment\n    getFragment() {\n      const fragment = document.createDocumentFragment();\n\n      this.nodes.forEach(node => fragment.appendChild(node));\n\n      return fragment;\n    },\n    onMutations(mutations) {\n      // Makes sure the move operation is only done once\n      let shouldMove = false;\n\n      for (let i = 0; i < mutations.length; i++) {\n        const mutation = mutations[i];\n        const filteredAddedNodes = Array.from(mutation.addedNodes).filter(node => !this.nodes.includes(node));\n\n        if (Array.from(mutation.removedNodes).includes(this.parent)) {\n          this.disable();\n          this.waiting = !this.disabled;\n        } else if (this.waiting && filteredAddedNodes.length > 0) {\n          shouldMove = true;\n        }\n      }\n\n      if (shouldMove) {\n        this.move();\n      }\n    },\n    bootObserver() {\n      if (this.observer) {\n        return;\n      }\n\n      this.observer = new MutationObserver(mutations => this.onMutations(mutations));\n\n      this.observer.observe(document.body, {\n        childList: true,\n        subtree: true,\n        attributes: false,\n        characterData: false,\n      });\n    },\n    teardownObserver() {\n      if (this.observer) {\n        this.observer.disconnect();\n        this.observer = null;\n      }\n    },\n  },\n};\n</script>\n\n<style scoped lang=\"scss\">\n.hidden {\n  visibility: hidden;\n  display: none;\n}\n</style>\n",".hidden {\n  visibility: hidden;\n  display: none;\n}\n\n/*# sourceMappingURL=Teleport.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-d4e6e290";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */

  /* style inject shadow dom */



  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

  // Taken from https://vuejs.org/v2/cookbook/packaging-sfc-for-npm.html

  // Declare install function executed by Vue.use()
  function install (Vue) {
    if (install.installed) { return; }

    install.installed = true;
    Vue.component('Teleport', __vue_component__);
  }

  // Create module definition for Vue.use()
  var plugin = {
    install: install,
  };

  // Auto-install when vue is found (eg. in browser via <script> tag)
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }

  exports.default = __vue_component__;
  exports.install = install;

  return exports;

}({}));
