+!~-(function(r) {
    'use strong';
    
    const fs = r('fs');
    const chalk = r('chalk');

    fs.readFile('./license.txt', 'utf8', (err, content) => {
        console.log(chalk.magenta(content));
    });
    
    console.log(chalk.blue('Project is ready.'));

})(require);
