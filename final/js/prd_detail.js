const url = 'http://localhost:3000/';


const fetchApi = async(url, option) => {
    const res = await fetch(url, option)
    return res.json()
}

const processError = err => console.log(err);


const getPro_detail = async() => {

    const cataUrl = url + 'product'
        //method
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const res = await fetchApi(cataUrl, options, processData, processError)
    console.log(res);

    processData(res);
}



const processData = data => {
    var _tb = document.querySelector('#product')

    _tb.innerHTML += ''
    for (let i = 0; i < data.length; i++) {

        _tb.innerHTML += `
                <div class="noidung">
            <div class="rtimg"><img src="${data[i].img}" alt=""></div>
            <a href="#"><strong>${data[i].title}</strong> </a>
            <nav>${data[i].tacgia}</nav>
            <hr>
            <ins>4.97<span>/5</span><strong>(${data[i].votes} votes)</strong></ins>
            <div class="iconbook"> <button id="detail" onclick="detail(${data[i].id})"><i class='fas fa-book-open' style='font-size:15px'></i></button></div>
             </div>`
    }


}


const detail = async(id) => {

    const cataUrl = url + 'product/' + id
        //method
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const res = await fetchApi(cataUrl, options, processData, processError)
    localStorage.setItem("detail", JSON.stringify(res));
    window.location = 'product_detail.html'

}
const detailsp = document.getElementById('detailsp');

const print_detail = async() => {

    const detail_local = JSON.parse(localStorage.getItem("detail"))

    detailsp.innerHTML += `
    <div class="boximg">
    <img style="width: 100%" src="${detail_local.img}" alt="">
</div>
<div class="boxcontent" >
    <div class="tieude">${detail_local.title} </div>
    <ul>
        <li>Tác giả : ${detail_local.tacgia}
        </li>
        <li>Thể loại : Văn Hóa
        </li>
        <li>Nhà xuất bản : Đang cập nhập
        </li>
    </ul>
    <div class="dinhdang">Định dạng : Epub</div>
    <div class="ngayupdate">Ngày cập nhập :</div>
    <div class="timdoc">Tìm đọc sách giấy : <a href="index.php">Tại đây</a> </div>
    <div class="muasach">Đọc sách</div>
    <div class="tomtat">Sau khi quậy tung trời ở khu Thiên Đường, Triệu Ngọc xuất hiện với gương mặt của đội trưởng quản giáo tới khu Địa Ngục cứu cha vợ Miêu Khôn. Không ngờ khu Địa Ngục lại còn giam cầm Lundy - người giàu nhất thế giới đã mất tích sáu năm
        nay. Và giải thưởng tìm được ông ta là một tỷ đô la Mỹ, ứng với quẻ văn siêu cấp hôm nay Triệu Ngọc gieo được: Khôn Cấn - Đoài Khảm. Tuy nhiên, kế hoạch chạy trốn của Triệu Ngọc càng ngày càng gặp nhiều khó khăn, ba
    </div>
</div>
<div class="xephang"><span>5/5</span><strong>( ${detail_local.votes} votes)</strong></div>

    `

}

function quantity() {
    const coun_sp = document.querySelector('.cou_sp');

    let no = 0;
    JSON.parse(localStorage.getItem('items')).map(p => {
        no = no + p.no
    })
    coun_sp.innerHTML = no;
}

window.onload = () => {
    getPro_detail();
    print_detail();
    quantity()
    document.getElementById('detail').addEventListener("click", detail)
}