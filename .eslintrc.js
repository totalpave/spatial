module.exports = {
  extends: 'mourner',
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    strict: [0],
    camelcase: [0],
    'no-loop-func': [0],
    'object-curly-spacing': [0],
    'consistent-return': [0],
    'valid-jsdoc': [2, {
      prefer: {'return': 'returns'},
      requireReturn: false
    }],
    'prefer-spread': [0],
    'prefer-arrow-callback': [0],
    'prefer-const': [0],
    'no-var': [0],
    'no-prototype-builtins': [0]
  }
};
