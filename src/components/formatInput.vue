<template>
    <div class="format-input">
        <input v-model="content"
            :class="inputClass"
            class="input"
            type="tel"
            :placeholder="placeholder"
            :disabled="disabled"
            @blur="onBlur" />
    </div>
</template>

<script>
export default {
    name: 'FormatInput',
    props: {
        /** 值 */
        value: {
            type: String,
            default: '',
        },
        inputClass: {
            type: [ Array, Object ],
        },
        /** 内容格式 */
        format: {
            type: String,
            default: '34',
        },
        /** 是否禁用 */
        disabled: {
            type: Boolean,
        },
        /** 提示内容 */
        placeholder: {
            type: String,
        },
        /** 最大长度 */
        maxlength: {
            type: Number,
        },
    },
    data() {
        return {
            content: '',
        };
    },
    computed: {
        rawValue() {
            return this.content.replace(/\s/g, '');
        },
        formatValue() {
            let val = this.rawValue;
            const parts = this.format.split('');
            let index = 0;
            let length = Number(parts[index]);
            const result = [];
            while (val.length > length) {
                result.push(val.substr(0, length));
                val = val.slice(length);
                length = Number(parts[Math.min(++index, parts.length - 1)]);
            }
            result.push(val);
            return result.join(' ');
        },
    },
    watch: {
        value(val) {
            // tip: 需要保证value是字符串
            this.content = val || '';
        },
        content(val) {
            const rawValue = this.rawValue;
            if (this.maxlength && rawValue.length > this.maxlength) {
                // tip: 为了保证watch能够被触发
                this.content = '';
                this.$nextTick(() => {
                    this.content = rawValue.substr(0, this.maxlength);
                });
            }
        },
        rawValue(val, old) {
            if (val !== old) {
                this.$emit('input', this.rawValue);
            }
        },
        formatValue(val, old) {
            if (val !== old) {
                this.content = this.formatValue;
            }
        },
    },
    methods: {
        onBlur() {
            this.$emit('blur');
        },
        mounted() {
            this.content = this.value;
        },
    },
}
</script>

<style lang="less">
.format-input {
    .input {
        background-color: transparent;
    }
}
</style>
