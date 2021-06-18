const url = 'http://localhost:3000/'

const fetchApi = async(url, options, cb, err) => {
    await fetch(url, options) // url = linkAPI , options = mothod (ham su ly di chung voi fetch)
        .then(r => r.json())
        .then(cb)
        .catch(err)
}

const processData = data => console.log(data);
const processError = err => console.log(err);

//get data API
const getProducts = async() => {
    const productUrl = url + 'product'
        //method
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const res = await fetchApi(productUrl, options, processData, processError)
    processData(res)


}


//get data
let _quantity = 0;
let _stt = "";

JSON.parse(localStorage.getItem("items")).map(k => {

    _id = k.id

    _quantity = _quantity + k.no;
})
var y = new Date();
var m = y.getMonth() + 1
var _fulldate = y.getDate() + '-' + m + '-' + y.getFullYear();

//post
const postProduct = async(e) => {
    e.preventDefault(); //chặn chuyển trang

    if (_fulldate === "10-4-2021") {
        _stt = "Đang giao hàng"
    } else _stt = "Chưa thanh toán"

    const _data = {
        id: '',
        productID: _id,
        quantity: _quantity,
        status: _stt,
        ngaymua: _fulldate,
        nameuser: document.getElementById('name').value,
        sdt: document.getElementById('sdt').value,
        email: document.getElementById('email').value,
        place: document.getElementById('place').value,
        total: parseInt(document.getElementById('total').value)
    }


    var patt2 = /[a-z]{0,10}[0-9]@gmail.com/; //email
    var result2 = patt2.test(_data.email);


    var patt3 = /[a-z 0-9 \w]/; //email
    var result3 = patt3.test(_data.place);

    var patt = /[0-9]/; //name
    var result = patt.test(_data.nameuser);


    var patt1 = /[0][0-9]{10}/;
    var result1 = patt1.test(_data.sdt);

    let arr_name = `${_data.nameuser}`;
    let arr_email = `${_data.email}`



    if (_data.nameuser === "") {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Hãy nhập vào!!'
        })
    } else if (result === true) {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Tên phải là kiểu chuỗi!!'
        })
    } else if (arr_name.length > 30) {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Tên qúa dài!!'
        })
    } else if (_data.sdt === "") {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Hãy nhập vào!!'
        })
    } else if (_data.sdt.length > 11) {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Số điện thoại quá dài!!'
        })
    } else if (result1 === false) {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Nhập theo mẫu [0+(0-9)] , tối đa 11 số!!'
        })
    } else if (_data.email === "") {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Hãy nhập vào!!'
        })
    } else if (result2 === false) {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Nhập theo mẫu [a-z][0-9]@gmail.com'
        })
    } else if (arr_email.length > 30 || arr_email.length < 5) {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Tối thiểu 5 ký tự , tối đa 30 ký tự'
        })
    } else if (_data.place == "") {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Hãy nhập vào!!'
        })
    } else if (result3 == false) {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Hãy nhập đủ thông tin!!'
        })
    } else if (_data.place.length > 60 || _data.place.length < 8) {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Địa chỉ nằm trong phạm vi 5 đến 60 ký tự!!'
        })
    } else {

        swal({
            type: 'success',
            title: 'Thành Công',
            icon: 'success',
            text: 'Đã đặt hàng'
        })

        const productUrl = url + 'order'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_data)
        }
        await fetchApi(productUrl, options)
        updatecart()
    }
}


const updatecart = async() => {
    let arr_rong = [];
    localStorage.setItem("items", JSON.stringify(arr_rong));
    setTimeout(() => {
        window.location = "index.html";
    }, 2000);
}


window.onload = () => {
    getProducts();
    document.getElementById('thanhtoan').addEventListener("click", postProduct);


}