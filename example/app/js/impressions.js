//Initializing Smart Script arguments
let oneLinkImpressionURL = "https://impressions.onelink.me/LtRd/";
let mediaSource = {keys: [], defaultValue: "samsung-2-mobile"};
let campaign = {keys: [], defaultValue: "my_campaign"};

//Onelink URL is generated
let impressionURL = window.AF_SMART_SCRIPT.generateOneLinkURL({
    oneLinkURL: oneLinkImpressionURL,
    afParameters:{
        mediaSource: mediaSource,
        campaign: campaign
    }
})

//    fetch(impressionURL.clickURL)
//        .then(response => {
//           if (!response.ok) {
//       			throw new Error('Network response was not OK');
//     		  }
//        });

window.onload = () => {
    oneLinkClickURL = "https://onelink-sim.onelink.me/coiD/simbananas";

    window.AF_SMART_SCRIPT.generateOneLinkURL({
        oneLinkURL: oneLinkClickURL,
        afParameters:{
            mediaSource: mediaSource,
            campaign: campaign
        }
    })
    window.AF_SMART_SCRIPT.displayQrCode("QR-container");
}    