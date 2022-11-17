// 循环打印红黄绿
// 红灯 3s 亮一次，绿灯 2s 亮一次，黄灯 1s 亮一次；如何让三个灯不断交替重复亮灯？
function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}

// callback
function taskCallback(timer, light, callback) {
  setTimeout(() => {
    console.log(light);
    callback();
  }, timer);
}

const stepCallback = () => {
  taskCallback(3000, 'red', () => {
    taskCallback(2000, 'green', () => {
      taskCallback(1000, 'yellow', stepCallback); // here call back to step to cycle
    });
  });
};
// stepCallback()

// promise
const taskPromise = (timer, light) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(light);
      resolve();
    }, timer);
  });

const stepPromise = () =>
  taskPromise(3000, 'red')
    .then(() => taskPromise(2000, 'green'))
    .then(() => taskPromise(1000, 'yellow'))
    .then(stepPromise);
// stepPromise();

const taskRunner = async () => {
  await taskPromise(3000, 'red');
  await taskPromise(2000, 'green');
  await taskPromise(1000, 'yellow');
  taskRunner();
};
// taskRunner()
