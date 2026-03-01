const fs = require('fs');
const path = require('path');

// 配置
const config = {
  input: './README.md',
  output: './index.html',
  template: './template.html',
  title: '李文 - 前端开发工程师',
  // Google Analytics ID (留空则不启用)
  gaId: ''
};

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 生成 Google Analytics 代码
function generateAnalytics(gaId) {
  if (!gaId) return '';
  return `
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    </script>`;
}

// 动态加载 marked（支持 ESM 和 CommonJS）
async function loadMarked() {
  try {
    const marked = await import('marked');
    return marked.default || marked;
  } catch (e) {
    // fallback to require for older versions
    return require('marked');
  }
}

// 构建函数
async function build() {
  const startTime = Date.now();

  try {
    log('\n📦 开始构建...', 'blue');

    // 加载 marked
    const marked = await loadMarked();

    // 读取文件
    log(`   读取: ${config.input}`, 'yellow');
    const markdown = fs.readFileSync(path.join(__dirname, config.input), 'utf8');

    log(`   读取: ${config.template}`, 'yellow');
    const template = fs.readFileSync(path.join(__dirname, config.template), 'utf8');

    // 转换 Markdown
    log('   转换: Markdown → HTML', 'yellow');
    const content = marked.parse(markdown);

    // 替换模板变量
    const html = template
      .replace('{{title}}', config.title)
      .replace('{{content}}', content)
      .replace('{{analytics}}', generateAnalytics(config.gaId));

    // 写入文件
    log(`   写入: ${config.output}`, 'yellow');
    fs.writeFileSync(path.join(__dirname, config.output), html, 'utf8');

    const elapsed = Date.now() - startTime;
    log(`\n✅ 构建完成! 耗时 ${elapsed}ms\n`, 'green');

  } catch (error) {
    log(`\n❌ 构建失败: ${error.message}\n`, 'red');
    process.exit(1);
  }
}

// 监听模式
function watch() {
  const chokidar = require('chokidar');

  log('\n👀 监听模式已启动...', 'blue');
  log('   监听文件: README.md, template.html', 'yellow');
  log('   按 Ctrl+C 退出\n');

  // 初始构建
  build();

  // 监听变化
  const watcher = chokidar.watch([config.input, config.template], {
    ignored: /node_modules/,
    persistent: true
  });

  watcher.on('change', (filePath) => {
    log(`\n📝 文件已变更: ${path.basename(filePath)}`, 'yellow');
    build();
  });
}

// 主入口
const args = process.argv.slice(2);

if (args.includes('--watch') || args.includes('-w')) {
  // 检查 chokidar 是否安装
  try {
    require.resolve('chokidar');
    watch();
  } catch (e) {
    log('\n❌ 监听模式需要安装 chokidar:', 'red');
    log('   npm install -D chokidar\n');
    process.exit(1);
  }
} else {
  build();
}