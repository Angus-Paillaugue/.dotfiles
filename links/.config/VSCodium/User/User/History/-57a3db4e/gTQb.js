
let col = "AAF";
let colNum = 0;
for (let i = 0; i < col.length; i++) {
  colNum = colNum * 26 + col.charCodeAt(i) - 64;
}
console.log(colNum);
