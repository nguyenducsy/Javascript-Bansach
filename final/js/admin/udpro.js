const URL = 'http://localhost:3000/';

const fetch_pro = async(url, option) => {
    const res = await fetch(url, option)
    return res.json()
}

// get id đã được save trên local về lưu value ở form
let idlocal = JSON.parse(localStorage.getItem("product"));

const processErrorr = err => console.log(err);

const getProductID = async() => {
    const cataUrl = URL + 'product/' + idlocal
        //method
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const res = await fetch_pro(cataUrl, options, inform, processErrorr)
    inform(res);
}


const inform = data => {


    var idedit = document.getElementById('idedit');
    var nameedit = document.getElementById('namesp');
    var tacgia = document.getElementById('tacgia');
    var gia = document.getElementById('giasp')

    idedit.value += data.id;
    nameedit.value += data.title;
    tacgia.value += data.tacgia
    gia.value += data.price

}

//được gọi khi submit ở form chứa link 
const update = async(e) => {
    e.preventDefault(); //chặn chuyển trang
    var pattimg = document.getElementById('imgsp').value;
    var urlimg = `${pattimg}`
        //get từ form update 
    const data = {
        id: parseInt(document.getElementById('idedit').value),
        id_cata: document.getElementById('subject').value,
        title: document.getElementById('namesp').value,
        tacgia: document.getElementById('tacgia').value,
        votes: '',
        price: document.getElementById('giasp').value,
        tomtat: "Nụ cười nước ta vốn <br> thâm, sâu, bền...",
        img: 'img/bookcontent/' + urlimg.substr(12),
        countview: "1,897"

    }


    const patt = /\w\d/
    var resoult = patt.test(data.title);
    const patt2 = /\d/
    var resoult2 = patt2.test(data.tacgia);

    let string_pr = '' //xet danh muc có tồn tại k


    var zzz = []
    if (data.title === "") {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Chưa đủ thông tin'
        })
    } else if (resoult == true) {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Không được nhập số!'
        })
    } else if (data.title.length > 30 || data.title.length < 4) {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Tên sản phẩm trong khoảng 3 đến 30 ký tự!'
        })
    } else if (data.tacgia === "") {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Chưa đủ thông tin'
        })
    } else if (resoult2 == true) {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Không được nhập số!'
        })
    } else if (data.price === "") {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Chưa đủ thông tin'
        })
    } else if (data.price > 1000 || data.price < 1) {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Giá sản phẩm tối thiểu 0$ tối đa 1000$'
        })
    } else {
        swal({
                type: 'success',
                title: 'Thành Công',
                icon: 'success',
                text: 'Đã cập nhập'
            })
            //thực thi
        const productsUrl = url + 'product/' + data.id;
        const option = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const res = await fetchApi(productsUrl, option)
            //chỉ awaitt

    }

}
window.onload = () => {
    getProductID()
    document.getElementById('upate').addEventListener("click", update) //update cata
}