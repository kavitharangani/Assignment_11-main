import {ItemModel} from "../model/ItemModel.js"
import {customer_db, item_db} from "../db/db.js";

const loadItemData = () =>{
    $("#item-tbl-body").empty();
    item_db.map((item,index) => {
        let recode = `<tr><td class='item_id'>${item.item_id}</td><td class='item_name'>${item.item_name}</td><td class='quantity'>${item.quantity}</td><td class='price'>${item.price}</td><td class='description'>${item.description}</td></tr>`
        $("#item-tbl-body").append(recode);
    })
}

//Submit Button
$("#storebtns>button[type='button']").eq(0).on("click", () => {
    let item_id = $("#item_id").text();
    let item_name = $("#item_name").val();
    let quantity = $("#quantity").val();
    let price = $("#price").val();
    let description = $("#description").val();

    if (!item_id){
        Swal.fire({
            icon: 'error',
            title: 'Please Check Item ID Field',
            text: 'Something went wrong!'
        })
    }else{
        if (!item_name){
            Swal.fire({
                icon: 'error',
                title: 'Please Check Item Name Field',
                text: 'Something went wrong!'
            })
        }else{
            if (!quantity){
                Swal.fire({
                    icon: 'error',
                    title: 'Please Check Item Quantity Field',
                    text: 'Something went wrong!'
                })
            }else {
                if (!price){
                    Swal.fire({
                        icon: 'error',
                        title: 'Please Check Item Price Field',
                        text: 'Something went wrong!'
                    })
                }else {
                    if (!description){
                        Swal.fire({
                            icon: 'error',
                            title: 'Please Check Item Description Field',
                            text: 'Something went wrong!'
                        })
                    }else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Item Saved Successful',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        let item_obj = new ItemModel(item_id,item_name,quantity,price,description);
                        item_db.push(item_obj);
                        $("#storebtns>button[type='reset']").click();

                        loadItemData();
                    }
                }
            }
        }
    }
    generateNewItemID();
});

let index;
let item_id;

//Click Row
$("tbody").on("click", "tr", function() {
    item_id = $(this).find(".item_id").text();
    let item_name = $(this).find(".item_name").text();
    let quantity = $(this).find(".quantity").text();
    let price = $(this).find(".price").text();
    let description = $(this).find(".description").text();

    $("#item_name").val(item_name);
    $("#quantity").val(quantity);
    $("#price").val(price);
    $("#description").val(description);

    index=$(this).index();
});


//Update
$("#storebtns>button[type='button']").eq(1).on("click", () => {
    let item_name = $("#item_name").val();
    let quantity = $("#quantity").val();
    let price = $("#price").val();
    let description = $("#description").val();

    let item_obj = new ItemModel(item_id,item_name,quantity,price,description);

    if (!item_id){
        Swal.fire({
            icon: 'error',
            title: 'Please Check Item ID Field',
            text: 'Something went wrong!'
        })
    }else{
        if (!item_name){
            Swal.fire({
                icon: 'error',
                title: 'Please Check Item Name Field',
                text: 'Something went wrong!'
            })
        }else{
            if (!quantity){
                Swal.fire({
                    icon: 'error',
                    title: 'Please Check Item Quantity Field',
                    text: 'Something went wrong!'
                })
            }else {
                if (!price){
                    Swal.fire({
                        icon: 'error',
                        title: 'Please Check Item Price Field',
                        text: 'Something went wrong!'
                    })
                }else {
                    if (!description){
                        Swal.fire({
                            icon: 'error',
                            title: 'Please Check Item Description Field',
                            text: 'Something went wrong!'
                        })
                    }else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Item Update Successful',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        let index= item_db.findIndex(item => item.item_id === item_id);
                        item_db[index]=item_obj;

                        $("#storebtns>button[type='reset']").click();
                    }
                }
            }
        }
    }
    loadItemData();
});

//Delete
$("#storebtns>button[type='button']").eq(2).on("click", () => {
    let item_name = $("#item_name").val();
    Swal.fire({
        title: 'Are you sure?',
        text: "You want delete row?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                `${item_name} has been deleted.`,
                'success'
            )
            let index= item_db.findIndex(item => item.item_id === item_id);
            item_db.splice(index,1);
            loadItemData();
            $("#storebtns>button[type='reset']").click();
            generateNewItemID();
        }
    })
})


//ID Generate
const generateNewItemID = () => {
    if (item_db.length === 0){
        $('#item_id').text(1);
    }else {
        let lastElement = item_db[item_db.length - 1];
        $('#item_id').text((parseInt(lastElement.item_id))+1);
    }
}

