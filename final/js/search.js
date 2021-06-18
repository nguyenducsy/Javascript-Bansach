const url = 'http://localhost:3000/product';

//get in search
const fetchApi_Detail = async(url, option) => {
    const res = await fetch(url, option)
    return res.json()
}
async function fetchApi() {
    const responve = await fetch(url)
    const data = await responve.json()
    var input = document.getElementById('text_search')
    var out = document.getElementById('out')

    input.onkeyup = function() {
        document.getElementById('boxkq').style.opacity = 1
        let _ul = document.createElement('div');
        _ul.style.marginLeft = "-40px"

        let _kq = data.filter(item =>

            item.title.toLowerCase().includes(input.value.toLowerCase()))

        out.innerHTML = ''
        _kq.forEach((p) => {
            _ul.innerHTML += `<button id="detail" onclick="detail(${p.id})"> ${p.title} <span>( ${p.tacgia} )</span></button><br> `
        })
        out.append(_ul)
        if (input.value === "") {
            _ul.remove()
            document.getElementById('boxkq').style.opacity = 0
        }

    }


}

const processError = err => console.log(err);
const processData = data => console.log(data);

const detail = async(id) => {


    const cataUrl = url + '/' + id
        //method
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const res = await fetchApi_Detail(cataUrl, options, processData, processError)

    localStorage.setItem("detail", JSON.stringify(res));
    window.location = 'product_detail.html'

}


fetchApi()