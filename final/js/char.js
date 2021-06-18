const url = 'http://localhost:3000/'



const fetchApi = async(url, option) => {
    const res = await fetch(url, option)
    return res.json()
}


const processError = err => console.log(err);

const getOrder = async() => {
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


const getPro = async() => {
    const cataUrl = url + 'product'

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const res = await fetchApi(cataUrl, options, processData, processError)
    Product(res);
}

let total = 0;
let total_max = [];
const processData = data => {

    let thang_1 = 0;
    let thang_2 = 0;
    let thang_3 = 0;
    let thang_4 = 0;
    let thang_5 = 0
    let thang_6 = 0
    let thang_7 = 0


    for (let i = 0; i < data.length; i++) {


        total_max.push(data[i].total)

        total += data[i].total

        let ngaymua = data[i].ngaymua

        let month_1 = /[0-9]{2}-1-[0-9]{4}/
        let resoult_1 = month_1.test(ngaymua)
        if (resoult_1 == true) {
            thang_1 += 1
        }

        let month_2 = /[0-9]{2}-2-[0-9]{4}/
        let resoult_2 = month_2.test(ngaymua)

        if (resoult_2 == true) {
            thang_2 += 1
        }

        let month_3 = /[0-9]{2}-3-[0-9]{4}/
        let resoult_3 = month_3.test(ngaymua)

        if (resoult_3 == true) {
            thang_3 += 1
        }


        let month_4 = /[0-9]{2}-4-[0-9]{4}/
        let resoult_4 = month_4.test(ngaymua)

        if (resoult_4 == true) {
            thang_4 += 1
        }

        let month_5 = /[0-9]{2}-5-[0-9]{4}/
        let resoult_5 = month_5.test(ngaymua)

        if (resoult_5 == true) {
            thang_5 += 1
        }

        let month_6 = /[0-9]{2}-6-[0-9]{4}/
        let resoult_6 = month_6.test(ngaymua)

        if (resoult_6 == true) {
            thang_6 += 1
        }

        let month_7 = /[0-9]{2}-7-[0-9]{4}/
        let resoult_7 = month_7.test(ngaymua)

        if (resoult_7 == true) {
            thang_7 += 1
        }



    }

    document.getElementById('donhang').innerHTML = `
    
        <div class="border-head">
            <h3>ĐƠN HÀNG</h3>
        </div>
        <div class="custom-bar-chart">
            <ul class="y-axis">
                <li><span>25</span></li>
                <li><span>20</span></li>
                <li><span>15</span></li>
                <li><span>10</span></li>
                <li><span>5</span></li>
                <li><span>0</span></li>

            </ul>
            <div class="bar">
                <div class="title">THÁNG 1</div>
                <div class="value tooltips" data-original-title="${thang_1}" data-toggle="tooltip" data-placement="top" style=" height:${thang_1 * 100 / 25}%"></div>
            </div>
            <div class="bar ">
                <div class="title">THÁNG 2</div>
                <div class="value tooltips" data-original-title="${thang_2}" data-toggle="tooltip" data-placement="top" style=" height:${thang_2 * 100 / 25}%"></div>
            </div>
            <div class="bar ">
                <div class="title">THÁNG 3</div>
                <div class="value tooltips" data-original-title="${thang_3}" data-toggle="tooltip" data-placement="top" style=" height:${thang_3 * 100 / 25}%"></div>
            </div>
            <div class="bar ">
                <div class="title">THÁNG 4</div>
                <div class="value tooltips" data-original-title="${thang_4}" data-toggle="tooltip" data-placement="top" style=" height:${thang_4 * 100 / 25}%"></div>
            </div>
            <div class="bar">
                <div class="title">THÁNG 5</div>
                <div class="value tooltips" data-original-title="${thang_5}" data-toggle="tooltip" data-placement="top" style=" height:${thang_5 * 100 / 25}%"></div>
            </div>
            <div class="bar ">
                <div class="title">THÁNG 6</div>
                <div class="value tooltips" data-original-title="${thang_6}" data-toggle="tooltip" data-placement="top" style=" height:${thang_6 * 100 / 25}%"></div>
            </div>
            <div class="bar">
                <div class="title">THÁNG 7</div>
                <div class="value tooltips" data-original-title="${thang_7}" data-toggle="tooltip" data-placement="top" style=" height:${thang_7 * 100 / 25}%"></div>
            </div>
        </div>
        `
        //total don hang
    document.getElementById('doanhthu').innerHTML = `<span style="color: #4ECDC4;"><i class="fas fa-angle-double-up"></i></span> ${total} $`

    var name = '';
    for (let i = 0; i < data.length; i++) {

        if (data[i].total === Math.max.apply(Math, total_max)) {

            name += data[i].nameuser


        }
    }


    //đơn hàng giá trị cao
    document.getElementById('dongiatri').innerHTML = `
    <div class="green-panel pn">
    <div class="green-header">
        <h5>ĐƠN HÀNG CAO NHẤT</h5>
    </div>
    <div class="chart mt">
        <div class="sparkline" data-type="line" data-resize="true" data-height="75" data-width="90%" data-line-width="1" data-line-color="#fff" data-spot-color="#fff" data-fill-color="" data-highlight-line-color="#fff" data-spot-radius="4" data-data="[200,135,667,333,526,996,564,123,890,464,655]"></div>
    </div>
    <p class="mt"><b>$ ${Math.max.apply(Math, total_max) }</b><br/>${name}</p>
</div>
`
}
const Product = data => {


    let count = 0;
    let tong_gia_tri = 0
    for (let i = 0; i < data.length; i++) {
        tong_gia_tri += data[i].price
        count = i + 1

    }



    document.getElementById('sanpham').innerHTML = `
            <p>Tổng giá trị ${tong_gia_tri}$</p>
            <footer>
                <div class="pull-left">
                    <h5><i class="fa fa-hdd-o"></i> ${count} SP</h5>
                </div>
                <div class="pull-right">
                    <h5>Tồn kho</h5>
                </div>
            </footer>
            `

}





getOrder();
getPro();