 var nf = new Intl.NumberFormat();
    update_cash();
    function checkout() {
        localStorage.setItem('cart', "");
        update_cash();
        alert("Thanh toán thành công!!!");
    }
    function set_count(obj, value) {
        let btn = obj.parentElement;
        let id = obj.parentElement.parentElement.children[0].value;
        var data_cart = localStorage.getItem('cart');
        var count = btn.children[2].value;

        if (value == '+')
            btn.children[2].value = Number(btn.children[2].value) + 1;
        else {
            if (btn.children[2].value > 1)
                btn.children[2].value -= 1;
            else {

                let string = id + ',' + btn.children[2].value + "|";
                var res = data_cart.replace(string, "");
                if (res == data_cart) {

                    string = "|" + id + ',' + btn.children[2].value;
                    res = data_cart.replace(string, "");
                    if (res == data_cart) {
                        string = id + ',' + btn.children[2].value;
                        res = data_cart.replace(string, "");
                    }

                }
                
                var hoi = prompt("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?: (Y/N) ");
                if (hoi == "Y" || hoi == "y") {
                localStorage.setItem('cart', res);
                alert("Xoá sản phẩm thành công!");
                update_cash();
                return;
                } else alert("Hủy thao tác xóa!");
            }
        }

        var res = data_cart.replace(id + ',' + count, id + ',' + btn.children[2].value);
        localStorage.setItem('cart', res);
        update_cash();
    }
    function update_cash() {
        document.getElementById('product').innerText = "";
        var data_cart = localStorage.getItem('cart');
        var product = data_cart.split("|");
        let all_cash = 0;
        if (data_cart == "") {
            document.getElementById('product').innerHTML = "<h3>Bạn chưa có đơn hàng nào!!!</h3>";
            document.getElementById('cash').innerText = 0;
            return;
        }
        product.forEach(element => {
            data_product = element.split(",");
            console.log(data_product);
            count = data_product[1];
            stt = (Number(data_product[0]));
            document.getElementById('product').innerHTML +=
                `
        <div class="cart">
            <input type="hidden" value="${stt}"/>
            <div class="box-1">
                <img src="${sanPham[stt]['thumb']}" alt="">
            </div>
            <div class="box-1">
                <h2> Tên sản phẩm </h2>
                <h3>${sanPham[stt]['name']}</h3>
            </div>
            <div class="box-1">
                <h2>Giá</h2> 
                <span class="cash"> ${nf.format(sanPham[stt]['cash'])} <sup>đ</sup></span>
            </div>
            <div class="box-2">
                <h2>Số lượng</h2>
                <button onclick="set_count(this,'-');" class="btn-count">-</button>
                <input type="number" min="0" value="${(count)}" disabled>
                <button onclick="set_count(this,'+');" class="btn-count">+</button>
            </div>
        </div>`;;
            all_cash += sanPham[stt]['cash'] * count;
        });
        document.getElementById('cash').innerText = nf.format(all_cash);
    }