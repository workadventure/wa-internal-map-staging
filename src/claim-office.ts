/// <reference types="@workadventure/iframe-api-typings/iframe_api" />

import { ActionMessage } from "@workadventure/iframe-api-typings";

console.info('Claim Office Script started successfully');

let offices = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    // Get list of all offices
    offices = WA.state.loadVariable('offices');
    // Check if the offices variable is already set
    if (offices == undefined) {
        // If not, show information in the console and quit this script
        console.info('No offices found');
        return;
    }else{
        offices = JSON.parse(offices as string);
    }

    // Subscribe to offices variable changes
    WA.state.onVariableChange('offices').subscribe((values) => {
        offices = JSON.parse(values as string);
    });

    // Check if the claimOffice variable is already set
    console.log('WA.state.loadVariable("claimOffice")', WA.state.loadVariable('claimOffice'));
    const defaultClaimOfficValue = WA.state.loadVariable('claimOffice');
    if (defaultClaimOfficValue == undefined || defaultClaimOfficValue == '') {
        // If not, initialize it with an empty array
        WA.state.saveVariable('claimOffice', new Array<unknown>());
    }

    // Detecting when the user enters an area of all offices
    for(const office in offices) {

        let triggerMessage: ActionMessage|undefined = undefined;
        WA.room.area.onEnter(`${office}`).subscribe(() => {
            const claimOfficeValue = WA.state.loadVariable('claimOffice') as Array<unknown>;

            // Check if the user has already claimed an office
            // @ts-ignore
            for(const index in claimOfficeValue){
                if(claimOfficeValue[index] === WA.player.uuid){
                    // If the cuurent office was claimed by user, create a button to unclaim the office
                    if(index === office){
                        WA.ui.actionBar.addButton({
                            id: 'unclaimOfficeButton',
                            label: 'Unclaim Office',
                            callback: () => {
                                unClaimOffice(index);
                                // When a user clicks on the action bar button 'unclaimOfficeButton', we remove it.
                                WA.ui.actionBar.removeButton('unclaimOfficeButton');
                            }
                        });
                    }
                    return;
                }
            }

            // Check if the office is already claimed by another user and display a warning message
            // @ts-ignore
            if (claimOfficeValue[office] != undefined) {
                triggerMessage = WA.ui.displayActionMessage({
                    message: 'This office is already claimed by another user',
                    type: "warning",
                    callback: () => {
                        if(triggerMessage == undefined) return;
                        // When a user clicks on the action message, we remove it.
                        triggerMessage.remove();
                    }
                });
                return;
            }

            // Create a button to claim the office if it is not claimed by another user
            WA.ui.actionBar.addButton({
                id: `claimOfficeButton_${office}`,
                label: 'Claim Office',
                callback: () => {
                    claimOffice(office);
                    // When a user clicks on the action bar button 'claimOfficeButton', we remove it.
                    WA.ui.actionBar.removeButton(`claimOfficeButton_${office}`);
                }
            });
        });

        // Detecting when the user leaves an area of all offices
        WA.room.area.onLeave(`${office}`).subscribe(() => {
            if(triggerMessage != undefined) triggerMessage.remove();
            // When the user leaves the area, we remove the action bar button
            WA.ui.actionBar.removeButton(`claimOfficeButton_${office}`);
        });
    }
});

// Function to claim an office and set claimOffice value
function claimOffice(officeId: string) {
    if(!WA.player.uuid) return;
    // Check if the office is already claimed
    const claimOffice = (WA.state.loadVariable('claimOffice') as Array<unknown>);
    // If the office is not claimed, claim it
    // @ts-ignore
    claimOffice[officeId] = WA.player.uuid;
    WA.state.saveVariable('claimOffice', claimOffice)
    .then(() => {
        console.info('claimOffice variable was saved successfully', claimOffice);
        WA.ui.modal.openModal({
            src: "https://giphy.com/embed/jJQC2puVZpTMO4vUs0",
            allow: "fullscreen",
            title: "Claim Office",
            allowApi: true,
            position: "center",
        });
    })
    .catch((error) => {
        console.error('Something went wrong while saving variable', error);
    });
}

function unClaimOffice(officeId: string){
    // Check if the office is already claimed
    const claimOffice = (WA.state.loadVariable('claimOffice') as Array<unknown>);
    // If the office is claimed by the current user, unclaim it
    // @ts-ignore
    claimOffice[officeId] = undefined;
    WA.state.saveVariable('claimOffice', claimOffice)
    .then(() => {
        console.info('claimOffice variable was saved successfully', claimOffice);
    })
    .catch((error) => {
        console.error('Something went wrong while saving variable', error);
    });
}

export {};
