const url = 'http://localhost:3000/';

const fetchApi = async(url, option) => {
    const res = await fetch(url, option)
    return res.json()
}


const processErro = err => console.log(err);

const addpro = async(e) => {
    e.preventDefault();
    var pattimg = document.getElementById('imgsp').value;
    var urlimg = `${pattimg}`

    const data = {
        id: '',
        id_cata: document.getElementById('subject').value,
        title: document.getElementById('namesp').value,
        tacgia: document.getElementById('tacgia').value,
        votes: '',
        price: parseInt(document.getElementById('giasp').value),
        tomtat: "Nụ cười nước ta vốn <br> thâm, sâu, bền...",
        img: 'img/bookcontent/' + urlimg.substr(12),
        countview: "1,897"
    }

    const patt = /\d/
    var resoult = patt.test(data.tacgia);

    if (data.title === "") {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Chưa Đủ Thông tin'
        })
    } else if (data.title.toString().length > 30 || data.title.toString().length < 2) {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Tên sản phẩm trong khoảng 3 đến 30 ký tự!'
        })
    } else if (data.tacgia == "") {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Nhập vào tác giả!'
        })
    } else if (resoult == true) {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Không được nhập số!'
        })
    } else if (data.tacgia.length < 1 || data.tacgia.length > 20) {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Tên tác giả chỉ trong khoảng 1 đến 20 ký tự!'
        })
    } else if (data.price === "") {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Nhập thêm giá!!'
        })
    } else if (data.price > 1000 || data.price < 1) {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Giá sản phẩm tối thiểu 0$ tối đa 1000$'
        })
    } else if (data.img === "img/bookcontent/") {
        swal({
            type: 'warning',
            title: 'Thất Bại',
            icon: 'warning',
            text: 'Hãy thêm hình!!'
        })
    } else {
        swal({
            type: 'success',
            title: 'Thành Công',
            icon: 'success',
            text: 'Đã Thêm Vào Danh Sách'
        })


        const cataUrl = url + 'product'
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const res = await fetchApi(cataUrl, option)
    }
}


window.onload = () => {
    document.getElementById('submit').addEventListener("click", addpro)
}