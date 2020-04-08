const {
  series
} = require('gulp');
const fs = require('fs');
const child_process = require("child_process");
const exec = require('child_process').exec;
const gulp = require('gulp');
const gitane = require('gitane');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

const registry = process.env.REGISTRY;

let tag = process.env.TAG;
let version;
let packjson;
let privKey = process.env.SSH_PRIVETEKEY;

const username = process.env.NPM_USER;
const password = process.env.NPM_PASS;
const email = process.env.NPM_EMAIL;

const output = process.env.COPYTO || 'dist';

const get_project = (cb) => {
  fs.readFile(process.cwd() + '/package.json', (err, txt) => {
    if (err) {
      return cb(err);
    }
    packjson = JSON.parse(txt);
    cb();
  });
}

const npm_version = (cb) => {
  exec('npm view ' + packjson.name + ' version ' + (registry ? '--registry ' + registry : ''), {
    cwd: process.cwd()
  }, function (err, stdout) {
    if (!err) {
      const vs = stdout.split('.');
      vs[2] = parseInt(vs[2]) + 1;
      version = vs.join('.');
      tag = 'v' + version;
    } else if (err.message.indexOf('npm ERR! code E404') > -1) {
      err = null;
      version = packjson.version;
      tag = 'v' + version;
    }
    cb(err);
  });
}

const update_version = (cb) => {
  packjson.version = version;
  fs.writeFile(process.cwd() + '/package.json', JSON.stringify(packjson, null, 2), (err) => {
    cb(err);
  });
}

const npm_login = (cb) => {

  if (!username) {
    return cb();
  }

  if (!password) {
    return cb(new Error("Please set the NPM_PASS environment variable"));
  }

  if (!email) {
    return cb(new Error("Please set the NPM_EMAIL environment variable"));
  }

  const child = child_process.spawn("npm", ["login", "-q", '--registry', registry], {
    stdio: ["pipe", "pipe", "inherit"]
  });

  child.stdout.on("data", d => {
    const data = d.toString();
    process.stdout.write(d + "\n");
    if (data.match(/username/i)) {
      child.stdin.write(username + "\n");
    } else if (data.match(/password/i)) {
      child.stdin.write(password + "\n");
    } else if (data.match(/email/i)) {
      child.stdin.write(email + "\n");
    } else if (data.match(/logged in as/i)) {
      child.stdin.end();
      cb();
    }
  });
}

const npm_publish = (cb) => {
  console.log('publish version:', version);
  exec('npm publish --registry ' + registry, {
    cwd: process.cwd()
  }, function (err) {
    cb(err);
  });
}

const create_tag = (cb) => {
  exec('git tag -a ' + tag + ' -m "publish package"', {
    cwd: process.cwd()
  }, function (err) {
    cb(err);
  });
}

const push_tag = (cb) => {
  if (!privKey) {
    exec('git push origin ' + tag, {
      cwd: process.cwd()
    }, function (err) {
      cb(err);
    });
  } else {
    gitane.run(process.cwd(), privKey, 'git push origin ' + tag,
      function (err) {
        return cb(err);
      });
  }
}

const build = () =>
  gulp.src('src/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel())
  .on('error', function (err) {
    console.log('Error!', err.message);
    this.end();
  })
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(output));
  
exports.build = build;

exports.copy = () =>
  gulp.src('src/**/*.js')
  .pipe(gulp.dest(output));

exports.publish = series(
  get_project,
  npm_version,
  build,
  update_version,
  create_tag,
  npm_login,
  push_tag, // 确保tag提交成功后发布
  npm_publish)
