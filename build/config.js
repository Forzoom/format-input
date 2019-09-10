const babel = require('rollup-plugin-babel');
const vue = require('rollup-plugin-vue');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');

const extensions = [ '.ts', '.js', ];

module.exports = exports = [
    // {
    //     input: './src/index.js',
    //     output: {
    //         file: './dist/format-input.esm.js',
    //         format: 'es',
    //     },
    //     plugins: [
    //         replace({
    //             'process.env.NODE_ENV': JSON.stringify('production'),
    //         }),
    //         commonjs(),
    //         resolve(),
    //         vue(),
    //         babel({
    //             extensions: extensions,
    //             // exclude: 'node_modules/**',
    //         }),
    //     ],
    // },
    // {
    //     input: './src/index.js',
    //     output: {
    //         file: './dist/format-input.cjs.js',
    //         format: 'cjs',
    //     },
    //     plugins: [
    //         replace({
    //             'process.env.NODE_ENV': JSON.stringify('production'),
    //         }),
    //         commonjs(),
    //         resolve(),
    //         vue(),
    //         babel({
    //             extensions: extensions,
    //             // exclude: 'node_modules/**',
    //         }),
    //     ],
    // },
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
            vue(),
            // babel(),
        ],
    },
];
