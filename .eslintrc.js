module.exports = {
    parser: 'espree',
    extends: [
      'prettier',
    ],
    root: true,
    env: {
      node: true,
      jest: true,
    },
    rules: {
      'no-console': 'error',
      'no-duplicate-imports': 'error',
      'sort-imports': [
        'off',
        {
          ignoreCase: false,
          ignoreDeclarationSort: false,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'],
          allowSeparatedGroups: true,
        },
      ],
      'no-async-promise-executor': 'error',
    },
  };