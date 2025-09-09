export default function (plop) {
  plop.setGenerator('component', {
    description: 'Create a new React component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name:',
        validate: (value) => {
          if (/.+/.test(value)) {
            return true;
          }
          return 'Component name is required';
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.jsx',
        templateFile: 'plop-templates/Component.jsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.module.css',
        templateFile: 'plop-templates/Component.module.css.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/index.js',
        templateFile: 'plop-templates/index.js.hbs',
      },
    ],
  });
}
