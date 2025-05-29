document.addEventListener("DOMContentLoaded",function(){
    const searchBtn = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.querySelector("#easy-label");
    const mediumLabel = document.querySelector("#medium-label");
    const hardLabel = document.querySelector("#hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");
    const heading = document.getElementById("heading");
    const enterUsername = document.getElementById("enter-username");

    function validateUsername(username){
        if(username.trim() === ""){
            alert("Username should not be empty.")
            return false; 
        }
        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
        const isMatching = usernameRegex.test(username);
        if(!isMatching){
            alert("Invalid Username.");
        }
        return isMatching;
    }
    function updateHeading(username){
        heading.textContent = `${username}`;
    }
    function updateRank(parsedData){
        enterUsername.textContent = `LeetCode Rank : ${parsedData.ranking}`;
    }
    async function fetchUserDetails(username){
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try{
            searchBtn.textContent = "Searching..."
            searchBtn.disabled = true;
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch the User Details.");
            }
            const parsedData = await response.json();
            console.log("Logging data : ",parsedData);
            updateHeading(username);
            updateRank(parsedData);
            displayUserData(parsedData);
        }
        catch(error){
            statsContainer.innerHTML = `<p>No data Found.</p>`
        }
        finally{
            searchBtn.textContent = "Search"
            searchBtn.disabled = false;
        }

    } 


    function updateProgress(solved, total, label, circle){
        const progressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree",`${progressDegree}%`);
        label.textContent = `${solved}/${total}`
    }
    function displayUserData(parsedData){
        const totalQues = parsedData.totalQuestions;
        const totalEasyQues = parsedData.totalEasy;
        const totalMediumQues = parsedData.totalMedium;
        const totalHardQues = parsedData.totalHard;

        const solvedTotalQuestions = parsedData.totalSolved;
        const solvedTotalEasyQues = parsedData.easySolved;
        const solvedTotalMediumQues = parsedData.mediumSolved;
        const solvedTotalHardQues = parsedData.hardSolved;

        
        updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle);

    }
    searchBtn.addEventListener('click', function(){
        const username = usernameInput.value;
        console.log("User name is : ",username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })
})