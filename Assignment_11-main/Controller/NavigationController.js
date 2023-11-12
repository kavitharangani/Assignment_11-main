import {customer_db, item_db, placeOrder_db} from "../db/db.js";

//ID Generate
const loadCustomerData = () =>{
    $("#customer-tbl-body").empty();
    customer_db.map((customer,index) => {
        let recode = `<tr><td class='customer_id'>${customer.cus_id}</td><td class='name'>${customer.name}</td><td class='nic'>${customer.nic}</td><td class='address'>${customer.address}</td></tr>`
        $("#customer-tbl-body").append(recode);
    })
}

//ID Generate
const loadItemData = () =>{
    $("#item-tbl-body").empty();
    item_db.map((item,index) => {
        let recode = `<tr><td class='item_id'>${item.item_id}</td><td class='item_name'>${item.item_name}</td><td class='quantity'>${item.quantity}</td><td class='price'>${item.price}</td><td class='description'>${item.description}</td></tr>`
        $("#item-tbl-body").append(recode);
    })
}

//ID Generate
const generateNewOrderID = () => {
    if (placeOrder_db.length === 0) {
        $('#Order_id').text(1);
    } else {
        let lastElement = placeOrder_db[placeOrder_db.length - 1];
        $('#Order_id').text((parseInt(lastElement.order_id)) + 1);
    }
}

$("#customer-nav").on('click',()=>{
    $("#customerForm").css('display','block');
    $("#storeForm").css('display','none');
    $("#placeOrderForm").css('display','none');
    $("#myTabContent").css('display','none');
    $("#OrderHistoryForm").css('display','none');
    loadCustomerData();
    //ID Generate
    if (customer_db.length === 0){
        $('#cus_id').text(1);
    }else {
        let lastElement = customer_db[customer_db.length - 1];
        $('#cus_id').text((parseInt(lastElement.cus_id))+1);
    }

});

$("#store-nav").on('click',()=>{
    $("#customerForm").css('display','none');
    $("#storeForm").css('display','block');
    $("#placeOrderForm").css('display','none');
    $("#myTabContent").css('display','none');
    $("#OrderHistoryForm").css('display','none');

    loadItemData();

    //ID Generate
    if (item_db.length === 0){
        $('#item_id').text(1);
    }else {
        let lastElement = item_db[item_db.length - 1];
        $('#item_id').text((parseInt(lastElement.item_id))+1);
    }
});

$("#place-order-nav").on('click',()=>{
    $("#customerForm").css('display','none');
    $("#storeForm").css('display','none');
    $("#placeOrderForm").css('display','block');
    $("#myTabContent").css('display','none');
    $("#OrderHistoryForm").css('display','none');

    $("#select").empty();
    $("#select").html(`<option className="options">Select Item ID</option>`);
    item_db.map((item,index) => {
        let recode = `<option class="options">${item.item_id}</option>`
        $("#select").append(recode);
    });

    $("#selectCus_ID").empty();
    $("#selectCus_ID").html(`<option className="options">Select Customer ID</option>`);
    customer_db.map((customer,index) => {
        let recode = `<option class="options">${customer.cus_id}</option>`
        $("#selectCus_ID").append(recode);
    });

    $('#itemName').text("______________________________");
    $('#itemQut').text("_____________");
    $('#itemPrice').text("___________");

    generateNewOrderID();
});

$("#OrderHistory-nav").on('click',()=>{
    $("#customerForm").css('display','none');
    $("#storeForm").css('display','none');
    $("#placeOrderForm").css('display','none');
    $("#myTabContent").css('display','none');
    $("#OrderHistoryForm").css('display','block');
});