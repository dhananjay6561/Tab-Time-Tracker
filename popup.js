function updateTime() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const tabId = tabs[0].id;

        chrome.storage.local.get(['tabTimes'], data => {
            let timeSpent = data.tabTimes && data.tabTimes[tabId] ? data.tabTimes[tabId] : 0;
            
            chrome.runtime.sendMessage({action: "getActiveTime", tabId: tabId}, response => {
                if (response && response.activeTime) {
                    timeSpent += response.activeTime;
                }
                
                const timeInSeconds = Math.floor(timeSpent / 1000);
                const hours = Math.floor(timeInSeconds / 3600);
                const minutes = Math.floor((timeInSeconds % 3600) / 60);
                const seconds = timeInSeconds % 60;
                
                let timeString = '';
                if (hours > 0) timeString += `${hours} hours, `;
                if (minutes > 0 || hours > 0) timeString += `${minutes} minutes, `;
                timeString += `${seconds} seconds`;
                
                document.getElementById('time').textContent = timeString;
            });
        });
    });
}

updateTime();
setInterval(updateTime, 1000);