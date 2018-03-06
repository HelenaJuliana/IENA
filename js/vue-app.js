$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = (function (el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);

            if (typeof callback === 'function') callback();
        });

        return this;
    },
});

/**
 *
 * ---------------------------------
 *    vue
 * ------------------------------------------
 * **/

let app = new Vue({
    el: '#app',
    data: {
        app: {
            name: 'Jseus na Rua.'
        },
        news: [
          {
            title:"jjj",
            date: "124",
            time:"121",
            text : "ttt"
          },
          {
            title:"jjj",
            date: "124",
            time:"121",
            text : "ttt"
          }
        ],



        slide: {
            current: {},
            storage: [{
                    image: "https://instagram.fjpa1-1.fna.fbcdn.net/vp/90de0122a73c9139dd4d39a5a45becdc/5B1700DA/t51.2885-15/e35/26871444_405011049933996_6810507049739223040_n.jpg",
                    title: "Jesus na \n Rua",
                    date: "20/02/2018 Ás 19:00 Hs"
                },
                {
                    image: "https://instagram.fjpa1-1.fna.fbcdn.net/vp/09d965caa7c9ccff2089a08d099fcb73/5B1BD5A9/t51.2885-15/e35/26068107_145540112774483_1180778842877329408_n.jpg",
                    title: "Ops",
                    date: "99/59/9999"
                },
                {
                    image: "https://instagram.fjpa1-1.fna.fbcdn.net/vp/bb3fd9940bff78c1e80bca0a6dd02f36/5B1BC318/t51.2885-15/s640x640/sh0.08/e35/24126358_559849751040820_8511239040106758144_n.jpg",
                    title: "novo essa foto vicc",
                    date: "99/59/9999"
                }
            ]
        }

    },
    methods: {
        random_slide: () => {

            // lista de imagens
            let it

            // decidindo que imagem vai colocar
            it = _.random(0, (app.$data.slide.storage.length - 1))

            //adicionando textos
            app.$data.slide.current = app.$data.slide.storage[it]


            //colocando a imagem de forma aleatoria
            document.getElementById('slides').style.background = "url(" + app.$data.slide.current.image + ") no-repeat center / cover"

            //animação
            $('#slides').animateCss('fadeIn')
        }
    }
});


//slide automatico
setInterval(function () {
    app.random_slide()
}, 5000);
