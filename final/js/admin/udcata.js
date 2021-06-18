const URL = 'http://localhost:3000/';

const fetch_dm = async(url, option) => {
    const res = await fetch(url, option)
    return res.json()
}

// get id đã được save trên local về lưu value ở form
let idlocal = JSON.parse(localStorage.getItem("danhmuc"));

const processErrorr = err => console.log(err);

const getCatabyID = async() => {
    const cataUrl = url + 'catalog/' + idlocal
        //method
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const res = await fetch_dm(cataUrl, options, inform, processErrorr)
    inform(res);
}


const inform = data => {

    var idedit = document.getElementById('idedit');
    var nameedit = document.getElementById('nameedit');

    idedit.value += data.id;
    nameedit.value += data.name;

}

//được gọi khi submit ở form chứa link 
const update = async(e) => {
    e.preventDefault(); //chặn chuyển trang
    //get từ form update 
    const data = {
        id: parseInt(document.getElementById('idedit').value),
        name: document.getElementById('nameedit').value,
        soluongSP: 100,
        hot: 0
    }

    const patt = /\d/
    var resoult = patt.test(data.name);

    let string_cata = '' //xet danh muc có tồn tại k
    for (let i = 0; i < check_name.length; i++) {
        string_cata += check_name[i].name
    }


    if (data.name === "") {
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
    } else if (data.name.length > 20 || data.name.length < 4) {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Tên danh mục trong khoảng 3 đến 20 ký tự!'
        })
    } else if (string_cata.indexOf(data.name.toString()) >= 0) {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Tên danh mục đã tồn tại!'
        })
    } else {
        swal({
            type: 'success',
            title: 'Thành Công',
            icon: 'success',
            text: 'Đã cập nhập'
        })

        //thực thi
        const productsUrl = url + 'catalog/' + data.id;
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
    getCatabyID()
    document.getElementById('upate').addEventListener("click", update) //update cata
}