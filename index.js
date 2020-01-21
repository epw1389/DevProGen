const inquirer = require('inquirer');
const html = require('./profilehtmlgenerate');
async function start(answers) {
    console.log("Calling html generator");
    const htmlContent = await html.getHTML(answers.username, answers.color);
    var fs = require('fs'),
        convertFactory = require('electron-html-to');

    var conversion = convertFactory({
        converterPath: convertFactory.converters.PDF
    });

    conversion({ html: htmlContent }, function (err, result) {
        if (err) {
            return console.error(err);
        }
        let fileName = "./output/" + answers.username + "_GitHubProfile.pdf";
        result.stream.pipe(fs.createWriteStream(fileName));
        conversion.kill(); 
        console.log("PDF file created: " + fileName);
    });
}

inquirer
    .prompt([
        {
            type: "input",
            message: "GitHub username:",
            name: "username"
        },
        {
            type: "input",
            message: "What is your favorite color?",
            name: "color"
        },

    ])
    .then(answers => {
        console.log(answers);
        start(answers);
    });
