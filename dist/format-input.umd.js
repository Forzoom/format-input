(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('core-js/modules/es.array.join'), require('core-js/modules/es.array.slice'), require('core-js/modules/es.number.constructor'), require('core-js/modules/es.regexp.exec'), require('core-js/modules/es.string.replace'), require('core-js/modules/es.string.split')) :
    typeof define === 'function' && define.amd ? define(['core-js/modules/es.array.join', 'core-js/modules/es.array.slice', 'core-js/modules/es.number.constructor', 'core-js/modules/es.regexp.exec', 'core-js/modules/es.string.replace', 'core-js/modules/es.string.split'], factory) :
    (global = global || self, global.formatInput = factory());
}(this, function () { 'use strict';

    var FormatInput = {
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
      },
      template: '<div class="format-input">' + '<input v-model="content" ' + ':class="inputClass" ' + 'class="input" ' + 'type="tel" ' + ':placeholder="placeholder" ' + ':disabled="disabled" ' + '@blur="onBlur" /> ' + '</div>'
    };

    // vue-runtime-helpers has es6 features `Set` in dist code
    var installed = false;
    function install(Vue, options) {
      if (installed) {
        return;
      }

      installed = true;
      Vue.component('FormatInput', FormatInput);
    }

    return install;

}));
