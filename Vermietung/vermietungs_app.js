
const MONATE = ["", "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

new Vue({

    el: "#app",

    data: {
        pudilMonat: "Januar",
        pudilKosten: 0,
        pudilInTime: false,
        philMonat: "Januar",
        philKosten: 0,
        philInTime: true,
        maxMonat: "Januar",
        maxKosten: 0,
        maxInTime: false,
        maurMonat: "Januar",
        maurKosten: 0,
        maurInTime: false,

        paypalMe: "http://www.paypal.me/lukassturm"
    },

    mounted() {
        axios.get('/data.php').then(res => {
            console.log(res.data);

            let d = new Date();
            let m = d.getMonth();

            this.pudilMonat = MONATE[res.data.pudil];
            if (res.data.pudil >= m) this.pudilInTime = true;
            this.philMonat = MONATE[res.data.philipp];
            if (res.data.philipp >= m) this.philInTime = true;
            this.maxMonat = MONATE[res.data.max];
            if (res.data.max >= m) this.maxInTime = true;
            this.maurMonat = MONATE[res.data.maurice]; 
            if (res.data.maurice >= m) this.maurInTime = true;
        });
    }

});