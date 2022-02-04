import { LOCALES } from "../locales";
const hi = {
  [LOCALES.HINDI]: {
    /*common*/
    name: "नाम",
    fatherName: "पिता का नाम",
    phone: "फ़ोन नंबर",
    address: "पता",
    currency: "₹",

    /*login Page */
    login: "लॉगइन",
    username: "यूज़र का नाम",
    password: "पासवर्ड",
    signin: "साइन इन",
    usernameError: "यूज़र का नाम देना अनिवार्य है।",
    passwordError: "पासवर्ड देना अनिवार्य है।",

    /*Header*/
    hello: "नमस्ते",
    purchaser: "ख़रीदार",
    kisan: "किसान",
    report: "रिपोर्ट",
    logout: "लॉगआउट",
    inventory: "Inventory",

    /*Home Page*/
    welcomeMsg: "महाराज वेजिटेबल कंपनी के",
    brandName: "डिज़िटल प्लेटफॉर्म में आपका स्वागत है।",

    /*Kisan Landing Page*/
    kisanLandingTitle: "किसान विवरणिका ",
    addKisanButtonText: "नया किसान",
    searchBy: "खोजें (द्वारा)",
    searchValue: "खोज का विवरण",
    searchButtonText: "खोजें",
    resetButtonText: "मिटायें",

    /*Add Kisan Page*/
    newKisanDeatils: "नये किसान का विवरण",
    nameIsRequired: "नाम देना अनिवार्य है।",
    fatherNameIsRequired: "पिता का नाम देना अनिवार्य है।",
    phoneIsRequired: "फ़ोन नंबर देना अनिवार्य है।",
    addressIsRequired: "पता देना अनिवार्य है।",
    addNewKisanButtonText: "नया किसान जोड़ें",

    /*Kisan Detail Page*/
    kisanDetailsTitle: "किसान का विवरण",
    carryForwardAmount: "पिछले बिल तक का बक़ाया भुगतान (₹)",
    debitEntryKisanButtonText: "एडवांस की एंट्री",
    creditEntryKisanButtonText: "बिल की एंट्री",
    advanceSettlementKisanButtonText: "एडवांस समायोजन की एंट्री",
    transactionDetailsTitle: "लेन-देन का विवरण",

    /*Table columns Kisan Detail Page*/
    balance: "कुल बक़ाया एडवांस (₹)",
    date: "दिनांक",
    comment: "एंट्री का विवरण",
    advanceDebited: "एडवांस लिया (₹)",
    billTotal: "बिल टोटल (₹)",
    advanceCredited: "एडवांस चुकाया (₹)",
    cashPaid: "नगद भुगतान किया (₹)",
    carryForward: "बिल का बक़ाया भुगतान (₹)",
    actions: "कार्यवाही",
    editButtonText: "सुधारें",
    printButtonText: "प्रिंट",
    viewButtonText: "देखें",

    /*Debit Entry Form*/
    advanceDetails: "एडवांस का विवरण",
    amount: "एडवांस की राशि",
    createCreditEntryButtonText: "एडवांस की एंट्री करें",
    amountSBGTZ: "एडवांस की राशि 0 से अधिक होनी चाहिये। ",

    /*Credit Entry Form*/
    billDetails: "बिल का विवरण",
    purchaseSectionTitle: "खरीददारी का विवरण",
    numberOfBags: "बोरों की संख्या (नग) :",
    totalWeight: "कुल वजन (कि.ग्रा.में) :",
    ratePerKg: "प्रति किलोग्राम भाव (₹) :",
    grossTotal: "कुल खरीददारी : ₹ ",
    deductionsSectionTitle: "कटौती",
    commission: "कमीशन (% में) :",
    totalCommission: "कुल कमीशन : ",
    hammali: "हम्माली (₹) :",
    bhada: "भाड़ा (₹) :",
    netTotal: "बिल टोटल (कटौती के बाद) : ₹ ",
    amountToSettle: "समायोजित की जाने वाली राशि : ",
    settlementSectionTitle: "समायोजन",
    balanceTextWithoutCurrency: "कुल बक़ाया एडवांस",
    carryForwardAmountWithoutCurrency: "पिछले बिल तक का बक़ाया भुगतान",
    Matar: "मटर",
    Tamatar: "टमाटर",
    Dhaniya: "धनिया",

    /*Credit Entry Form Errors*/
    numberOfBagsCNBLTZ: "बोरों की संख्या (नग) 0 से काम नहीं हो सकती है। ",
    totalWeightCNBLTZ: "वजन 0 से काम नहीं हो सकता है। ",
    ratePerKgCNBLTZ: "प्रति किलोग्राम भाव 0 से काम नहीं हो सकता है। ",
    totalCommissionCNBLTZ: "कमीशन 0 से काम नहीं हो सकती है। ",
    hammaliCNBLTZ: "हम्माली 0 से काम नहीं हो सकती है। ",
    bhadaCNBLTZ: "भाड़ा 0 से काम नहीं हो सकता है। ",
    balanceCNBLTZ: "एडवांस चुकाने की राशि  0 से काम नहीं हो सकती है।",
    cashPaidCNBLTZ: "नगद भुगतान की राशि  0 से काम नहीं हो सकती है।",
    balanceCBMTCB:
      'एडवांस चुकाने की राशि, "समायोजित की जाने वाली राशि" से अधिक नहीं हो सकती है। अधिकतम मान्य राशि = ₹ ',
    balanceCBMTOA:
      'एडवांस चुकाने की राशि, "कुल बक़ाया एडवांस" से अधिक नहीं हो सकती है। अधिकतम मान्य राशि = ₹',
    cashPaidCBMTCB:
      'नगद भुगतान की राशि "समायोजित की जाने वाली राशि" से अधिक नहीं हो सकती है। अधिकतम मान्य राशि = ₹ ',
    commentIsRequired: "एंट्री का विवरण देना अनिवार्य है। ",

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
export default hi;
