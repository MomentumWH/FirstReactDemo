import { create } from 'zustand'

type CompanyPayload = {
  companyName: string
  companyAddress: string
}

type CompanyState = {
  isCompany: boolean
  companyName: string
  companyAddress: string
  updateCompany: (payload: Partial<CompanyPayload>) => void
  createCompany: (payload: CompanyPayload) => void
  clearCompany: () => void
}

type AccountState = {
  account: number
  plusAccount: () => void
  removeAllAccount: () => void
}

export const useCompanyStore = create<CompanyState>()((set) => ({
  isCompany: false,
  companyName: '',
  companyAddress: '',
  updateCompany: (payload) =>
    set((state) => ({
      ...state,
      ...payload,
    })),
  createCompany: (payload) =>
    set({
      isCompany: true,
      companyName: payload.companyName,
      companyAddress: payload.companyAddress,
    }),
  clearCompany: () =>
    set({
      isCompany: false,
      companyName: '',
      companyAddress: '',
    }),
}))

export const useAccountStore = create<AccountState>()((set) => ({
  account: 0,
  plusAccount: () =>
    set((state) => ({
      account: state.account + 1,
    })),
  removeAllAccount: () =>
    set({
      account: 0,
    }),
}))
