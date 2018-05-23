// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // 强制驼峰法命名规则
    'camelcase': 'off',
    // Object 属性是否必须在新的一行书写
    'object-curly-newline': 'off',
    // 不检测行的最大长度（考虑到 base64 图片编码）
    'max-len': 'off',
    // 混合运算符检测
    'no-mixed-operators': 'off',
    // 换行符检测
    'linebreak-style': 'off',
    // 允许使用位运算
    'no-bitwise': 'off',
    // 允许累加、累减
    'no-plusplus': 'off',
    // 允许在条件中进行赋值
    'no-cond-assign': 'off',
    // 允许连续多等号赋值
    'no-multi-assign': 'off',
    // 允许对函数参数重新赋值
    'no-param-reassign': 'off',
    // 关闭推荐未重新赋值的let变量设置成const常量
    'prefer-const': 'off',
    // 关闭推荐模板字符串
    'prefer-template': 'off',
    // 关闭switch/default检测
    'default-case': 'off',
    // 是否允许空语句块
    'no-empty': ['error', { "allowEmptyCatch": true }],
    // 禁止出现未使用的表达式
    'no-unused-expressions': 'off',
    // 禁止变量和方法的前置下划线，类定义私有成员要用到
    'no-underscore-dangle': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 要求或禁止尾随逗号（比如Object末位属性）
    'comma-dangle': ['error', 'never'],
    // 要求或禁止语句块 {} 之前是否有空格
    'space-before-blocks': ['error', 'always'],
    // 函数定义时括号前是否需要空格
    'space-before-function-paren': ['error', { 'anonymous': 'never', 'named': 'never', 'asyncArrow': 'always' }],
    // 是否允许使用 console 语句
    'no-console': ['error', { 'allow': ['warn', 'error'] }],
    // 箭头函数的函数体样式：是否需要｛｝包含
    'arrow-body-style': ['error', 'as-needed', { 'requireReturnForObjectLiteral': true }],
    // 箭头函数的参数表是否需要括号包起来
    'arrow-parens': ['error', 'as-needed'],
    // 匿名函数是否需要规定函数名
    'func-names': ['error', 'as-needed'],
    // 大括号的换行风格
    'brace-style': ['error', 'stroustrup', { "allowSingleLine": true }],
    // 当存在更简单的三元运算写法时，是否简化如：“x ? x : ''”开启时需要简化为 “x || ''”
    'no-unneeded-ternary': ['error', { 'defaultAssignment': true }],
    // 属性访问时用 . 还是 []，允许关键字
    'dot-notation': 'off',
    // 是否强制要求函数统一 return value 格式
    'consistent-return': 'off'
  }
};
