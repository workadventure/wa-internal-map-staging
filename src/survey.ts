/// <reference types="@workadventure/iframe-api-typings/iframe_api" />

console.info('Survey feedback Script started successfully');

interface RoomMetaData{
    room?: {
        isPremium?: Boolean
    }
}

WA.onInit().then(() => {
    // Add new button to let a feedback
    if(WA.player.state.hasFeedback)return;
    addFeebackButton();

    // Load hasFeedback variable for user and remove button when it's finish
    WA.player.state.onVariableChange('hasFeedback').subscribe((value) => {
        if(value === true){
            WA.ui.actionBar.removeButton('feedback-btn');
            //feedbackModalIsOpen = false;
        }
    });
});

const openSurveyFeedback = (TIME_TO_OPEN_FUNNEL = 2000) => {
    setTimeout(() => {
        WA.ui.modal.closeModal();
        WA.ui.modal.openModal({
            src: "https://docs.google.com/forms/d/e/1FAIpQLSd86mmBxrzbIfSoTBeGGTVEr3fNTGJkPExtaUzmNJFRnK9lRA/viewform?usp=sf_link",
            allow: "fullscreen",
            title: "Subscription",
            allowApi: true,
            position: "center",
        });
    }, TIME_TO_OPEN_FUNNEL);
}

const addFeebackButton = () => {
    const metadata = WA.metadata as RoomMetaData;
    if(WA.player.state.hasFeedback || (metadata.room?.isPremium && metadata.room.isPremium === true)) return;
    WA.ui.actionBar.addButton({
        id: 'feedback-btn',
        // @ts-ignore
        type: 'action',
        imageSrc: 'https://backup-workadventure-db-prod.s3.eu-west-1.amazonaws.com/logo/workadventure-rate-white.svg',
        toolTip: 'Let your feedback',
        callback: (event) => {
            console.log('Button feedback triggered', event);
            openSurveyFeedback(0);
        }
    });
}

export {};
