const url = 'http://localhost:3000/';

const fetchApi = async(url, option) => {
    const res = await fetch(url, option)
    return res.json()
}


const processErro = err => console.log(err);


const addcata = async(e) => {
    e.preventDefault();
    const data = {
        id: '',
        name: document.getElementById('namedm').value,
        soluongSP: 1000,
        hot: ''
    }


    const patt = /\d/
    var resoult = patt.test(data.name);


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
    } else {
        swal({
            type: 'success',
            title: 'Thành Công',
            icon: 'success',
            text: 'Đã Thêm Vào Danh Sách'
        })


        const cataUrl = url + 'catalog'
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
    document.getElementById('submit').addEventListener("click", addcata)

}