// 加法
function add() {
  let a = parseFloat(document.getElementById("num1").value);
  let b = parseFloat(document.getElementById("num2").value);
  let res = a + b;
  document.getElementById("result").innerText = "结果：" + res;
}

// 减法
function sub() {
  let a = parseFloat(document.getElementById("num1").value);
  let b = parseFloat(document.getElementById("num2").value);
  let res = a - b;
  document.getElementById("result").innerText = "结果：" + res;
}
