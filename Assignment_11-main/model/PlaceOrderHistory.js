export class PlaceOrderHistory {
    constructor(date,order_id,customer_id,net_total) {
        this.date=date
        this.order_id=order_id
        this.customer_id=customer_id
        this.net_total=net_total
    }
}