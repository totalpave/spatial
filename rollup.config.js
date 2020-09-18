import typescript from './rollup-plugins/typescript-export';
import babel from '@rollup/plugin-babel';

export default {
    input: 'index.js',
    output: [
        {file: 'main.js', format: 'cjs'},
        {file: 'main.es.js', format: 'es'}
    ],
    plugins: [
        babel({
            babelHelpers: 'bundled',
            presets: [
                '@babel/preset-env'
            ],
            plugins: [
                '@babel/plugin-transform-template-literals',
                '@babel/plugin-transform-object-assign'
            ]
        }),
        typescript()
    ]
}
