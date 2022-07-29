function showTime() {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;
    
    setTimeout(showTime, 1000);   
}
showTime();

function nftData(nft) {
    fetch(`https://api.opensea.io/api/v1/collection/${nft}`)
        .then((response) => response.json())
        .then((data) => {
            let collection = data.collection
            let stats = data.collection.stats
            let image = collection.image_url
            let name = collection.name
            let floor = stats.floor_price
            let volume = stats.total_volume.toFixed(2)
            let thirtyDaySales = stats.thirty_day_sales
            $('.nft-img').html(
                `<img class="card-img-top w-50 h-50 rounded" src="${image}" alt="nft image"></img>`
            )
            $('.floor').text(`Floor Price: ${floor}`)
            $('.nft-name').text(`Collection: ${name}`)
            $('.volume').text(`Total Volume: ${volume} ETH`)
            $('.30-sales').text(`30 Day Sales: ${thirtyDaySales}`)
            console.log(`Retrieved data from https://api.opensea.io/api/v1/collection/${nft}`)
        })
}

function cryptoData(coin) {
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        .then((response) => response.json())
        .then((data) => {
            let name = data[0].name
            let image = data[0].image
            let price = `Current Price: $${data[0].current_price.toFixed(2)}`
            let priceChangePercent = `24h Percent Change: ${data[0].price_change_percentage_24h.toFixed(2)}%`
            let priceChange = `24h Price Change: $${data[0].price_change_24h.toFixed(2)}`
            $('.coin-img').html(
                `<img class="card-img-top w-50 h-50 rounded" src="${image}" alt="nft image"></img>`
            )
            $('.coin-name').text(name)
            $('.price').text(price)
            $('.changeD').text(priceChange)
            $('.changeP').text(priceChangePercent)
            console.log(`Retrieved ${coin} data from https://api.coingecko.com/api/v3/coins/markets`)
        })
}
// #TODO: FIX THIS ITTERATION

let c = [...COIN_SLUGS]
const get_Eth = setInterval(function() {
    let d = c.pop()
    cryptoData(d)
    console.log(COIN_SLUGS)
    if (c.length === 0) {
        c = [...COIN_SLUGS]
    }
}, 5000)
let a = [...NFT_SLUGS]
const get_Nft = setInterval(function() {
    let b = a.pop()
    nftData(b)
    console.log(NFT_SLUGS)
    if (a.length === 0) {
        a = [...NFT_SLUGS]
    }
}, 5000)

$(document).ready(function(){
    cryptoData(COIN_SLUGS[0])
    nftData(NFT_SLUGS[0])
    $('.github-graph').replaceWith(`<img src="https://ghchart.rshah.org/${GITHUB_USERNAME}" alt="2022 ${GITHUB_USERNAME} Github chart" class="github-graph">`)
})



