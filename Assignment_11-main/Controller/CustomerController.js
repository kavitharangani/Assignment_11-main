import {CustomerModel} from "../model/CustomerModel.js"
import {customer_db} from "../db/db.js";

const loadStudentData = () =>{
    $("#customer-tbl-body").empty();
    customer_db.map((customer,index) => {
        let recode = `<tr><td class='customer_id'>${customer.cus_id}</td><td class='name'>${customer.name}</td><td class='nic'>${customer.nic}</td><td class='address'>${customer.address}</td></tr>`
        $("#customer-tbl-body").append(recode);
    })
}

//Submit
$("#customerbtns>button[type='button']").eq(0).on("click", () => {
    let cus_id = $("#cus_id").text();
    let name = $("#name").val();
    let nic = $("#nic").val();
    let address = $("#address").val();

    if (!cus_id){
        Swal.fire({
            icon: 'error',
            title: 'Please Check Customer ID Field',
            text: 'Something went wrong!'
        })
    }else{
        if (!name){
            Swal.fire({
                icon: 'error',
                title: 'Please Check Customer Name Field',
                text: 'Something went wrong!'
            })
        }else{
            if (!nic){
                Swal.fire({
                    icon: 'error',
                    title: 'Please Check Customer NIC Field',
                    text: 'Something went wrong!'
                })
            }else {
                if (!address){
                    Swal.fire({
                        icon: 'error',
                        title: 'Please Check Customer Address Field',
                        text: 'Something went wrong!'
                    })
                }else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Customer Saved Successful',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    let cus_obj = new CustomerModel(cus_id,name,nic,address);
                    customer_db.push(cus_obj);
                    loadStudentData();
                    $("#customerbtns>button[type='reset']").click();
                }
            }
        }
    }
    generateNewCusID();
});

//Row Click
let index;
let cus_id;
$("tbody").on("click", "tr", function() {
    cus_id = $(this).find(".customer_id").text();
    let name = $(this).find(".name").text();
    let nic = $(this).find(".nic").text();
    let address = $(this).find(".address").text();

    $("#name").val(name);
    $("#nic").val(nic);
    $("#address").val(address);

    index=$(this).index();
});

//Update
$("#customerbtns>button[type='button']").eq(1).on("click", () => {
    let name = $("#name").val();
    let nic = $("#nic").val();
    let address = $("#address").val();

    let customer_obj = new CustomerModel(cus_id,name,nic,address);


    if (!cus_id){
        Swal.fire({
            icon: 'error',
            title: 'Please Check Customer ID Field',
            text: 'Something went wrong!'
        })
    }else{
        if (!name){
            Swal.fire({
                icon: 'error',
                title: 'Please Check Customer Name Field',
                text: 'Something went wrong!'
            })
        }else{
            if (!nic){
                Swal.fire({
                    icon: 'error',
                    title: 'Please Check Customer NIC Field',
                    text: 'Something went wrong!'
                })
            }else {
                if (!address){
                    Swal.fire({
                        icon: 'error',
                        title: 'Please Check Customer Address Field',
                        text: 'Something went wrong!'
                    })
                }else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Customer Update Successful',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    let index= customer_db.findIndex(customer => customer.cus_id === cus_id);
                    customer_db[index]=customer_obj;

                    $("#customerbtns>button[type='reset']").click();

                    loadStudentData();
                }
            }
        }
    }
});

$("#customerbtns>button[type='button']").eq(2).on("click", () => {
    let cus_name = $("#name").val();

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
                `${cus_name} has been deleted.`,
                'success'
            )
            let index= customer_db.findIndex(customer => customer.cus_id === cus_id);
            customer_db.splice(index,1);
            loadStudentData()
            $("button[type='reset']").click();
            generateNewCusID();
        }
    })
})


//ID Generate
const generateNewCusID = () => {
    if (customer_db.length === 0) {
        $('#cus_id').text(1);
    } else {
        let lastElement = customer_db[customer_db.length - 1];
        $('#cus_id').text((parseInt(lastElement.cus_id)) + 1);
    }
}

