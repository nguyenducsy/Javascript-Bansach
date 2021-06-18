const catalog = 'http://localhost:3000/catalog';


async function category() {
    const response = await fetch(catalog);
    let data = await response.json();

    //load cata
    var danhmuc = document.getElementById('danhmuc');
    for (let i = 0; i < data.length; i++) {

        danhmuc.innerHTML += `<li><a href="${data[i].id}">${data[i].name}</a></li>
                                                        <span>${data[i].soluongSP}</span>`
    }

    //load categoryhot
    var freehot = document.getElementById('dmhot')
    var item = 1;
    var count = ["two", "three", "four", "five", "six"];
    for (let y = 0; y < data.length; y++) {

        if (data[y].hot === 1) {
            freehot.innerHTML += `<li class="all ${count[item-1]}"><a href="${data[y].id}">${data[y].name}</a></li>
                                                    <div class="button bt${item}"></div>`
            item++;
        }
    }






}

category();