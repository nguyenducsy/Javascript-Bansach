const url = 'http://localhost:3000/order'

async function getApi() {
    const response = await fetch(url);

    const data = await response.json();
    var table = document.querySelector('.seperate-left');
    let row = '';
    const coun_order = document.querySelector('.cou_order');
    coun_order.innerHTML = data.length;

    for (let i = 0; i < data.length; i++) {

        row += ` <div class="information-product rowpr">
        <div class="detail-product" style="width: 98%">
            <div class="detail-product-top">
            <div class="idorder">ID${data[i].id} </div>
                <div class="detail-product-left" style="width: 100%">
                    <a class="item" href="#"> ${data[i].nameuser}</a>
                </div>
                <div class="detail-product-left" style="width: 100%">
                <a class="item" href="#"> ${data[i].sdt}</a>
        
            </div>
                <div class="detail-product-left" style="width: 100%">
                <a class="item" href="#"> ${data[i].ngaymua}</a>
                </div>
                   <div class="number" style="margin-top: -5px;">
                        <div class="CartQty__StyledCartQty-o1bx97-0 iaIXXn">
                            <span class="qty-decrease qty-disable"> <input type="tel" class="qty-input" value="${data[i].quantity}" /></span>
                        </div>
                    </div>      
                    <div class="detail-product-left" style="width: 100%">
                    <a class="stt" href="#">${data[i].status}</a>
                    </div>
                <div class="detail-product-right" style="margin-top: -40px;">
                    <div class="price-item">
                        <h4>${data[i].total}.000<sup>đ</sup></h4>
                    </div>
        </div>
        </div>
        </div>
        </div>`

    }

    table.innerHTML = row;
    //count item order
    const coun_sp = document.querySelector('.cou_sp');
    let no = 0;
    JSON.parse(localStorage.getItem('items')).map(p => {
        no = no + p.no
    })
    coun_sp.innerHTML = no;
}

// const del = async(id) => {

//         console.log(id);

//         // const delUrl = url + 'product/' + id
//         // const option = {
//         //     method: 'DELETE',
//         //     headers: {
//         //         'Content-type': 'application/json'
//         //     }
//         // }
//         // return await fetchApi(delUrl, option);
//     }






getApi()