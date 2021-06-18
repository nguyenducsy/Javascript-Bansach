const url = 'http://localhost:3000/';


const fetchApi = async(url, option) => {
    const res = await fetch(url, option)
    return res.json()
}




const processError = err => console.log(err);
var check_name = [];
const getCata = async() => {
    const cataUrl = url + 'catalog'
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
    var _tb = document.querySelector('#rowcate')

    _tb.innerHTML = ''
    for (let i = 0; i < data.length; i++) {


        _tb.innerHTML += `
        <tr>
        <th scope="row">
            <p class="example"><input type="checkbox" class="chonX" name="chonX[]"></p>
        </th>
        <td id="nn">${data[i].name}</td>
        <td class="soluong" >${data[i].soluongSP}   <span>sản phẩm</span></td>
        <td>
            <button  class="btn btn-warning" onclick="edit(${data[i].id})"> <a href="update_cata.html"> Sửa </a></button> 
            <button class="btn btn-danger" onclick="del(${data[i].id})"><a href="" >Xoá</button> 
        </td>
    </tr>
    `

    }

}
const edit = async(id) => {

    localStorage.setItem("danhmuc", JSON.stringify(id));
}




const del = async(id) => {

    const delUrl = url + 'catalog/' + id
    const option = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        },
    }
    const res = await fetchApi(delUrl, option)
    getCata()
}



getCata();