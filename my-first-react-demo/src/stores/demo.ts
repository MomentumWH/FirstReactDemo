import { create } from 'zustand'

type companyState={
    isCompany:boolean
    companyName:string
    companyAddress:string
    updateCompany:()=>void
    createCompany:()=>void
}

const useCompanyStore = create<companyState>()((set)=>({
    isCompany:false,
    companyName:"",
    companyAddress:"",
    updateCompany:()=>
        set({(state)=>{
            companyName:state.companyName,
            companyAddress:state.companyAddress
        }})

}))

const useAccountStore=create((set)=>({
    account:0,
    plusAccount:()=>
        set((state)=>({
            account:state.account+1
        })),
    removeAllAccount:()=>set({account:0})

}))