import pegjs from "rollup-plugin-pegjs";


export default {
    input: "src/index.js",

    output: {
        name: 'runtime',
        file: 'build/index.js',
        format: 'cjs',
        sourcemap: true
    },

    external: [ 'fs', 'util' ],

    plugins: [
        pegjs({
            optimize: 'size'
        })
    ]
}