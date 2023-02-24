import params from "./params"
export default {
        state:{
                productParams:JSON.parse(JSON.stringify(params))
        },
        actions:{
                
        },
        mutations:{
                editProduct(state,data){
                        state.productParams = data
                },
                reset(state){
                        state.productParams = JSON.parse(JSON.stringify(params))   
                }
        },
        getters:{

        }
}