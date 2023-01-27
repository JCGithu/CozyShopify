// const socket = io("ws://localhost:3000");
//const socket = io("https://shopifyreciever.up.railway.app/");
let popupTime = 10;
let colours = ['#f9e9e7', '#a5c1da', '#ECB177', '#6F9847', '#57898A'];

function getRandom(num){
  return Math.floor(Math.random() * num);
}

function showPopUp(pop){
  let div = document.createElement('div');
  let img = document.createElement('img');
  let h1 = document.createElement('h1');
  img.src = `./img/${pop.img}`;
  h1.innerHTML = `<span>${pop.title}</span> sold!`;
  div.appendChild(img);
  div.appendChild(h1);
  div.style.setProperty('--bg', colours[getRandom(colours.length)]);
  document.body.appendChild(div);

  setTimeout(()=>{
    if (!document.body.contains(div)) return;
    div.animate([{opacity:1, transform:'scale(1)'},{opacity:0, transform:'scale(0.9)'}], {duration:1000, easing:'cubic-bezier(.77,.27,.55,1)', fill:'forwards'})
  }, (popupTime - 3) * 1000);

  setTimeout(()=>{
    if (!document.body.contains(div)) return;
    document.body.removeChild(div);
  }, (popupTime - 1) * 1000);
}


class Queue {
  constructor(){
    this.list = [];
    this.running = false;
  }
  push(item){
    this.list.push(item);
  }
  ditch(){
    return this.list.shift();
  }
  check(){
    return this.list[0];
  }
  run(){
    this.running = true;
    showPopUp(this.list[0]);
    this.ditch();
    setTimeout(()=>{
      console.log('times up');
      if (this.check){
        this.run();
      } else {
        this.running=false;
      } 
    }, popupTime * 1000 )
  }
  add(pop){
    this.push(pop);
    if (!this.running) this.run();
  }
}

const popUpQueue = new Queue();
const images = {
  'cozy af. Embroidered Beanie': 'cozyafbeanie.png',
  'cozy af. Crop Tee': 'cozyafcrop.png',
  'cozy af. Embroidered Hoodie': 'cozyafhoodie.png',
  'cozy af. Embroidered Sweatshirt': 'cozyafsweatshirt.png',
  'Cozy AF Enamel Mug': 'cozyafmug.png',
  'cozy af. Denim T-Shirt': 'cozyafshirt.png',
  'F Your Job Enamel Mug': 'fjobmug.png',
  'F Your Job Vintage Dad Hat': 'fjobhat.png',
  'F Your Job Crop Tee': 'fjobcrop.png',
  'F Your Job Crop Hoodie': 'fjobhoodie.png',
  'F Your Job Denim T-Shirt': 'fjobshirt2.png',
  'F Your Job Organic ribbed beanie': 'fjobbeanie.png',
  'Girlboss, Gaslight, Gatekeep Enamel Mug': 'ghostmug.png',
  'Big Deal Enamel Mug': 'bigdealmug.png',
  'Bit of a Gamer Enamel Mug': 'gamermug.png',
  'Go to Therapy Enamel Mug': 'therapymug.png',
  'Go to Therapy Vintage Dad Hat': 'therapyhat.png',
  'Go To Therapy Denim T-Shirt': 'therapyshirt.png',
  'Go to Therapy Crop Hoodie': 'therapyhoodie.png',
  'Go to Therapy Ribbed knit beanie': 'therapybeanie.png',
  'Cuter on Camera Embroidered T-Shirt': 'cutershirt.png',
  'Bit of a Gamer Embroidered T-Shirt': 'gamershirt.png',
  'Bit of a Gamer Crop Hoodie': 'gamerhoodie.png',
  'Like and Subscribe Unisex sueded fleece hoodie': 'subscribehoodie.png',
  'Cuter on Camera Crop Sweatshirt': 'cuterhoodie.png',
  'Big Deal on the Internet Unisex Sweatshirt': 'bigdealsweatshirt.png',
  'Bit of a Gamer Crop Tee': 'gamercrop.png',
  'Like & Subscribe Crop Tee': 'subscribecrop.png',
  'Big Deal Crop Tee': 'bigdealcrop.png',
  'Cuter on Camera Crop Tee': 'cutercrop.png',
  'Cuter On Camera Bucket hat': 'cuterbucket.png',
  "I'm a Big Deal Embroidered T-Shirt": 'bigdealshirt.png',
  'Big Deal Pastel baseball hat': 'bigdealhat.png',
  'Gamer Ribbed knit beanie': 'gamerbeanie.png',
  'Girlboss Gaslight Gatekeep Eco Tote Bag': 'girlbosstote.png',
  "Pls Don't Perceive Eco Tote Bag": 'presettote.png',
  'Pls Like & Subscribe Embroidered T-Shirt':'subscribeshirt.png'
}

for (let i = 0; i < 10; i++){
  let imgLength = Object.keys(images)
  let target = getRandom(imgLength.length);  
  popUpQueue.add({title:imgLength[target], img: images[imgLength[target]]});
}

// receive a message from the server
// socket.on("message", msg => {
//   console.log(msg);
// });

// socket.on("LoginRequest", msg => {
//   console.log('Login requested');
//   socket.emit("set-store", 'cozyaf');
// });

// // recieve a sale
// socket.on("sale", item => {
//   console.log(item);
//   if (images.hasOwnProperty(item.title)) {
//     popUpQueue.push({title: item.title, img: images[item.title]})
//   }
// });