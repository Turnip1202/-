window.addEventListener('load', () => {
  document.querySelector('#sub').addEventListener('click', () => {
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#mail').value;
    let text = document.querySelector('#text').value;
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    console.log(name, reg.test(email))
    if (!name || !reg.test(email)) {
      alert('用户名/邮箱输入不符')
      name.value = ''; email.value = '';
    } else {
      axios({
        method: 'post',
        url: '/message',
        data: {
          name, email, text
        }
      }).then((res) => {
        console.log(res.data.success);
        if (res.data.success == 200) {
          location.reload()
        }
      })
    }
  })

})