/// <reference types="@workadventure/iframe-api-typings/iframe_api" />

//@ts-ignore
console.info('Pricing Script started successfully');

interface RoomMetaData{
    room?: {
        isPremium?: Boolean
    }
}

WA.onInit().then(() => {
    const metadata = WA.metadata as RoomMetaData;
    addBannerPricing(metadata);
});

const addBannerPricing = (metadata: RoomMetaData) => {
    if(metadata.room?.isPremium) return;
    //@ts-ignore
    WA.ui.banner.openBanner({
        id: 'freemium-banner',
        text: 'Change your subscription to enjoy premium access full-time!',
        bgColor: '#272736',
        textColor: '#ffffff',
        closable: true,
        link: {
            url: "https://workadventu.re/pricing",
            label: "Unlock premium"
        }
    });
}


export {};
