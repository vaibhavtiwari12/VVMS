import { LOCALES } from "../locales";
const en = {
  [LOCALES.ENGLISH]: {
    /*common*/
    name: "Name",
    fatherName: "Father Name",
    phone: "Phone Number",
    address: "Address",
    currency: "₹",

    /*login Page */
    login: "LOGIN",
    username: "User Name",
    password: "Password",
    signin: "Sign In",
    usernameError: "UserName is required",
    passwordError: "Password is required",

    /*Header*/
    hello: "hello",
    purchaser: "Purchaser",
    kisan: "Kisan",
    report: "Report",
    logout: "Logout",
    inventory: "Inventory",

    /*Home Page*/
    welcomeMsg: "Welcome to the Digital Platform of",
    brandName: "Maharaj Vegetable Company",

    /*Kisan Landing Page*/
    kisanLandingTitle: "Kisan Landing Page",
    addKisanButtonText: "New Kisan",
    searchBy: "Search by",
    searchValue: "Search Value",
    searchButtonText: "Search",
    resetButtonText: "Reset",

    /*Add Kisan Page*/
    newKisanDeatils: "Details of new kisan",
    nameIsRequired: "Name is required.",
    fatherNameIsRequired: "Father's name is required.",
    phoneIsRequired: "Phone number is required.",
    addressIsRequired: "Phone number is required.",
    addNewKisanButtonText: "Add New kisan",

    /*Kisan Detail Page*/
    kisanDetailsTitle: "Kisan Details",
    carryForwardAmount: "Carry forward payments up to last Bill (₹)",
    debitEntryKisanButtonText: "Debit/Advance Entry",
    creditEntryKisanButtonText: "Credit/Bill Entry",
    advanceSettlementKisanButtonText: "Advance Settlement Entry",
    transactionDetailsTitle: "Transaction Details",

    /*Table columns Kisan Detail Page*/
    balance: "Outstanding Advance  (₹)",
    date: "Date",
    comment: "Comment",
    advanceDebited: "Advance Taken (₹)",
    billTotal: "Bill Total (₹)",
    advanceCredited: "Advance Settled (₹)",
    cashPaid: "Cash Paid (₹)",
    carryForward: "Carry Forward From Bill (₹)",
    actions: "Actions",
    editButtonText: "Edit",
    printButtonText: "Print",
    viewButtonText: "View",

    /*Debit Entry Form*/
    advanceDetails: "Debit/Advance Details",
    amount: "Advance Amount",
    createCreditEntryButtonText: "Create Advance Entry",
    amountSBGTZ: "Amount should be greater than 0.",

    /*Credit Entry Form*/
    billDetails: "Credit/Bill Details",
    purchaseSectionTitle: "Purchase",
    numberOfBags: "Number Of Bags :",
    totalWeight: "Total Weight (In KGs) :",
    ratePerKg: "Rate per KG (₹) :",
    grossTotal: "Gross Total of Purchase : ₹ ",
    deductionsSectionTitle: "Deductions",
    commission: "Commission (In %) :",
    totalCommission: "Total Commission :",
    hammali: "Hammali (₹) :",
    bhada: "Bhada (₹):",
    netTotal: "Bill Total (After Deductions) : ₹ ",
    amountToSettle: "Amount to Settle : ",
    settlementSectionTitle: "Settlement",
    balanceTextWithoutCurrency: "Outstanding Advance",
    carryForwardAmountWithoutCurrency: "Carry forward payments up to last Bill",
    Matar: "Matar",
    Tamatar: "Tamatar",
    Dhaniya: "Dhaniya",

    /*Credit Entry Form Errors*/
    numberOfBagsCNBLTZ: "Number of Bags cannot be less than 0.",
    totalWeightCNBLTZ: "Total Weight cannot be less than 0.",
    ratePerKgCNBLTZ: "Rate cannot be less than 0.",
    totalCommissionCNBLTZ: "Commission cannot be less than 0.",
    hammaliCNBLTZ: "Hammali cannot be less than 0.",
    bhadaCNBLTZ: "Bhada cannot be less than 0.",
    balanceCNBLTZ: "Advance Settled cannot be less than 0.",
    cashPaidCNBLTZ: "Cash Paid cannot be less than 0.",
    balanceCBMTCB:
      'Advance settled cannot be more than the "Amount to Settle". Max allowed amount =  ₹ ',
    balanceCBMTOA:
      'Advance settled cannot be more than "Outstanding Advance". Max allowed amount =  ₹ ',
    cashPaidCBMTCB:
      'Cash paid cannot be greater than the "Amount to Settle". Max allowed amount =  ₹  ',
    commentIsRequired: "Comment is required.",

    /* Inventory Langing */
    inventoryLandingTitle: "Inventory",
    addfasalType: "Add Item",

    /* Inventory Add Item Type */
    inventoryAddHeading: "Add New Item Type",
    inventory_itemName: "Item Name",
    inventory_itemError: "Item name is required",
    inventory_addButtonText: "Add Item Type",
    inventory_addSuccessful: "Item Added Successfully",
  },
};
export default en;
