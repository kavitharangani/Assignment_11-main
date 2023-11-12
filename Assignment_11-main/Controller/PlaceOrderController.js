import {customer_db, item_db, placeOrder_db} from "../db/db.js";
import {PlaceOrderHistory} from "../model/PlaceOrderHistory.js";

let ItemIndexElement;

const loadItemData = () =>{
    $("#item-tbl-body").empty();
    item_db.map((item,index) => {
        let recode = `<tr><td class='item_id'>${item.item_id}</td><td class='item_name'>${item.item_name}</td><td class='quantity'>${item.quantity}</td><td class='price'>${item.price}</td><td class='description'>${item.description}</td></tr>`
        $("#item-tbl-body").append(recode);
    })
}

//Combo Box Row Click
$(document).ready(function() {
    $('#select').change(function(){
        var selectedOption = $(this).find('option:selected');
        let item_id = selectedOption.val();

        let index= item_db.findIndex(item => item.item_id === item_id);
        let itemDbElement = item_db[index];

        ItemIndexElement = itemDbElement;

        $('#itemName').text(itemDbElement.item_name);
        $('#itemQut').text(itemDbElement.quantity);
        $('#itemPrice').text(itemDbElement.price);

        $('#quantity_placeOrder').focus();
    });
});
document.getElementById("select").addEventListener("change", function() {
    if($('#select').val() === "Select Item ID"){
        $('#itemName').text("______________________________");
        $('#itemQut').text("_____________");
        $('#itemPrice').text("___________");
    }
});

//Add Button
$("#placeOrderbtns>button[type='button']").eq(0).on("click", () => {
    let item_id = $("#select").val();
    let quantity = parseInt($("#quantity_placeOrder").val());
    let unit_price = parseFloat(ItemIndexElement.price);
    let total = quantity * unit_price;

    let existingRow = $(`#placeOrder-tbody tr[data-item-id="${item_id}"]`);

    let itemDbElement = item_db.find(item => item.item_id === item_id);

    if (existingRow.length) {
        let existingQuantity = parseInt(existingRow.find('.quantity').text());
        let newQuantity = existingQuantity + quantity;
        let newTotal = newQuantity * unit_price;

        if (itemDbElement && newQuantity <= itemDbElement.quantity) {
            existingRow.find('.quantity').text(newQuantity);
            existingRow.find('.price').text(newTotal);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'The quantity is not enough!',
                text: 'Something went wrong!'
            });
        }
    } else {
        if (itemDbElement && itemDbElement.quantity >= quantity) {
            let record = `
        <tr data-item-id="${item_id}">
            <td class="item_id">${item_id}</td>
            <td class="item_price">${unit_price}</td>
            <td class="quantity">${quantity}</td>
            <td class="price">${total}</td>
            <td class="button">
                <button class="removeButton" type="button">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>`;

            $("#placeOrder-tbody").append(record);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'The quantity is not enough!',
                text: 'Something went wrong!'
            });
        }
    }

    let netTot = 0;
    $("#placeOrder-tbody tr").each(function() {
        netTot += parseFloat($(this).find('.price').text());
    });

    $("#tot").text(netTot);

    $(".removeButton").on("click", function() {
        $(this).closest('tr').remove();

        let newNetTot = 0;
        $("#placeOrder-tbody tr").each(function() {
            newNetTot += parseFloat($(this).find('.price').text());
        });

        $("#tot").text(newNetTot);
    });

    $('#itemName').text("______________________________");
    $('#itemQut').text("_____________");
    $('#itemPrice').text("___________");
});


//Reset Button
$("#placeOrderbtnResetbtn").eq(0).on("click", () => {
    $('#itemName').text("______________________________");
    $('#itemQut').text("_____________");
    $('#itemPrice').text("___________");
    $('#placeOrder-tbody>tr').remove();
});

//PlaceOrder Button
$("#place_Order").on("click", () => {
    let amount = parseFloat($('#amount').val());
    let netTotal = parseFloat($('#tot').text());

    $("#placeOrder-tbody tr").each(function() {
        let quantity = parseFloat($(this).find('.quantity').text());
        let item_id = $(this).find('.item_id').text();

        let index = item_db.findIndex(item => item.item_id === item_id);

        if (index !== -1) {
            let newQuantity = item_db[index].quantity - quantity;

            if (newQuantity >= 0) {
                item_db[index].quantity = newQuantity;
            } else {
                console.log("Error: Not enough quantity in stock for item with ID " + item_id);
            }
        } else {
            console.log("Item not found in item_db.");
        }
    });

    if (amount >= netTotal) {
        let cash = amount - netTotal;
        Swal.fire({
            icon: 'success',
            title: `Order Successful! \n Cash: ${cash.toFixed(2)}`,
            showConfirmButton: true
        });
        $('#placeOrderbtnResetbtn').click();
        $('#amount').val("");
        $('#tot').text(0);

        let date = $('#currentDate').text();
        let orderID = $('#Order_id').text();
        let cusID = $('#selectCus_ID').val();

        let recode = `<tr><td class='date'>${date}</td><td class='order_id'>${orderID}</td><td class='cus_id'>${cusID}</td><td class='net_total'>${netTotal}</td></tr>`
        $("#OrderHistory-tbody").append(recode);

        let placeOrderHistory = new PlaceOrderHistory(date,orderID,cusID,netTotal);
        placeOrder_db.push(placeOrderHistory);

        generateNewOrderID();

    } else {
        Swal.fire({
            icon: 'error',
            title: 'The amount is not enough!',
            text: 'Something went wrong!'
        });
    }
    loadItemData();
});


//ID Generate
const generateNewOrderID = () => {
    if (placeOrder_db.length === 0) {
        $('#Order_id').text(1);
    } else {
        let lastElement = placeOrder_db[placeOrder_db.length - 1];
        $('#Order_id').text((parseInt(lastElement.order_id)) + 1);
    }

    console.log(placeOrder_db.length);
}
function updateCurrentDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    document.getElementById('current-date').textContent = formattedDate;
}

// Call the function to update the date immediately

updateCurrentDate();
setInterval(updateCurrentDate, 1000); // Update every second

