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
    addPricingButton(metadata);

    if(metadata.room?.isPremium || WA.player.state.hasVisitPricing || (!WA.player.tags.includes('admin') && !WA.player.tags.includes('editor'))) return;
    openPricingModal();
});

const openPricingModal = () => {
    console.info('Opening price modal for world freemium for admin or editor user');
    WA.player.state.hasVisitPricing = true;
    WA.ui.modal.openModal({
        src: "https://admin.workadventu.re/funnel/pricing",
        allow: "fullscreen",
        title: "Pricing",
        allowApi: true,
        position: "center",
    });
}

const addPricingButton = (metadata: RoomMetaData) => {
    if(metadata.room?.isPremium || (!WA.player.tags.includes('admin') && !WA.player.tags.includes('editor'))) return;
    WA.ui.actionBar.addButton({
        id: 'pricing-btn',
        label: 'Pricing',
        callback: () => {
            console.info('Button pricing triggered');
            openPricingModal();
        }
    });
}

const addBannerPricing = (metadata: RoomMetaData) => {
    if(metadata.room?.isPremium || (!WA.player.tags.includes('admin') && !WA.player.tags.includes('editor'))) return;
    //@ts-ignore
    WA.ui.banner.openBanner({
        id: 'freemium-banner',
        text: 'Upgrade to premium and get access to a whole new world of fun! 🚀',
        bgColor: '#272736',
        textColor: '#ffffff',
        closable: false,
        timeToClose: 0,
        link: {
            url: "https://workadventu.re/pricing",
            label: "Go Premium Today!"
        }
    });
}

export {};
