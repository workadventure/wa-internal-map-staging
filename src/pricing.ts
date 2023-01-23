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

    addPricingButton(metadata);

    if(metadata.room?.isPremium || WA.player.state.hasVisitPricing || (!WA.player.tags.includes('admin') && !WA.player.tags.includes('editor'))) return;
    openPricingModal();
});

const openPricingModal = () => {
    console.info('Opening price modal for world freemium for admin or editor user');
    WA.player.state.hasVisitPricing = true;
    WA.ui.modal.openModal({
        src: "https://develop.test.workadventu.re/funnel/pricing",
        allow: "fullscreen",
        title: "Pricing",
        allowApi: true,
        position: "center",
    });
}

const addPricingButton = (metadata: RoomMetaData) => {
    if(metadata.room?.isPremium) return;
    WA.ui.actionBar.addButton({
        id: 'pricing-btn',
        label: 'Pricing',
        callback: () => {
            console.info('Button pricing triggered');
            openPricingModal();
        }
    });
}


export {};