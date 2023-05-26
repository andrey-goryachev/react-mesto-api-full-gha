module.exports = {
  extends: 'airbnb-base',
  rules: {
    // это правило по заданию
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-useless-escape': 'off',
    // это правило отключает предупреждение, иначе тесты не проходят
    // 'no-console': 'off',
  },
};
