const url = 'http://localhost:3000/';


const fetchApi = async(url, option) => {
    const res = await fetch(url, option)
    return res.json()
}

const processError = err => console.log(err);
var check_name = [];
const getPro = async() => {
    const cataUrl = url + 'product'
        //method
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const res = await fetchApi(cataUrl, options, processData, processError)
    check_name = res;
    processData(res);
}

const processData = data => {
    var _tb = document.querySelector('#rowpro')

    _tb.innerHTML += ''
    for (let i = 0; i < data.length; i++) {

        _tb.innerHTML += `
                <tr>
                <th scope="row"><p class="example"><input type="checkbox" class="chonX" name="chonX[]"></p></th>
                <td>${data[i].title}</td>
                <td><img style="width: 15%;" src="${data[i].img}" alt="hi" class="card-img-top"></td>
                <td>${data[i].price}.000<sup>đ</sup></td>
                <td>${data[i].tacgia}</td>
                <td>
                    <button  class="btn btn-warning" onclick="edit(${data[i].id})"><a href="update_pro.html" >Sửa</a></button> 
                    <button class="btn btn-danger" onclick="dell(${data[i].id})"><a href="" >Xoá</a></button> 
                </td>
            </tr>
    `
    }
}



const dell = async(id) => {

    const delUrl = url + 'product/' + id
    const option = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    }
    return await fetchApi(delUrl, option);
}


// edit lấy được id và đồng thời chuyển trang , trang update chưa link để sử lý update
const edit = async(id) => {

    //push id lên local để show
    localStorage.setItem("product", JSON.stringify(id));
}



window.onload = () => {
    getPro();
    document.getElementById('upate').addEventListener("click", update) //update product
}