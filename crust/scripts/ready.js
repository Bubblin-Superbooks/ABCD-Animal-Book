(function (r) {
  'use strong'

  const fse = r('fs-extra')
  const chalk = r('chalk')

  fse.readFile('./license.txt', 'utf8', (err, data) => {
    if (err) {
      return new Error('Couldn\'t read license information.')
    }
    console.log(chalk.magenta(data))
  })

  console.log(chalk.blue('Project is ready.'))
})(require)
