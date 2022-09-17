let user = require("./33_schema");
////查询多条，返回一个
//user.find({"name":"张三"},(err,res) => {
//	console.log(res[0].age)
//})
////查询一条
//user.findOne({"name":"张三"},(err,res) => {
//	console.log(res.age)
//})
////查询所有
//user.find({},(err,res) => {
//	console.log(res)
//})
////查询所有s
//user.find((err,res) => {
//	console.log(res)
//})
//user.findById("605bea9bab6c9e196405f304",(err,res) => {
//	console.log(res)
//})

////模糊查询
//user.find({"name":{$regex:/t/i}},(err,res) => {
//	console.log(res)
//})
//user.countDocuments({"name":{$regex:/t/}},(err,res)=>{
//	console.log(res)
//})
//不等于18
//user.find({"age":{$ne:18}},(err,res)=>{
//	console.log(res)
//})
////大于等于18
//user.find({"age":{$gte:18}},(err,res)=>{
//	console.log(res)
//})
////小于等于18
//user.find({"age":{$lte:18}},(err,res)=>{
//	console.log(res)
//})
/*
 * 限定输出字段
 * 		其中键名为所有的字段名，值为0或者1，
 *		 1代表输出 该字段，0代表不输出该字段。默认为0。
 * 当指定的字段均为1时，未指定字段默认为0（id除外）
 * 当指定的字段均为0时，未指定字段默认为1(id除外)
 * 除了id之外，未指定的字段要么均为0，要么均为1
 * id在任何时候均默认为1（除非指定id）
 */
user.find({ "name": "turnip" }, { "name": 1, age: 1 }, (err, res) => {
    console.log(res)
})