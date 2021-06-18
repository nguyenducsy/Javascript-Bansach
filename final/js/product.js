const product = 'http://localhost:3000/product';

async function getApi() {
    const response = await fetch(product);

    const data = await response.json();

    //show in page product
    for (let i = 0; i < data.length; i++) {

        document.getElementById('sachhot').innerHTML += `  
        
                                            <div class="content ">
                                            <div class="boximg"><img src="${data[i].img}" alt=""></div>
                                            <div class="ct">
                                                <div class="titlee">${data[i].title}</div>
                                                <input type="hidden" name="id" value="${data[i].id}">
                                                <div class="price${Math.floor(Math.random() * 4)}">Giá :<strong> ${data[i].price}</strong>.000<sup>đ</sup></div>
                                                <div class="taccgia"><strong> ${data[i].tacgia}</strong></div>
                                                <div class="heart"><i class="fa fa-heart" style="font-size:14px"></i><i class="fa fa-heart" style="font-size:14px"></i><i class="fa fa-heart" style="font-size:14px"></i><i class="fa fa-heart" style="font-size:14px"></i><i class="fa fa-heart" style="font-size:14px"></i></div>
                                                <div class="vote">${data[i].votes} votes</div>
                                                <div class="tomtat">${data[i].tomtat}</div>
                                            </div>
                                            <div class="iconbook"><a href="product_detail.html"><i class='fas fa-book-open' style='font-size:15px'></i></a></div>
                                            <span>
                                                <div class="line"></div>
                                                <div class="chitiet"> <button class="giohang" >MUA</button></div>
                                            </span>
                                            <div class="view">${data[i].countview} lượt xem</div>
                                        </div>`


    }
    var btnadd = document.getElementsByClassName('giohang');
    var items = [];

    var arr = [];

    for (let i = 0; i < btnadd.length; i++) {

        arr.push(btnadd[i]);

        arr[i].addEventListener("click", function() {
            if (typeof(Storage) != "undefined") {
                let item = {
                    id: i + 1,
                    name: data[i].title,
                    img: data[i].img,
                    price: data[i].price,
                    total: data[i].total,
                    no: 1
                };

                if (JSON.parse(localStorage.getItem('items')) === null) {
                    items.push(item);
                    localStorage.setItem("items", JSON.stringify(items));
                    window.location.reload();

                } else {
                    const local_Item = JSON.parse(localStorage.getItem("items"));

                    local_Item.map(p => {
                        if (item.id === p.id) {

                            item.no = p.no + 1;

                            if (items.length === 0) {
                                item.total = parseInt(item.price) * item.no;
                            } else if (items.length != 0) {
                                item.total = (parseInt(item.price) * item.no) + (p.total - parseInt(p.price));
                            }

                        } else if (item.id !== p.id) {

                            item.total = (parseInt(item.price) * item.no) + parseInt(p.total);
                            items.push(p);
                        }
                    })

                    items.push(item);
                    localStorage.setItem("items", JSON.stringify(items));
                    window.location.reload();
                }

            } else alert("local not working on your browser")

        })

    }

    //show count
    const coun_sp = document.querySelector('.cou_sp');
    let no = 0;
    JSON.parse(localStorage.getItem('items')).map(p => {
        no = no + p.no
    })
    coun_sp.innerHTML = no;


}

getApi();