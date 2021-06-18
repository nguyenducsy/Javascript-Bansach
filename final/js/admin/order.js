const url = 'http://localhost:3000/';


const fetchApi = async(url, option) => {
    const res = await fetch(url, option)
    return res.json()
}

const processError = err => console.log(err);

const getPro = async() => {
    const cataUrl = url + 'order'
        //method
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const res = await fetchApi(cataUrl, options, processData, processError)
    processData(res);
}

const processData = data => {
    var _tb = document.querySelector('#row_client')

    _tb.innerHTML += ''
    for (let i = 0; i < data.length; i++) {
        let _tt = ''
        if (data[i].status === 'Đang giao hàng') {
            _tt += 'tc'
        } else _tt += 'tb'

        _tb.innerHTML += `
        <tr>
        <td>${i+1}. ${data[i].nameuser}</td>
        <td class="tt ${_tt}">${data[i].status}</td>
        <td>$${data[i].total}.000</td>
    </tr>
 
    `
    }
}


window.onload = () => {
    getPro();

}