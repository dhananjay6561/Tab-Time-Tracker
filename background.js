let activeTabId = null;
let activeStartTime = 0;
let tabTimes = {};

function updateTabTime(tabId, endTime) {
    if (activeTabId === null || activeStartTime === 0) return;

    const elapsed = endTime - activeStartTime;

    console.log("Updating tab time. Tab ID:", tabId, "Elapsed Time:", elapsed);

    if (!tabTimes[tabId]) {
        tabTimes[tabId] = 0;
    }
    tabTimes[tabId] += elapsed;

    chrome.storage.local.set({ tabTimes }, () => {
        console.log("Tab times saved to storage:", tabTimes);
    });

    // Reset the start time for continuous tracking
    activeStartTime = endTime;
}

chrome.tabs.onActivated.addListener(activeInfo => {
    const currentTime = Date.now();

    updateTabTime(activeTabId, currentTime);

    activeTabId = activeInfo.tabId;
    activeStartTime = currentTime;

    console.log("Tab Activated. New Tab ID:", activeTabId, "Start Time:", activeStartTime);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tabId === activeTabId && changeInfo.status === 'complete') {
        const currentTime = Date.now();
        updateTabTime(activeTabId, currentTime);
        activeStartTime = currentTime;
        console.log("Tab Updated. Tab ID:", tabId, "Start Time reset to:", activeStartTime);
    }
});

chrome.windows.onFocusChanged.addListener(windowId => {
    const currentTime = Date.now();

    if (activeTabId !== null && windowId === chrome.windows.WINDOW_ID_NONE) {
        updateTabTime(activeTabId, currentTime);
        console.log("Window lost focus. Tab ID:", activeTabId, "Time updated.");
        activeTabId = null;
        activeStartTime = 0;
    } else if (windowId !== chrome.windows.WINDOW_ID_NONE) {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            if (tabs.length > 0) {
                updateTabTime(activeTabId, currentTime);
                activeTabId = tabs[0].id;
                activeStartTime = currentTime;
                console.log("Window regained focus. Active Tab ID:", activeTabId, "Start Time:", activeStartTime);
            }
        });
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getActiveTime" && request.tabId === activeTabId) {
        const currentTime = Date.now();
        const activeTime = currentTime - activeStartTime;
        sendResponse({activeTime: activeTime});
    }
    return true;
});

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed or updated");
    chrome.storage.local.set({ tabTimes: {} }, () => {
        console.log("Initial storage set");
    });
    chrome.action.setBadgeText({text: 'ON'});
});

chrome.storage.local.get(['tabTimes'], (result) => {
    if (result.tabTimes) {
        tabTimes = result.tabTimes;
        console.log("Loaded saved tab times:", tabTimes);
    }
});