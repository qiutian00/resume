const fs = require('fs');
const path = require('path');
const marked = require('marked');

const resume = fs.readFileSync(path.join(__dirname, './README.md'), 'utf8');
const content = marked(resume);

const tmpl = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>qiutian00 - Front-End Developer</title>
    <link rel="stylesheet" href="./styles.css" />
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <!-- <script async src="https://www.googletagmanager.com/gtag/js?id=UA-57557739-4"></script> -->
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-57557739-4');
    </script>
  </head>
  <body>
    ${content}
  </body>
</html>
`;

fs.writeFileSync(path.join(__dirname, './index.html'), tmpl, 'utf8');
