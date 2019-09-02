//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: 'FormatInput',
  props: {
    /** 值 */
    value: {
      type: String,
      "default": ''
    },
    inputClass: {
      type: [Array, Object]
    },

    /** 内容格式 */
    format: {
      type: String,
      "default": '34'
    },

    /** 是否禁用 */
    disabled: {
      type: Boolean
    },

    /** 提示内容 */
    placeholder: {
      type: String
    },

    /** 最大长度 */
    maxlength: {
      type: Number
    }
  },
  data: function data() {
    return {
      content: ''
    };
  },
  computed: {
    rawValue: function rawValue() {
      return this.content.replace(/\s/g, '');
    },
    formatValue: function formatValue() {
      var val = this.rawValue;
      var parts = this.format.split('');
      var index = 0;
      var length = Number(parts[index]);
      var result = [];

      while (val.length > length) {
        result.push(val.substr(0, length));
        val = val.slice(length);
        length = Number(parts[Math.min(++index, parts.length - 1)]);
      }

      result.push(val);
      return result.join(' ');
    }
  },
  watch: {
    value: function value(val) {
      // tip: 需要保证value是字符串
      this.content = val || '';
    },
    content: function content(val) {
      var _this = this;

      var rawValue = this.rawValue;

      if (this.maxlength && rawValue.length > this.maxlength) {
        // tip: 为了保证watch能够被触发
        this.content = '';
        this.$nextTick(function () {
          _this.content = rawValue.substr(0, _this.maxlength);
        });
      }
    },
    rawValue: function rawValue(val, old) {
      if (val !== old) {
        this.$emit('input', this.rawValue);
      }
    },
    formatValue: function formatValue(val, old) {
      if (val !== old) {
        this.content = this.formatValue;
      }
    }
  },
  methods: {
    onBlur: function onBlur() {
      this.$emit('blur');
    },
    mounted: function mounted() {
      this.content = this.value;
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
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
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD;
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);

      if (HEAD === undefined) {
        HEAD = document.head || document.getElementsByTagName('head')[0];
      }

      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "format-input" }, [
    _c("input", {
      directives: [
        {
          name: "model",
          rawName: "v-model",
          value: _vm.content,
          expression: "content"
        }
      ],
      staticClass: "input",
      class: _vm.inputClass,
      attrs: {
        type: "tel",
        placeholder: _vm.placeholder,
        disabled: _vm.disabled
      },
      domProps: { value: _vm.content },
      on: {
        blur: _vm.onBlur,
        input: function($event) {
          if ($event.target.composing) {
            return
          }
          _vm.content = $event.target.value;
        }
      }
    })
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-6da2e4ea_0", { source: ".format-input .input {\n  background-color: transparent;\n}\n", map: {"version":3,"sources":["formatInput.vue"],"names":[],"mappings":"AAAA;EACE,6BAA6B;AAC/B","file":"formatInput.vue","sourcesContent":[".format-input .input {\n  background-color: transparent;\n}\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var FormatInput = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

var installed = false;
function install(Vue, options) {
  if (installed) {
    return;
  }

  installed = true;
  Vue.use('FormatInput', FormatInput);
}

export default install;
