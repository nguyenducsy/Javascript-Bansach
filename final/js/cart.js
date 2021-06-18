var table = document.querySelector('.seperate-left');


let row = '';

if (JSON.parse(localStorage.getItem('items')) === null) {
    row += 'No item in cart';
} else {
    JSON.parse(localStorage.getItem('items')).map(p => {

        row += ` <div class="information-product rowpr">
        <div class="image-product">
            <img src="${p.img}" alt="" />
        </div>
        <div class="detail-product">
            <div class="detail-product-top">
                <div class="detail-product-left">
                    <a class="item" href="#">${p.name} </a>
                    <div class="word2">
                        <p class="ship-quickly">Hàng Giao 2H</p>
                    </div>
                    <div class="word2">        
                        <span> <button class="del" onclick="del(${p.id})">Xóa</button></span
          ><span class="for-after">Để dành mùa sau</span>
                    </div>
                </div>
                   <div class="number">
                        <div class="CartQty__StyledCartQty-o1bx97-0 iaIXXn">
                            <span class="qty-decrease qty-increase"> <button class="tru" onclick="tru(${p.id})" >-</button></span>
                            <span class="quatity"> <input type="tel" class="qty-input" value="${p.no}" /></span>
                            <span class="qty-decrease qty-increase "> <button class="cong" onclick="cong(${p.id})" >+</button></span>
                        </div>
                    </div>
                <div class="detail-product-right">
                    <div class="price-item">
                    <input type="hidden" value =" ${p.price}">
                        <h4><span>${p.price * p.no}</span>.000<sup>đ</sup></h4>
                        <h6><del>3.690.000</del> -23%</h6>
                    </div>
      </div>
    </div>
  </div>
</div>`
    })
    table.innerHTML = row;
}


//count itemsp
const coun_sp = document.querySelector('.cou_sp');
const coun_spp = document.querySelector('.cou_spp');
let no = 0;
JSON.parse(localStorage.getItem('items')).map(p => {
    no = no + p.no
})
coun_sp.innerHTML = no;
coun_spp.innerHTML = no;


// del 
function del(e) {

    let arr_item = [];

    JSON.parse(localStorage.getItem("items")).map(p => {
        if (p.id != e) {

            arr_item.push(p)
        }
    })
    localStorage.setItem("items", JSON.stringify(arr_item));
    window.location.reload();
    changepage();

}


//cap nhap page neu del het sản phẩm thì trả về index
const changepage = async() => {
    const find_item = JSON.parse(localStorage.getItem("items"));
    if (find_item.length === 0) {
        window.location = "index.html";
    }
}

//total
var total = document.querySelector('.total');
let sum = 0;

const local_total = JSON.parse(localStorage.getItem("items"));
for (let i = 0; i < local_total.length; i++) {
    sum += local_total[i].price * local_total[i].no
}

total.value += `${sum + 30}`;


//+ 
let items_old = [];
let no_new = 0;
const cong = async(id) => {

        const local_Item = JSON.parse(localStorage.getItem("items"));

        for (let i = 0; i < local_Item.length; i++) {

            // check id voi id local
            if (id === local_Item[i].id) {
                no_new = local_Item[i].no + 1
            } else no_new = local_Item[i].no

            //du lieu tu local cu (no_new )
            let item_old = {
                id: local_Item[i].id,
                name: local_Item[i].name,
                img: local_Item[i].img,
                price: local_Item[i].price,
                total: local_Item[i].total * no_new,
                no: no_new // xu ly cho nay để tăng (quá đơn giản)
            };

            items_old.push(item_old);

            localStorage.setItem("items", JSON.stringify(items_old));
            window.location.reload();

        }
    }
    // - 
const tru = async(id) => {

    const local_Item = JSON.parse(localStorage.getItem("items"));


    for (let i = 0; i < local_Item.length; i++) {





        // check id voi id local
        if (local_Item[i].no > 1) {
            if (id === local_Item[i].id) {
                no_new = local_Item[i].no - 1
            } else no_new = local_Item[i].no

            //du lieu tu local cu (no_new )
            let item_old = {
                id: local_Item[i].id,
                name: local_Item[i].name,
                img: local_Item[i].img,
                price: local_Item[i].price,
                total: local_Item[i].total * no_new,
                no: no_new // xu ly cho nay để tăng (quá đơn giản)
            };

            items_old.push(item_old);

            localStorage.setItem("items", JSON.stringify(items_old));
            window.location.reload();
        } else {
            localStorage.setItem("items", JSON.stringify([]));
            window.location.reload();
        }

    }



}