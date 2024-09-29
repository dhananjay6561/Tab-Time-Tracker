function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    
    let timeString = '';
    if (hours > 0) timeString += `${hours} hours, `;
    if (minutes > 0 || hours > 0) timeString += `${minutes} minutes, `;
    timeString += `${seconds} seconds`;
    
    return timeString;
}

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
                document.getElementById('time').textContent = formatTime(timeInSeconds);

                // Update comparison table
                updateComparisonTable();
            });
        });
    });
}

function updateComparisonTable() {
    chrome.storage.local.get(['tabTimes'], data => {
        const tabTimes = data.tabTimes || {};
        
        chrome.tabs.query({}, tabs => {
            const tableBody = document.querySelector('#comparisonTable tbody');
            tableBody.innerHTML = ''; // Clear existing rows
            
            tabs.sort((a, b) => (tabTimes[b.id] || 0) - (tabTimes[a.id] || 0)); // Sort by time spent

            tabs.forEach(tab => {
                let timeSpent = tabTimes[tab.id] || 0;
                const timeInSeconds = Math.floor(timeSpent / 1000);
                
                if (timeInSeconds > 0) {  // Only include tabs with non-zero time
                    const row = tableBody.insertRow();
                    const cellTitle = row.insertCell(0);
                    const cellTime = row.insertCell(1);
                    
                    cellTitle.textContent = tab.title.substring(0, 30) + (tab.title.length > 30 ? '...' : '');
                    cellTime.textContent = formatTime(timeInSeconds);
                }
            });
        });
    });
}

updateTime();
setInterval(updateTime, 1000);