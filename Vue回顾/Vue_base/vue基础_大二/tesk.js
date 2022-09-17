function Person() {};
Person.prototype.move = function() {
    console.log(this.name + "移动")
}

function Student(name) {
    this.name = name;
}
Student.prototype.study = function() {
    console.log(this.name + "学习")
}
Student.prototype = new Person();
var st = new Student("张三丰");
st.move();
st.study();