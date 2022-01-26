module.exports = plop => {
  plop.setGenerator('component', {
    description: 'create a custom component',
    prompts: [
      {
        type: 'input',
        name: 'folder',
        message: 'folder name',
        default: 'views'
      },
      {
        type: 'input',
        name: 'file',
        message: 'file name',
        default: 'index'
      },
      {
        type: 'input',
        name: 'name',
        message: 'component name',
        default: 'index'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{folder}}/{{file}}.vue',
        templateFile: 'plop-template/component/src/component.hbs'
      }
    ]
  })
}
