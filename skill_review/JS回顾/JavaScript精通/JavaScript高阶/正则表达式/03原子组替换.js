let str = `
<h1>turnip</h1>
<span>turnip</span>
<h2>turnip</h2>
`;
let reg = /<(h[1-6])>([\s\S]+)<\/\1>/gi;
console.log(str.replace(reg, `<p>$2</p>`));
console.log(reg.lastIndex);
console.log(reg.exec(str));
console.log(reg.lastIndex);
console.log(str.replace(reg, (p0, p1, p2) => {
  return `<p>${p2}</p>`
}));