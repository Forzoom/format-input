const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const { terser } = require('rollup-plugin-terser');

module.exports = exports = [
    {
        input: './src/index.js',
        output: {
            file: './dist/format-input.esm.js',
            format: 'es',
        },
        plugins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            commonjs(),
            resolve(),
            babel(),
        ],
    },
    {
        input: './src/index.js',
        output: {
            file: './dist/format-input.esm.min.js',
            format: 'es',
        },
        plugins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            commonjs(),
            resolve(),
            babel(),
            terser(),
        ],
    },
    {
        input: './src/index.js',
        output: {
            file: './dist/format-input.cjs.js',
            format: 'cjs',
        },
        plugins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            commonjs(),
            resolve(),
            babel(),
        ],
    },
    {
        input: './src/index.js',
        output: {
            file: './dist/format-input.umd.js',
            format: 'umd',
            name: 'formatInput',
        },
        plugins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            commonjs(),
            resolve(),
            babel(),
        ],
    },
];
