let API_key = "AIzaSyA4_tJOnF1GSsymcU-fk273Mo4LjsVYGmU";
let url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=tesla&type=video&key=[YOUR_API_KEY] "

const result_div = document.querySelector(".video-container");

async function searchVideo(){
    try{
        let video_query = document.querySelector(".search-bar").value;
        let response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&q=${video_query}&type=video&key=${API_key}&maxResults=20`);
        let data = await response.json();
        console.log("data:" , data);
        
        let videos = data.items;
        localStorage.setItem("localdata" , JSON.stringify(videos));
        appendVideos(videos);
    }
    catch(err)
    {
        console.log("err:",err);
    }
}
var statik  = JSON.parse(localStorage.getItem("localdata")) || [];

const appendVideos = (items) =>{
    items.forEach((elem)=>{

        let {
            id:{videoId},
        } = elem;
      
        result_div.innerHTML += `
        <div class="video" onclick = "location.href='https://youtube.com/watch?v=${videoId}'">
        <img src="${elem.snippet.thumbnails.high.url}" class="thumbnail">
        <div class="content">
            <img src="${elem.snippet.thumbnails.high.url}" class="channel-icon">
            <div class="info">
                <h4 class="title">${elem.snippet.title}</h4>
                <p class="channel-name">${elem.snippet.channelTitle}</p>

            </div>
        </div>
    </div>`;

       
    });
};
appendVideos(statik);