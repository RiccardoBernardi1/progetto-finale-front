import { reactive } from "vue";

export const store = reactive({
    typologies: [],
    companies: [],
    shoppingCart: [],
    totalPrice: 0,
    email: "",
    name: "",
    id:"",
    telephone:"",
    address:"",
    companyurl:"http://127.0.0.1:8000/admin/companies/",
    orderNumber:0,
    orderCart:[]
})