module.exports = {
  root: true,
  ignorePatterns: ['projects/**/*'],
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.spec.json', 'tsconfig.eslint.json'],
        createDefaultProgram: true,
      },
      plugins: ['@angular-eslint', '@typescript-eslint'],
      extends: [
        'plugin:@angular-eslint/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        '@angular-eslint/prefer-standalone': 'warn',
        '@angular-eslint/prefer-inject': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        '@angular-eslint/no-empty-lifecycle-method': 'off',
      },
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {},
    },
  ],
};
