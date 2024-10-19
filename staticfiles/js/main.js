class Pixel {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;

        this.height = 300;
        this.width = 300;

        this.data = new Uint8ClampedArray(this.width * this.height * 4);

        this.ws = new WebsocketHandler();

        // this.data[0] = 255;
        // this.data[1] = 166;
        // this.data[2] = 82;
        // this.data[3] = 255;
        //
        // this.data[4] = 242;
        // this.data[5] = 189;
        // this.data[6] = 82;
        // this.data[7] = 255;
        //
        // this.data[8] = 125;
        // this.data[9] = 205;
        // this.data[10] = 182;
        // this.data[11] = 255;
        //
        // this.data[12] = 255;
        // this.data[13] = 255;
        // this.data[14] = 255;
        // this.data[15] = 255;

        this.updateData();
        this.renderByteData();
    }

    updateData()
    {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/static/img/image3.png");
        xhr.responseType = "blob";
        xhr.onload = function (event) {
            console.log('load');
        };

        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.response);

                const c = document.createElement('canvas');
                const cx = c.getContext('2d');
                let img = new Image;

                img.onload = (e) => {
                    cx.drawImage(img, 0, 0);

                    this.data = cx.getImageData(0, 0, 300, 300).data;
                    console.log(this.data, this.width, this.height);
                    // this.data = new Uint8ClampedArray(xhr.response);
                    this.renderByteData();
                };
                img.src = URL.createObjectURL(xhr.response);



            } else if (xhr.readyState === 4) {
                console.log("could not fetch the data");
            }
        });

        xhr.send();
    }

    renderByteData()
    {
        let imageData = new ImageData(this.data, this.width, this.height);
        this.ctx.putImageData(imageData, 0, 0);
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    const pixel = new Pixel();
});
