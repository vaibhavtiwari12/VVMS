import { LOCALES } from "../locales";
const hi = {
  [LOCALES.HINDI]: {
    /*common*/
    name: "नाम",
    fatherName: "पिता का नाम",
    phone: "फ़ोन नंबर",
    address: "पता",

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
    carryForwardAmount: "पिछले बिल तक का बक़ाया भुगतान",
    debitEntryKisanButtonText: "एडवांस की एंट्री",
    creditEntryKisanButtonText: "बिल की एंट्री",
    transactionDetailsTitle: "लेन-देन का विवरण",

    /*Table columns Kisan Detail Page*/
    balance: "कुल बक़ाया एडवांस(₹)",
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

    /*Credit Entry Form*/
    billDetails: "बिल का विवरण",
    purchaseSectionTitle: "खरीददारी का विवरण",
    numberOfBags: "बोरों की संख्या :",
    totalWeight: "कुल वजन (कि.ग्रा.में) :",
    ratePerKg: "प्रति किलोग्राम भाव (₹) :",
    grossTotal: "बिल की कुल राशि:",
    deductionsSectionTitle: "कटौती",
    commission: "कमीशन (% में) :",
    totalCommission: "कुल कमीशन:",
    hammali: "हम्माली (₹) :",
    bhada: "भाड़ा (₹) :",
    netTotal: "कटौती के बाद बिल की कुल राशि :",
    settlementSectionTitle: "समायोजन",

  },
};
export default hi;
